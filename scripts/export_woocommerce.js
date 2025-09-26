const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '..', 'src', 'data', 'products.json');
const outDir = path.resolve(__dirname, '..', 'exports');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// WooCommerce CSV header (supports variants and multiple images as comma-separated list)
const headers = [
  'ID','Type','SKU','Name','Published','Is featured?','Visibility in catalog','Short description','Description','Tax status','In stock?','Stock','Backorders allowed?','Sold individually?','Regular price','Categories','Tags','Shipping class','Images'
];

const rows = [headers.join(',')];

for (const p of products) {
  const published = p.status && String(p.status).toLowerCase() === 'active' ? '1' : '0';
  const imagesList = Array.isArray(p.images) ? p.images.join(',') : (p.images || p.image || '');

  // If variants exist, output one row per variant
  const variants = Array.isArray(p.variants) && p.variants.length > 0 ? p.variants : [{ sku: p.sku || '', price: p.price || '', inventory_quantity: p.inventory_quantity }];

  for (const v of variants) {
    const stock = v.inventory_quantity != null ? v.inventory_quantity : (p.inventory_quantity != null ? p.inventory_quantity : '');
    const inStock = stock > 0 ? '1' : '0';
    const row = [
      p.id != null ? String(p.id) : '',
      'simple',
      escapeCsv(v.sku || ''),
      escapeCsv(p.title || ''),
      published,
      '0',
      'visible',
      '',
      escapeCsv(p.body_html || ''),
      'taxable',
      inStock,
      stock !== '' ? String(stock) : '',
      'no',
      'no',
      v.price != null ? String(v.price) : (p.price != null ? String(p.price) : ''),
      escapeCsv(p.product_type || ''),
      '',
      '',
      escapeCsv(imagesList),
    ];
    rows.push(row.join(','));
  }
}

const outPath = path.join(outDir, 'woocommerce_products.csv');
fs.writeFileSync(outPath, rows.join('\n'), 'utf8');
console.log('WooCommerce CSV exported to', outPath);

function escapeCsv(val) {
  if (val == null) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('\n') || s.includes('"')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}
