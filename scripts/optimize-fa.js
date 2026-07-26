const fs = require('fs');
const https = require('https');
const path = require('path');
const { execSync } = require('child_process');

const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
const CSS_DIR = path.join(__dirname, '../css');
const FONTS_DIR = path.join(__dirname, '../webfonts');
const CSS_FILE = path.join(CSS_DIR, 'all.min.css');
const PURGED_FILE = path.join(CSS_DIR, 'fa-purged.css');

if (!fs.existsSync(FONTS_DIR)) fs.mkdirSync(FONTS_DIR, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) return reject(new Error(`Failed to download ${url}`));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function optimize() {
  console.log('Downloading all.min.css...');
  await download(CSS_URL, CSS_FILE);
  let css = fs.readFileSync(CSS_FILE, 'utf8');

  // Fix font display
  css = css.replace(/@font-face\s*\{/g, '@font-face{font-display:swap;');
  
  // Extract webfonts URLs and rewrite them to relative ./webfonts/
  const regex = /url\(([^)]+\.woff2(?:[^)]*)?)\)/g;
  let match;
  const urlsToDownload = new Set();
  
  while ((match = regex.exec(css)) !== null) {
    let rawUrl = match[1].replace(/['"]/g, ''); // e.g. ../webfonts/fa-solid-900.woff2
    if (rawUrl.includes('?')) rawUrl = rawUrl.split('?')[0];
    if (rawUrl.includes('#')) rawUrl = rawUrl.split('#')[0];
    
    const filename = path.basename(rawUrl);
    urlsToDownload.add(filename);
  }

  css = css.replace(/\.\.\/webfonts\//g, '../webfonts/');
  fs.writeFileSync(CSS_FILE, css);

  console.log('Downloading fonts:', Array.from(urlsToDownload).join(', '));
  for (const filename of urlsToDownload) {
    const fontUrl = `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/${filename}`;
    await download(fontUrl, path.join(FONTS_DIR, filename));
  }

  console.log('Running PurgeCSS...');
  // Run purgecss on all HTML files to generate fa-purged.css
  // Keep base selectors like .fa, .fas, .fab
  execSync(`npx purgecss --css ${CSS_FILE} --content "../**/*.html" --output ${PURGED_FILE} --safelist "fa" "fas" "fab" "far" "fal" "fad"`, { stdio: 'inherit' });
  
  console.log('Optimization complete!');
}

optimize().catch(console.error);
