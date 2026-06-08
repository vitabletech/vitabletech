const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Calculate relative path to css/fa-purged.css
  const depth = filePath.split('/').length - 1; // 0 for root, 1 for blog/ etc
  const prefix = depth === 0 ? '.' : '..'.repeat(depth).split('').reduce((acc, c, i) => i%2 ? acc : acc+'..'+(i<depth*2-2?'/':''), '');
  const relPath = depth === 0 ? './css/fa-purged.css' : '../css/fa-purged.css';
  
  const updatedContent = content.replace(/https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.4\.0\/css\/all\.min\.css/g, relPath);
  
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated ${filePath}`);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'css' && file !== 'js') {
        walk(fullPath);
      }
    } else if (fullPath.endsWith('.html')) {
      replaceInFile(fullPath);
    }
  }
}

walk('.');
