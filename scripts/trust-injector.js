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

const authorBioHtml = `
            <!-- Author Bio Section -->
            <div class="mt-16 bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                <div class="bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl flex-shrink-0 shadow-md">
                    <i class="fas fa-user-tie"></i>
                </div>
                <div>
                    <h4 class="text-xl font-bold text-gray-900 mb-1">About the Author</h4>
                    <p class="text-gray-600 text-base mb-2">Written by the <strong>VitableTech Engineering Team</strong>. We specialize in building robust, scalable digital solutions for enterprises in Gwalior and beyond.</p>
                    <a href="../about.html" class="text-primary text-sm font-semibold hover:underline">Learn more about our expertise &rarr;</a>
                </div>
            </div>`;

const trustpilotHtml = `
                    </div>
                    <!-- Trustpilot Widget -->
                    <div class="mt-6 inline-block bg-white/10 rounded-lg p-4 border border-white/20 transition-all hover:bg-white/20">
                        <a href="https://www.trustpilot.com/review/vitabletech.in" target="_blank">
                            <div class="flex items-center gap-2 mb-2">
                                <i class="fas fa-star text-green-500 text-xl"></i>
                                <span class="font-bold text-lg">Trustpilot</span>
                            </div>
                            <div class="flex gap-1 mb-1">
                                <div class="bg-green-500 text-white w-6 h-6 flex items-center justify-center text-xs"><i class="fas fa-star"></i></div>
                                <div class="bg-green-500 text-white w-6 h-6 flex items-center justify-center text-xs"><i class="fas fa-star"></i></div>
                                <div class="bg-green-500 text-white w-6 h-6 flex items-center justify-center text-xs"><i class="fas fa-star"></i></div>
                                <div class="bg-green-500 text-white w-6 h-6 flex items-center justify-center text-xs"><i class="fas fa-star"></i></div>
                                <div class="bg-green-500 text-white w-6 h-6 flex items-center justify-center text-xs"><i class="fas fa-star"></i></div>
                            </div>
                            <p class="text-xs text-gray-300">Leave a review or read them on Trustpilot</p>
                        </a>
                    </div>
                </div>`;

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Author Bio (Only for Blog files)
  if (filePath.includes('/blog/') && !filePath.endsWith('index.html')) {
    if (!content.includes('About the Author')) {
      // Find the closing tags of the blog content area
      const ctaRegex = /(<a href="\.\.\/contact\.html"[^>]*>.*?<\/a>\s*<\/div>)/;
      if (content.match(ctaRegex)) {
        content = content.replace(ctaRegex, `$1\n${authorBioHtml}`);
        modified = true;
      }
    }
  }

  // 2. Trustpilot Badge (All HTML files)
  if (!content.includes('Trustpilot Widget')) {
    const socialEndRegex = /(<span class="sr-only">Facebook<\/span><\/a>\s*<\/div>\s*)<\/div>/;
    if (content.match(socialEndRegex)) {
      content = content.replace(socialEndRegex, `$1${trustpilotHtml}`);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated: ' + filePath.replace(rootDir, ''));
  }
});
