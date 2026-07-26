const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';

// 1. Move files
const moves = {
    'blog.html': 'blog/index.html',
    'blog-website-development-cost-in-gwalior.html': 'blog/website-development-cost-in-gwalior.html',
    'blog-custom-software-development-benefits.html': 'blog/custom-software-development-benefits.html',
    'blog-ecommerce-seo-strategies-2026.html': 'blog/ecommerce-seo-strategies-2026.html',
    
    'services.html': 'services/index.html',
    'service-ai-machine-learning.html': 'services/ai-machine-learning.html',
    'service-custom-software.html': 'services/custom-software.html',
    'service-devops-cloud.html': 'services/devops-cloud.html',
    'service-ecommerce.html': 'services/ecommerce.html',
    'service-edi-supply-chain.html': 'services/edi-supply-chain.html',
    'service-maintenance-support.html': 'services/maintenance-support.html',
    'service-mobile-app.html': 'services/mobile-app.html',
    'service-ui-ux.html': 'services/ui-ux.html',
    'service-web-development.html': 'services/web-development.html',

    'privacy-policy.html': 'policies/privacy-policy.html',
    'T&C.html': 'policies/terms-and-conditions.html',
    'return-refund-policy.html': 'policies/return-refund-policy.html',
    'Policies.pdf': 'policies/Policies.pdf'
};

// Create dirs
['blog', 'services', 'policies', 'scripts'].forEach(d => {
    if (!fs.existsSync(path.join(dir, d))) fs.mkdirSync(path.join(dir, d));
});

const scriptsToMove = fs.readdirSync(dir).filter(f => f.endsWith('.js') && f !== 'tailwind.config.js' && f !== 'sw.js' && !f.startsWith('refactor'));
scriptsToMove.forEach(s => moves[s] = 'scripts/' + s);

for (const [oldPath, newPath] of Object.entries(moves)) {
    const fullOld = path.join(dir, oldPath);
    const fullNew = path.join(dir, newPath);
    if (fs.existsSync(fullOld)) {
        fs.renameSync(fullOld, fullNew);
        console.log(`Moved ${oldPath} -> ${newPath}`);
    }
}

// 2. Map old hrefs to new canonical logical paths
const logicalTargets = {
    // Moved files
    'blog.html': 'blog/index.html',
    'blog-website-development-cost-in-gwalior.html': 'blog/website-development-cost-in-gwalior.html',
    'blog-custom-software-development-benefits.html': 'blog/custom-software-development-benefits.html',
    'blog-ecommerce-seo-strategies-2026.html': 'blog/ecommerce-seo-strategies-2026.html',
    
    'services.html': 'services/index.html',
    'service-ai-machine-learning.html': 'services/ai-machine-learning.html',
    'service-custom-software.html': 'services/custom-software.html',
    'service-devops-cloud.html': 'services/devops-cloud.html',
    'service-ecommerce.html': 'services/ecommerce.html',
    'service-edi-supply-chain.html': 'services/edi-supply-chain.html',
    'service-maintenance-support.html': 'services/maintenance-support.html',
    'service-mobile-app.html': 'services/mobile-app.html',
    'service-ui-ux.html': 'services/ui-ux.html',
    'service-web-development.html': 'services/web-development.html',

    'privacy-policy.html': 'policies/privacy-policy.html',
    'T&C.html': 'policies/terms-and-conditions.html',
    'return-refund-policy.html': 'policies/return-refund-policy.html',

    // Files that stayed in root
    'index.html': 'index.html',
    'about.html': 'about.html',
    'contact.html': 'contact.html',
    'pricing.html': 'pricing.html',
    'products.html': 'products.html',
    'projects.html': 'projects.html',
    'clients.html': 'clients.html',
    'insights.html': 'insights.html',
    'faq.html': 'faq.html'
};

function getAllHtmlFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
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

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    const relPathFromRoot = path.relative(dir, file);
    const depth = relPathFromRoot.split(path.sep).length - 1;
    const prefix = depth === 0 ? './' : '../'.repeat(depth);

    const replaceLink = (match, attr, quote, linkPath) => {
        if (linkPath.startsWith('http') || linkPath.startsWith('//') || linkPath.startsWith('#') || linkPath.startsWith('mailto:') || linkPath.startsWith('tel:') || linkPath.startsWith('data:')) {
            return match;
        }

        let cleanPath = linkPath.replace(/^\.\//, '').replace(/^\//, '');
        let mappedPath = cleanPath;
        
        if (logicalTargets[cleanPath]) {
            mappedPath = logicalTargets[cleanPath];
        }

        const finalPath = prefix + mappedPath;
        return `${attr}=${quote}${finalPath}${quote}`;
    };

    content = content.replace(/(href|src)=(['"])(.*?)\2/g, replaceLink);

    fs.writeFileSync(file, content);
    console.log(`Updated paths in ${relPathFromRoot}`);
});
