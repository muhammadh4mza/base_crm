const fs = require('fs');
const path = require('path');
const https = require('https');
const querystring = require('querystring');

const dataPath = path.resolve(__dirname, '..', 'src', 'data', 'products.json');
const outDir = path.resolve(__dirname, '..', 'exports');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const batchSizeArg = args.find(a => a.startsWith('--batch-size='));
const retriesArg = args.find(a => a.startsWith('--retries='));
const batchSize = batchSizeArg ? Number(batchSizeArg.split('=')[1]) : 10;
const maxRetries = retriesArg ? Number(retriesArg.split('=')[1]) : 3;

const payloads = products.map((p) => ({
  name: p.title,
  type: 'simple',
  regular_price: p.price != null ? String(p.price) : '',
  description: p.body_html || '',
  short_description: '',
  sku: p.sku || '',
  manage_stock: true,
  stock_quantity: p.inventory_quantity != null ? Number(p.inventory_quantity) : 0,
  images: p.image ? [{ src: p.image }] : [],
  categories: p.product_type ? [{ name: p.product_type }] : [],
}));

const outPath = path.join(outDir, 'woocommerce_payloads.json');
fs.writeFileSync(outPath, JSON.stringify(payloads, null, 2), 'utf8');
console.log('WooCommerce payloads written to', outPath);

if (!dry) {
  const store = process.env.WC_STORE; // e.g. 'example.com'
  const key = process.env.WC_CONSUMER_KEY;
  const secret = process.env.WC_CONSUMER_SECRET;
  if (!store || !key || !secret) {
    console.warn('WC_STORE or WC_CONSUMER_KEY/SECRET not set — skipping network sync. Re-run with --dry to only generate payloads.');
    process.exit(0);
  }

  (async () => {
    for (let i = 0; i < payloads.length; i += batchSize) {
      const batch = payloads.slice(i, i + batchSize);
      console.log(`Syncing batch ${i / batchSize + 1} (${batch.length} products)`);
      await Promise.all(batch.map(pl => retryAsync(() => createProduct(store, key, secret, pl), maxRetries)));
      await sleep(500);
    }
    console.log('Sync to WooCommerce completed');
  })();
}

function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }

async function retryAsync(fn, retries) {
  let attempt = 0;
  let delay = 500;
  while (attempt <= retries) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt > retries) throw err;
      console.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`, err.message || err);
      await sleep(delay);
      delay *= 2;
    }
  }
}

function createProduct(store, key, secret, product) {
  const pathUrl = `/wp-json/wc/v3/products`;
  const options = {
    hostname: store,
    path: pathUrl + `?${querystring.stringify({ consumer_key: key, consumer_secret: secret })}`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          console.error('WooCommerce API error', res.statusCode, data);
          resolve(null);
        }
      });
    });
    req.on('error', (err) => reject(err));
    req.write(JSON.stringify(product));
    req.end();
  });
}
