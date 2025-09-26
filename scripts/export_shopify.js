const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '..', 'src', 'data', 'products.json');
const outDir = path.resolve(__dirname, '..', 'exports');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Shopify CSV header based on Shopify product CSV import template (supports variants and multiple images)
const headers = [
  'Handle','Title','Body (HTML)','Vendor','Type','Tags','Published','Option1 Name','Option1 Value','Option2 Name','Option2 Value','Variant SKU','Variant Grams','Variant Inventory Qty','Variant Inventory Policy','Variant Price','Image Src'
];

const rows = [headers.join(',')];

for (const p of products) {
  const handle = (p.title || `product-${p.id}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const published = p.status && String(p.status).toLowerCase() === 'active' ? 'TRUE' : 'FALSE';
  const vendor = p.vendor || '';
  const type = p.product_type || '';
  const body = p.body_html || '';

  // If variants exist, output one row per variant. Otherwise output a single variant based on product-level sku/price
  const variants = Array.isArray(p.variants) && p.variants.length > 0 ? p.variants : [{ sku: p.sku || '', price: p.price || '', inventory_quantity: p.inventory_quantity }];

  let first = true;
  for (const v of variants) {
    const row = [
      escapeCsv(handle),
      first ? escapeCsv(p.title) : '',
      first ? escapeCsv(body) : '',
      first ? escapeCsv(vendor) : '',
      first ? escapeCsv(type) : '',
      '',
      first ? published : '',
      'Option1',
      escapeCsv(v.option1 || ''),
      'Option2',
      escapeCsv(v.option2 || ''),
      escapeCsv(v.sku || ''),
      '',
      v.inventory_quantity != null ? String(v.inventory_quantity) : '',
      escapeCsv(v.inventory_policy || p.inventory_policy || ''),
      v.price != null ? String(v.price) : '',
      first && Array.isArray(p.images) && p.images.length > 0 ? escapeCsv(p.images[0]) : ''
    ];
    rows.push(row.join(','));
    first = false;
  }

  // Add additional image-only rows for Shopify (same handle, image src only)
  if (Array.isArray(p.images) && p.images.length > 1) {
    for (let i = 1; i < p.images.length; i++) {
      const imgRow = [escapeCsv(handle), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', escapeCsv(p.images[i])];
      rows.push(imgRow.join(','));
    }
  }
}

const outPath = path.join(outDir, 'shopify_products.csv');
fs.writeFileSync(outPath, rows.join('\n'), 'utf8');
console.log('Shopify CSV exported to', outPath);

function escapeCsv(val) {
  if (val == null) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('\n') || s.includes('"')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}
