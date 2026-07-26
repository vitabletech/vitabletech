const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';
let indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

const insightsSection = `
    <!-- Insights Section -->
    <section class="py-12 md:py-16 bg-white">
        <div class="container mx-auto px-4 md:px-6 lg:px-8">
            <div class="text-center mb-10">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Tech Explained Simply</h2>
                <div class="w-24 h-1 bg-primary mx-auto mb-6"></div>
                <p class="text-lg text-gray-600 max-w-3xl mx-auto">Explore our educational infographics where we break down complex technical topics into easy-to-understand visual guides.</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Highlighted Insight 1 -->
                <div class="bg-gray-50 rounded-xl overflow-hidden shadow-md card-hover group" data-aos="fade-up" data-aos-delay="100">
                    <div class="h-64 overflow-hidden relative">
                        <img src="./images/insights/1.png" alt="What is Hosting and Domain?" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Hosting & Domain</h3>
                        <p class="text-gray-600 mb-4">A simple breakdown of what hosting and domains are and why your business needs them.</p>
                        <a href="insights.html" class="text-primary font-semibold hover:underline">View Infographic &rarr;</a>
                    </div>
                </div>
                <!-- Highlighted Insight 2 -->
                <div class="bg-gray-50 rounded-xl overflow-hidden shadow-md card-hover group" data-aos="fade-up" data-aos-delay="200">
                    <div class="h-64 overflow-hidden relative">
                        <img src="./images/insights/2.png" alt="Supercharge with Cloudflare" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Cloudflare Explained</h3>
                        <p class="text-gray-600 mb-4">How Cloudflare makes your website faster, safer, and smarter for every visitor.</p>
                        <a href="insights.html" class="text-primary font-semibold hover:underline">View Infographic &rarr;</a>
                    </div>
                </div>
                <!-- Highlighted Insight 3 -->
                <div class="bg-gray-50 rounded-xl overflow-hidden shadow-md card-hover group" data-aos="fade-up" data-aos-delay="300">
                    <div class="h-64 overflow-hidden relative">
                        <img src="./images/insights/3.png" alt="What is Git?" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Git Version Control</h3>
                        <p class="text-gray-600 mb-4">Learn how Git helps developers collaborate, organize code, and build better software.</p>
                        <a href="insights.html" class="text-primary font-semibold hover:underline">View Infographic &rarr;</a>
                    </div>
                </div>
            </div>
            
            <div class="text-center mt-12">
                <a href="insights.html" class="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-secondary transition-colors">View All Insights</a>
            </div>
        </div>
    </section>
`;

if (!indexHtml.includes('Tech Explained Simply')) {
    indexHtml = indexHtml.replace('<!-- Latest Products Section -->', insightsSection + '\n    <!-- Latest Products Section -->');
    fs.writeFileSync(path.join(dir, 'index.html'), indexHtml);
    console.log('Updated index.html with insights section');
}
