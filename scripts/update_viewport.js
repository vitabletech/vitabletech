const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';

function getAllHtmlFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'scripts') {
                arrayOfFiles = getAllHtmlFiles(path.join(dirPath, file), arrayOfFiles);
            }
        } else {
            if (file.endsWith('.html')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });
    return arrayOfFiles;
}

const allHtmlFiles = getAllHtmlFiles(dir);

const newViewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">';

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Regex to find existing viewport meta tag
    const viewportRegex = /<meta\s+name=["']viewport["']\s+content=["'][^"']*["']\s*\/?>/i;
    
    if (content.match(viewportRegex)) {
        content = content.replace(viewportRegex, newViewport);
    } else {
        // If it doesn't exist, append it after <head>
        content = content.replace(/<head>/i, `<head>\n    ${newViewport}`);
    }
    
    fs.writeFileSync(file, content);
    const relPathFromRoot = path.relative(dir, file);
    console.log(`Updated viewport in ${relPathFromRoot}`);
});
