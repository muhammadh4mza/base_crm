const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// load .env from project root if present
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const PORT = process.env.PORT || 4000;
const exportsDir = path.resolve(__dirname, '..', 'exports');
const BACKEND_API_KEY = process.env.BACKEND_API_KEY || null;

// ensure exports directory exists
if (!fs.existsSync(exportsDir)) {
  try { fs.mkdirSync(exportsDir, { recursive: true }); } catch (e) { /* ignore */ }
}

if (!BACKEND_API_KEY) {
  console.warn('WARNING: BACKEND_API_KEY not set — sync endpoints will be unprotected. Set BACKEND_API_KEY in env to enable API key protection.');
}

function runScript(cmd, args = [], envVars = {}) {
  return new Promise((resolve, reject) => {
    const env = Object.assign({}, process.env, envVars);
    const child = spawn(cmd, args, { env, shell: true });
    let out = '';
    let err = '';
    child.stdout.on('data', (d) => { out += d.toString(); });
    child.stderr.on('data', (d) => { err += d.toString(); });
    child.on('close', (code) => {
      if (code === 0) resolve({ out, err }); else reject({ code, out, err });
    });
  });
}

function sendFile(res, filePath, downloadName) {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Length': stats.size,
      'Content-Disposition': `attachment; filename="${downloadName}"`,
    });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  // robust URL parsing if host header missing
  const hostHeader = req.headers.host || `localhost:${PORT}`;
  const url = new URL(req.url, `http://${hostHeader}`);
  try {
    // helper to validate api key for protected routes
    function isAuthorized() {
      if (!BACKEND_API_KEY) return true; // allow if no key configured (for dev)
      const headerKey = req.headers['x-api-key'];
      if (headerKey && headerKey === BACKEND_API_KEY) return true;
      const auth = req.headers['authorization'];
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const token = auth.slice(7).trim();
        if (token === BACKEND_API_KEY) return true;
      }
      return false;
    }

    if (req.method === 'GET' && url.pathname === '/export/shopify') {
      // run exporter and return CSV
      await runScript('node', ['scripts/export_shopify.js']);
      const f = path.join(exportsDir, 'shopify_products.csv');
      return sendFile(res, f, 'shopify_products.csv');
    }

    if (req.method === 'GET' && url.pathname === '/export/woocommerce') {
      await runScript('node', ['scripts/export_woocommerce.js']);
      const f = path.join(exportsDir, 'woocommerce_products.csv');
      return sendFile(res, f, 'woocommerce_products.csv');
    }

    if (req.method === 'POST' && url.pathname === '/sync/shopify') {
      // require API key for sync endpoints
      if (!isAuthorized()) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Unauthorized - missing or invalid API key' }));
        return;
      }
      // Accept JSON body with optional fields: dry, batchSize, retries, shop, token
      let body = '';
      req.on('data', (chunk) => body += chunk.toString());
      req.on('end', async () => {
        const payload = body ? JSON.parse(body) : {};
        const flags = [];
        if (payload.dry) flags.push('--dry');
        if (payload.batchSize) flags.push(`--batch-size=${payload.batchSize}`);
        if (payload.retries) flags.push(`--retries=${payload.retries}`);
        const env = {};
        if (payload.shop) env.SHOPIFY_STORE = payload.shop;
        if (payload.token) env.SHOPIFY_TOKEN = payload.token;
        try {
          const result = await runScript('node', ['scripts/sync_shopify.js', ...flags], env);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, out: result.out, err: result.err }));
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: e }));
        }
      });
      return;
    }

    if (req.method === 'POST' && url.pathname === '/sync/woocommerce') {
      // require API key for sync endpoints
      if (!isAuthorized()) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Unauthorized - missing or invalid API key' }));
        return;
      }
      let body = '';
      req.on('data', (chunk) => body += chunk.toString());
      req.on('end', async () => {
        const payload = body ? JSON.parse(body) : {};
        const flags = [];
        if (payload.dry) flags.push('--dry');
        if (payload.batchSize) flags.push(`--batch-size=${payload.batchSize}`);
        if (payload.retries) flags.push(`--retries=${payload.retries}`);
        const env = {};
        if (payload.store) env.WC_STORE = payload.store;
        if (payload.key) env.WC_CONSUMER_KEY = payload.key;
        if (payload.secret) env.WC_CONSUMER_SECRET = payload.secret;
        try {
          const result = await runScript('node', ['scripts/sync_woocommerce.js', ...flags], env);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, out: result.out, err: result.err }));
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: e }));
        }
      });
      return;
    }

    // default route: simple info
    if (req.method === 'GET' && url.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: 'Base CRM backend',
        endpoints: ['/export/shopify (GET)', '/export/woocommerce (GET)', '/sync/shopify (POST)', '/sync/woocommerce (POST)']
      }));
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: String(err) }));
  }
});

server.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Choose a different PORT or stop the process using it.`);
  } else {
    console.error('Server error', err);
  }
  process.exit(1);
});
