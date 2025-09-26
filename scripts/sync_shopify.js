const fs = require('fs');
const path = require('path');
const https = require('https');

const dataPath = path.resolve(__dirname, '..', 'src', 'data', 'products.json');
const outDir = path.resolve(__dirname, '..', 'exports');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Accept flags: --dry, --batch-size=N, --retries=N
const args = process.argv.slice(2);
const dry = args.includes('--dry');
const batchSizeArg = args.find(a => a.startsWith('--batch-size='));
const retriesArg = args.find(a => a.startsWith('--retries='));
const batchSize = batchSizeArg ? Number(batchSizeArg.split('=')[1]) : 10;
const maxRetries = retriesArg ? Number(retriesArg.split('=')[1]) : 3;

const payloads = products.map((p) => ({
  product: {
    title: p.title,
    body_html: p.body_html || '',
    vendor: p.vendor || '',
    product_type: p.product_type || '',
    variants: [
      {
        sku: p.sku || '',
        price: p.price != null ? String(p.price) : '',
        inventory_quantity: p.inventory_quantity != null ? Number(p.inventory_quantity) : 0,
      },
    ],
    images: p.image ? [{ src: p.image }] : [],
    published: p.status && p.status.toLowerCase() === 'active',
  },
}));

const outPath = path.join(outDir, 'shopify_payloads.json');
fs.writeFileSync(outPath, JSON.stringify(payloads, null, 2), 'utf8');
console.log('Shopify payloads written to', outPath);

if (!dry) {
  // Real sync with batching and retries
  const store = process.env.SHOPIFY_STORE; // e.g. 'your-store.myshopify.com'
  const token = process.env.SHOPIFY_TOKEN; // Admin API access token
  if (!store || !token) {
    console.warn('SHOPIFY_STORE or SHOPIFY_TOKEN not set — skipping network sync. Re-run with --dry to only generate payloads.');
    process.exit(0);
  }

  (async () => {
    for (let i = 0; i < payloads.length; i += batchSize) {
      const batch = payloads.slice(i, i + batchSize);
      console.log(`Syncing batch ${i / batchSize + 1} (${batch.length} products)`);
      await Promise.all(batch.map(pl => retryAsync(() => createProduct(store, token, pl.product), maxRetries)));
      // small pause between batches
      await sleep(500);
    }
    console.log('Sync to Shopify completed');
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

function createProduct(store, token, product) {
  const options = {
    hostname: store,
    path: '/admin/api/2023-10/products.json',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          console.error('Shopify API error', res.statusCode, data);
          resolve(null);
        }
      });
    });
    req.on('error', (err) => reject(err));
    req.write(JSON.stringify({ product }));
    req.end();
  });
}
