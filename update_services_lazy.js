const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const newCard = `
                <div class="bg-white rounded-xl p-8 shadow-md service-card" data-aos="fade-up" data-aos-delay="700">
                    <div
                        class="bg-primary bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                        <i class="fas fa-network-wired text-primary text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-4">EDI & Supply Chain</h3>
                    <p class="text-gray-600 mb-4">Optimize your operations with seamless enterprise data exchange and supply chain management.</p>
                    <ul class="text-gray-600 space-y-2">
                        <li class="flex items-center">
                            <i class="fas fa-check text-primary mr-2"></i>
                            <span>Electronic Data Interchange (EDI)</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-primary mr-2"></i>
                            <span>Supply Chain Integration</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-primary mr-2"></i>
                            <span>Logistics Solutions</span>
                        </li>
                    </ul>
                </div>
            </div>`;

files.forEach(file => {
    let html = fs.readFileSync(path.join(dir, file), 'utf8');
    let changed = false;

    if (html.includes('<span>E-commerce Solutions</span>')) {
        html = html.replace(/<span>E-commerce Solutions<\/span>/g, '<span>E-commerce (Shopify, Custom)</span>');
        changed = true;
    }
    
    if (html.includes('<span>Cross-platform Solutions</span>')) {
        html = html.replace(/<span>Cross-platform Solutions<\/span>/g, '<span>Cross-platform (Flutter, React Native)</span>');
        changed = true;
    }

    if (html.includes('Performance Optimization</span>\n                        </li>\n                    </ul>\n                </div>\n            </div>')) {
        html = html.replace('Performance Optimization</span>\n                        </li>\n                    </ul>\n                </div>\n            </div>', 
        'Performance Optimization</span>\n                        </li>\n                    </ul>\n                </div>\n' + newCard);
        changed = true;
    }

    let imgRegex = /<img(?![^>]*loading=)[^>]*>/gi;
    let newHtml = html.replace(imgRegex, (match) => {
        return match.replace('<img', '<img loading="lazy"');
    });
    
    if (newHtml !== html) {
        html = newHtml;
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(path.join(dir, file), html);
        console.log(`Updated ${file}`);
    }
});
