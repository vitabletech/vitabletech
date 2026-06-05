const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';
const files = ['index.html', 'services.html'];

const urlMap = {
    'Custom Software Development': 'service-custom-software.html',
    'UI/UX Design': 'service-ui-ux.html',
    'Web Development': 'service-web-development.html',
    'Mobile App Development': 'service-mobile-app.html',
    'DevOps & Cloud Services': 'service-devops-cloud.html',
    'Maintenance & Support': 'service-maintenance-support.html',
    'EDI & Supply Chain': 'service-edi-supply-chain.html'
};

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    for (const [name, url] of Object.entries(urlMap)) {
        // Regex to match the opening div of the service card
        const regex = new RegExp(`(<div class="bg-white rounded-xl p-8 shadow-md service-card"([^>]*?)>)([\\s\\S]*?<h3[^>]*?>${name}<\/h3>)`, 'g');
        
        content = content.replace(regex, (match, div, attrs, rest) => {
            if (rest.includes('absolute inset-0 z-10')) {
                return match; // Already fixed
            }
            const newDiv = `<div class="bg-white rounded-xl p-8 shadow-md service-card group relative flex flex-col"${attrs}>`;
            const overlay = `\n                    <a href="${url}" class="absolute inset-0 z-10"></a>`;
            return newDiv + overlay + rest;
        });
    }

    fs.writeFileSync(path.join(dir, file), content);
    console.log(`Fixed ${file}`);
});
