const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';

const marketingSections = `
    <!-- Why Choose Us / Marketing Section -->
    <section class="py-12 md:py-16 bg-white">
        <div class="container mx-auto px-4 md:px-6 lg:px-8">
            <div class="text-center mb-10">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Why Choose Vitabletech</h2>
                <div class="w-24 h-1 bg-primary mx-auto mb-6"></div>
                <p class="text-lg text-gray-600 max-w-3xl mx-auto">We deliver exceptional digital solutions tailored to your business needs, ensuring quality, reliability, and innovation.</p>
            </div>
            
            <div class="flex flex-col md:flex-row items-center gap-12">
                <div class="md:w-1/2" data-aos="fade-right">
                    <div class="relative w-full pb-[56.25%] rounded-xl shadow-xl overflow-hidden">
                        <iframe class="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/LfzYfziR4yQ?si=_6MLE993NS6wTLjw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>
                <div class="md:w-1/2 space-y-6" data-aos="fade-left">
                    <div class="flex items-start">
                        <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary mt-1 mr-4">
                            <i class="fas fa-lightbulb text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold mb-2">Innovative Solutions</h3>
                            <p class="text-gray-600">We leverage the latest technologies and frameworks to build future-proof products that scale with your business.</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mt-1 mr-4">
                            <i class="fas fa-handshake text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold mb-2">Client-Centric Approach</h3>
                            <p class="text-gray-600">Your success is our priority. We work closely with you to understand your goals and deliver results that exceed expectations.</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mt-1 mr-4">
                            <i class="fas fa-check-circle text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold mb-2">Proven Track Record</h3>
                            <p class="text-gray-600">With numerous successful projects and happy clients, our experience speaks for itself. We deliver on time and within budget.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Past Experience Section -->
    <section class="py-12 md:py-16 bg-gray-50">
        <div class="container mx-auto px-4 md:px-6 lg:px-8">
            <div class="text-center mb-10">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Our Past Experience</h2>
                <div class="w-24 h-1 bg-primary mx-auto mb-6"></div>
                <p class="text-lg text-gray-600 max-w-3xl mx-auto">Discover how we've helped businesses transform their digital presence and achieve their goals.</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white p-8 rounded-xl shadow-md card-hover" data-aos="fade-up" data-aos-delay="100">
                    <div class="text-primary text-4xl mb-4"><i class="fas fa-chart-line"></i></div>
                    <h3 class="text-xl font-bold mb-3">Enterprise Scalability</h3>
                    <p class="text-gray-600">We successfully migrated a legacy system to a modern microservices architecture, improving performance by 40% for a major retail client.</p>
                </div>
                <div class="bg-white p-8 rounded-xl shadow-md card-hover" data-aos="fade-up" data-aos-delay="200">
                    <div class="text-primary text-4xl mb-4"><i class="fas fa-mobile-alt"></i></div>
                    <h3 class="text-xl font-bold mb-3">Mobile Dominance</h3>
                    <p class="text-gray-600">Developed a cross-platform mobile app that reached 100k+ downloads in its first month, featuring real-time data sync and offline capabilities.</p>
                </div>
                <div class="bg-white p-8 rounded-xl shadow-md card-hover" data-aos="fade-up" data-aos-delay="300">
                    <div class="text-primary text-4xl mb-4"><i class="fas fa-globe"></i></div>
                    <h3 class="text-xl font-bold mb-3">Global Reach</h3>
                    <p class="text-gray-600">Built scalable e-commerce platforms handling millions of transactions globally with 99.99% uptime and robust security measures.</p>
                </div>
            </div>
        </div>
    </section>

`;

const aboutVideoSection = `
    <!-- Video Introduction Section -->
    <section class="py-12 md:py-16 bg-gray-50">
        <div class="container mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Watch Our Story</h2>
            <div class="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <div class="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl relative" style="padding-bottom: 56.25%;">
                <iframe class="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/LfzYfziR4yQ?si=_6MLE993NS6wTLjw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
    </section>
`;

// Update index.html
let indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
if (!indexHtml.includes('Why Choose Vitabletech')) {
    indexHtml = indexHtml.replace('<!-- Services Section -->', marketingSections + '    <!-- Services Section -->');
    fs.writeFileSync(path.join(dir, 'index.html'), indexHtml);
    console.log('Updated index.html');
}

// Update about.html
let aboutHtml = fs.readFileSync(path.join(dir, 'about.html'), 'utf8');
if (!aboutHtml.includes('Watch Our Story')) {
    aboutHtml = aboutHtml.replace('<!-- Services Section -->', aboutVideoSection + '\n    <!-- Services Section -->');
    fs.writeFileSync(path.join(dir, 'about.html'), aboutHtml);
    console.log('Updated about.html');
}
