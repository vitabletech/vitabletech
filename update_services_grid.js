const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';

const servicesData = [
    { id: 'Custom Software Development', url: 'service-custom-software.html' },
    { id: 'UI/UX Design', url: 'service-ui-ux.html' },
    { id: 'Web Development', url: 'service-web-development.html' },
    { id: 'Mobile App Development', url: 'service-mobile-app.html' },
    { id: 'DevOps & Cloud Services', url: 'service-devops-cloud.html' },
    { id: 'Maintenance & Support', url: 'service-maintenance-support.html' },
    { id: 'EDI & Supply Chain', url: 'service-edi-supply-chain.html' }
];

const newServicesHtml = `
                <!-- AI & Machine Learning -->
                <div class="bg-white rounded-xl p-8 shadow-md service-card group relative" data-aos="fade-up" data-aos-delay="800">
                    <a href="service-ai-machine-learning.html" class="absolute inset-0 z-10"></a>
                    <div class="bg-primary bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                        <i class="fas fa-brain text-primary group-hover:text-white text-2xl transition-colors"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">AI & Machine Learning</h3>
                    <p class="text-gray-600 mb-4">Leverage the power of Artificial Intelligence to automate processes and gain predictive insights.</p>
                    <ul class="text-gray-600 space-y-2 mb-6">
                        <li class="flex items-center"><i class="fas fa-check text-primary mr-2"></i><span>Custom LLM Integration</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-primary mr-2"></i><span>Predictive Analytics</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-primary mr-2"></i><span>Process Automation</span></li>
                    </ul>
                    <span class="inline-flex items-center text-primary font-semibold group-hover:underline mt-auto relative z-20">Learn More <i class="fas fa-arrow-right ml-2 text-sm"></i></span>
                </div>

                <!-- E-Commerce Solutions -->
                <div class="bg-white rounded-xl p-8 shadow-md service-card group relative" data-aos="fade-up" data-aos-delay="900">
                    <a href="service-ecommerce.html" class="absolute inset-0 z-10"></a>
                    <div class="bg-primary bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                        <i class="fas fa-shopping-cart text-primary group-hover:text-white text-2xl transition-colors"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">E-Commerce Solutions</h3>
                    <p class="text-gray-600 mb-4">Build scalable, high-converting online stores that provide exceptional shopping experiences.</p>
                    <ul class="text-gray-600 space-y-2 mb-6">
                        <li class="flex items-center"><i class="fas fa-check text-primary mr-2"></i><span>Shopify Development</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-primary mr-2"></i><span>Custom E-commerce</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-primary mr-2"></i><span>Payment Gateway Integration</span></li>
                    </ul>
                    <span class="inline-flex items-center text-primary font-semibold group-hover:underline mt-auto relative z-20">Learn More <i class="fas fa-arrow-right ml-2 text-sm"></i></span>
                </div>`;

const filesToUpdate = ['index.html', 'services.html'];

filesToUpdate.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Make existing cards clickable and add "Learn More"
    servicesData.forEach(s => {
        // Regex to find the h3 tag and add class updates and links
        const regex = new RegExp(`(<div class="[^"]*?service-card[^"]*?"[^>]*?>)([\\s\\S]*?<h3 class="[^"]*?mb-4">${s.id}</h3>[\\s\\S]*?</ul>)`, 'g');
        
        content = content.replace(regex, (match, p1, p2) => {
            // Check if already modified
            if (match.includes('service-' + s.id.toLowerCase().split(' ')[0])) return match;
            
            // 1. Add group and relative classes to card container
            let newP1 = p1;
            if (!newP1.includes('group')) newP1 = newP1.replace('service-card', 'service-card group relative flex flex-col');
            
            // 2. Add absolute link overlay
            const linkOverlay = `\n                    <a href="${s.url}" class="absolute inset-0 z-10"></a>`;
            
            // 3. Update icon container
            let newP2 = p2.replace(/bg-primary bg-opacity-10(.*?)\s*mb-6"/, 'bg-primary bg-opacity-10$1 mb-6 group-hover:bg-primary group-hover:text-white transition-colors"');
            newP2 = newP2.replace(/<i class="fas (.*?) text-primary text-2xl"><\/i>/, '<i class="fas $1 text-primary group-hover:text-white text-2xl transition-colors"></i>');
            
            // 4. Update title hover color
            newP2 = newP2.replace(`<h3 class="text-xl font-semibold mb-4">${s.id}</h3>`, `<h3 class="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">${s.id}</h3>`);
            
            // 5. Add margin-bottom to ul
            newP2 = newP2.replace(/<ul class="text-gray-600 space-y-2">/, '<ul class="text-gray-600 space-y-2 mb-6">');
            
            // 6. Add Learn More text at bottom
            const learnMore = `\n                    <span class="inline-flex items-center text-primary font-semibold group-hover:underline mt-auto relative z-20">Learn More <i class="fas fa-arrow-right ml-2 text-sm"></i></span>`;
            
            return newP1 + linkOverlay + newP2 + learnMore;
        });
    });

    // Add the 2 new cards at the end of the grid
    if (!content.includes('AI & Machine Learning')) {
        const insertPosition = `                        </li>\n                    </ul>\n                    <span class="inline-flex items-center text-primary font-semibold group-hover:underline mt-auto relative z-20">Learn More <i class="fas fa-arrow-right ml-2 text-sm"></i></span>\n                </div>\n            </div>`;
        content = content.replace(insertPosition, insertPosition.replace('</div>\n            </div>', `</div>\n${newServicesHtml}\n            </div>`));
    }

    fs.writeFileSync(path.join(dir, file), content);
    console.log(`Updated ${file}`);
});
