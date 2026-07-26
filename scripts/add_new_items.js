const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';

// 1. Clients Update
const clientsFile = path.join(dir, 'clients.html');
let clientsHtml = fs.readFileSync(clientsFile, 'utf8');

const newClients = `
                <a href="https://mstraders.vitabletech.in/" target="_blank" class="bg-white p-6 rounded-xl shadow-md flex items-center justify-center h-24 hover:shadow-lg transition-shadow group relative z-20">
                    <div class="font-bold text-lg text-gray-700 group-hover:text-primary transition-colors">MS Traders</div>
                </a>
                <a href="https://legalresearchdesk.vitabletech.in/" target="_blank" class="bg-white p-6 rounded-xl shadow-md flex items-center justify-center h-24 hover:shadow-lg transition-shadow group relative z-20">
                    <div class="font-bold text-lg text-gray-700 group-hover:text-primary transition-colors text-center leading-tight">Legal Research Desk</div>
                </a>`;

if (!clientsHtml.includes('MS Traders')) {
    clientsHtml = clientsHtml.replace('</div>\n            </div>\n\n            <div class="text-center mb-12">', newClients + '\n            </div>\n            </div>\n\n            <div class="text-center mb-12">');
    fs.writeFileSync(clientsFile, clientsHtml);
    console.log('Updated clients.html');
}

// 2. Projects Update
const projectsFile = path.join(dir, 'projects.html');
let projectsHtml = fs.readFileSync(projectsFile, 'utf8');

const projectsData = [
    { name: "Brilliant Concepts", url: "http://brilliantconcepts.in", tech: "Fullstack PHP Application", domain: "Education", icon: "fa-graduation-cap", color: "from-blue-400 to-blue-600" },
    { name: "CHAMPIONS CLUB", url: "https://www.champions.club/", tech: "Laravel", domain: "Luxury Lifestyle Platform", icon: "fa-crown", color: "from-yellow-400 to-yellow-600" },
    { name: "Flamingo DigiPrint", url: "http://www.flamingodigiprint.com/", tech: "WordPress", domain: "Ecom", icon: "fa-shopping-cart", color: "from-pink-400 to-pink-600" },
    { name: "Stallionprint", url: "https://stallionprint.com", tech: "WordPress", domain: "Ecom", icon: "fa-print", color: "from-indigo-400 to-indigo-600" },
    { name: "Calibrated Diamonds", url: "https://www.calibrateddiamonds.in/", tech: "Bootstrap, HTML, CSS", domain: "Portfolio", icon: "fa-gem", color: "from-cyan-400 to-cyan-600" },
    { name: "Swiftal Logistics", url: "https://swiftallogistics.com/", tech: "WordPress", domain: "Logistics", icon: "fa-truck", color: "from-orange-400 to-orange-600" },
    { name: "Mapp Call", url: "https://www.mappcall.com/", tech: "Mobile Application", domain: "Professional Networking Platform", icon: "fa-mobile-alt", color: "from-green-400 to-green-600" },
    { name: "PeswaPay App", url: "#", tech: "POC", domain: "Fintech", icon: "fa-wallet", color: "from-teal-400 to-teal-600" },
    { name: "Rakshak", url: "#", tech: "Fullstack PHP Web Application", domain: "NGO Application", icon: "fa-shield-alt", color: "from-red-400 to-red-600" }
];

let newProjectsHtml = '';
projectsData.forEach(p => {
    const urlTag = p.url !== "#" ? `<a href="${p.url}" target="_blank" class="absolute inset-0 z-10"></a>` : '';
    const visitBtn = p.url !== "#" ? `<span class="inline-flex items-center text-primary font-semibold group-hover:underline"><i class="fas fa-external-link-alt mr-2"></i> Visit</span>` : `<span class="inline-flex items-center text-gray-400 font-semibold"><i class="fas fa-lock mr-2"></i> Private</span>`;
    newProjectsHtml += `
                <!-- ${p.name} -->
                <div class="bg-gray-50 rounded-xl overflow-hidden shadow-md card-hover group relative">
                    ${urlTag}
                    <div class="h-48 bg-gradient-to-r ${p.color} flex items-center justify-center">
                        <i class="fas ${p.icon} text-white text-5xl"></i>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">${p.name}</h3>
                        <p class="text-gray-600 mb-4"><strong>Techstack:</strong> ${p.tech}</p>
                        <div class="flex justify-between items-center relative z-20">
                            ${visitBtn}
                            <span class="bg-gray-200 text-gray-800 text-[10px] font-semibold px-2 py-1 rounded max-w-[120px] truncate" title="${p.domain}">${p.domain}</span>
                        </div>
                    </div>
                </div>`;
});

if (!projectsHtml.includes('Brilliant Concepts')) {
    projectsHtml = projectsHtml.replace('                </div>\n            </div>\n\n            <div class="mt-12 text-center">', newProjectsHtml + '\n                </div>\n            </div>\n\n            <div class="mt-12 text-center">');
    fs.writeFileSync(projectsFile, projectsHtml);
    console.log('Updated projects.html');
}

// 3. Products Update (products.html)
const productsFile = path.join(dir, 'products.html');
let productsHtml = fs.readFileSync(productsFile, 'utf8');

const newProductsHtml = `
                <!-- Memory Leak Demo -->
                <div class="bg-gray-50 rounded-xl overflow-hidden shadow-md card-hover group relative">
                    <a href="https://vitabletech.github.io/memory-leak-demo/" target="_blank" class="absolute inset-0 z-10"></a>
                    <div class="h-48 bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center">
                        <i class="fas fa-memory text-white text-5xl"></i>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Memory Leak Demo</h3>
                        <p class="text-gray-600 mb-4">An interactive demonstration of memory leaks in JavaScript to help developers understand and prevent them.</p>
                        <div class="flex justify-between items-center relative z-20">
                            <span class="inline-flex items-center text-primary font-semibold group-hover:underline">
                                <i class="fas fa-external-link-alt mr-2"></i> View Demo
                            </span>
                            <span class="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">Educational</span>
                        </div>
                    </div>
                </div>

                <!-- Naukari Automation Playwright -->
                <div class="bg-gray-50 rounded-xl overflow-hidden shadow-md card-hover group relative">
                    <a href="https://github.com/vitabletech/naukari_automation-playwright" target="_blank" class="absolute inset-0 z-10"></a>
                    <div class="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                        <i class="fas fa-robot text-white text-5xl"></i>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Naukri Automation</h3>
                        <p class="text-gray-600 mb-4">A Playwright-based automation script for Naukri profile updates to keep your profile active and boost visibility.</p>
                        <div class="flex justify-between items-center relative z-20">
                            <span class="inline-flex items-center text-primary font-semibold group-hover:underline">
                                <i class="fab fa-github mr-2"></i> GitHub
                            </span>
                            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Automation Tool</span>
                        </div>
                    </div>
                </div>`;

if (!productsHtml.includes('Memory Leak Demo')) {
    // Add before VLearn (Coming Soon) card
    productsHtml = productsHtml.replace('                <!-- VLearn (Coming Soon) -->', newProductsHtml + '\n                <!-- VLearn (Coming Soon) -->');
    fs.writeFileSync(productsFile, productsHtml);
    console.log('Updated products.html');
}

// 4. Products Update in index.html (Latest Products)
const indexFile = path.join(dir, 'index.html');
let indexHtml = fs.readFileSync(indexFile, 'utf8');

if (!indexHtml.includes('Memory Leak Demo')) {
    indexHtml = indexHtml.replace('                <!-- VLearn (Coming Soon) -->', newProductsHtml + '\n                <!-- VLearn (Coming Soon) -->');
    fs.writeFileSync(indexFile, indexHtml);
    console.log('Updated index.html');
}

