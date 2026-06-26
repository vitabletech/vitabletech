const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '../sitemap.xml');
const rootDir = path.join(__dirname, '../');

if (!fs.existsSync(sitemapPath)) {
  console.error('sitemap.xml not found at', sitemapPath);
  process.exit(1);
}

let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

// Use regex to find all <url> blocks
const urlBlockRegex = /<url>([\s\S]*?)<\/url>/g;

let updatedSitemap = sitemapContent.replace(urlBlockRegex, (match, innerContent) => {
  const locMatch = innerContent.match(/<loc>(.*?)<\/loc>/);
  if (!locMatch) return match;

  const url = locMatch[1];
  let relativePath = url.replace('https://vitabletech.in/', '');
  
  if (relativePath === '' || relativePath === '/') {
    relativePath = 'index.html';
  } else if (!relativePath.endsWith('.html') && !relativePath.endsWith('/')) {
    // some fallback
  }

  const filePath = path.join(rootDir, relativePath);
  
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const date = new Date(stats.mtime);
    const formattedDate = date.toISOString(); // e.g. 2026-06-26T10:00:00.000Z

    // Replace the lastmod tag inside this url block
    const newInner = innerContent.replace(/<lastmod>.*?<\/lastmod>/, `<lastmod>${formattedDate}</lastmod>`);
    return `<url>${newInner}</url>`;
  } else {
    // If file not found, just return the match
    console.warn('File not found for URL:', url, '->', filePath);
    return match;
  }
});

fs.writeFileSync(sitemapPath, updatedSitemap, 'utf8');
console.log('sitemap.xml updated with fresh lastmod dates based on file system stats.');
