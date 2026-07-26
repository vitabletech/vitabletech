const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../');

function getAllHtmlFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllHtmlFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.html')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

const htmlFiles = getAllHtmlFiles(rootDir);

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // The broken HTML structure is:
  // <span class="sr-only">Facebook</span></a>
  // </div>
  // </div>
  // <!-- Trustpilot Widget -->
  // ...
  // </div>
  // </div>
  // <div>
  // <h3 class="text-xl font-bold mb-4">Quick Links</h3>

  // We want to remove the </div> that is immediately before <!-- Trustpilot Widget -->
  // So we change:
  // </div>\n                </div>\n                <!-- Trustpilot Widget -->
  // to:
  // </div>\n                <!-- Trustpilot Widget -->

  // First let's check if the file has the widget
  if (content.includes('<!-- Trustpilot Widget -->')) {
      // Regex to find the extra closing div before the Trustpilot Widget
      // Note: The user ran Prettier on about.html, so spacing might differ. We use a flexible regex.
      const regex = /(<span class="sr-only">Facebook<\/span><\/a>\s*<\/div>\s*)<\/div>\s*<!-- Trustpilot Widget -->/g;
      
      if (regex.test(content)) {
          content = content.replace(regex, '$1<!-- Trustpilot Widget -->');
          modified = true;
      }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed: ' + filePath.replace(rootDir, ''));
  }
});
