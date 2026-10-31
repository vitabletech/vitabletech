const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'https://vitabletech.in';
const SITEMAP_PATH = path.join(ROOT, 'sitemap.xml');
const URLSET_NS = 'http://www.sitemaps.org/schemas/sitemap/0.9';

function escapeXml(value) {
  return String(value).replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;'
  })[character]);
}

function findHtmlFiles(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) findHtmlFiles(fullPath, files);
    else if (/\.html?$/i.test(entry.name)) files.push(fullPath);
  }
  return files;
}

function linkTagValue(html, relValue, attrName) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const rel = tag.match(/\brel\s*=\s*["']([^"']+)["']/i)?.[1];
    if (!rel || !rel.toLowerCase().split(/\s+/).includes(relValue.toLowerCase())) continue;
    return tag.match(new RegExp(`\\b${attrName}\\s*=\\s*["']([^"']+)["']`, 'i'))?.[1] || '';
  }
  return '';
}

function isIndexableCanonical(html, filePath) {
  const canonicalHref = linkTagValue(html, 'canonical', 'href');
  if (!canonicalHref) return null;
  let canonical;
  try { canonical = new URL(canonicalHref); } catch (_) { return null; }
  if (canonical.origin !== ORIGIN || canonical.search || canonical.hash) return null;

  const relative = path.relative(ROOT, filePath).split(path.sep).join('/');
  const expectedPath = relative === 'index.html' ? '/' : `/${relative}`;
  if (canonical.pathname.replace(/\/$/, '') !== expectedPath.replace(/\/$/, '')) return null;

  const robotsTag = (html.match(/<meta\b[^>]*\bname\s*=\s*["']robots["'][^>]*>/i) || [''])[0];
  const robots = robotsTag.match(/\bcontent\s*=\s*["']([^"']+)["']/i)?.[1] || '';
  if (/\bnoindex\b/i.test(robots)) return null;
  return canonical.href;
}

const entries = findHtmlFiles(ROOT)
  .map((filePath) => {
    const html = fs.readFileSync(filePath, 'utf8');
    const loc = isIndexableCanonical(html, filePath);
    if (!loc) return null;
    return { loc, lastmod: fs.statSync(filePath).mtime.toISOString(), priority: loc === `${ORIGIN}/` ? '1.00' : '0.80' };
  })
  .filter(Boolean)
  .sort((a, b) => a.loc.localeCompare(b.loc));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="${URLSET_NS}">\n${entries.map(({ loc, lastmod, priority }) => `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
console.log(`Generated ${entries.length} canonical, indexable URLs in sitemap.xml.`);
