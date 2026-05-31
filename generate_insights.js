const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';
const aboutHtml = fs.readFileSync(path.join(dir, 'about.html'), 'utf8');

const imagesDir = path.join(dir, 'images/insights');
const imageFiles = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg')).sort((a,b) => {
    let numA = parseFloat(a);
    let numB = parseFloat(b);
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    return a.localeCompare(b);
});

let galleryHtml = `
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-blue-700 to-blue-500 py-20 text-white text-center mt-20 md:mt-24">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Tech Insights</h1>
            <p class="text-xl text-blue-100 max-w-2xl mx-auto">Explore our educational infographics and learn complex tech concepts simply.</p>
        </div>
    </section>

    <!-- Gallery Section -->
    <section class="py-12 md:py-16 bg-gray-50">
        <div class="container mx-auto px-4 md:px-6 lg:px-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="insights-gallery">
`;

imageFiles.forEach((file, i) => {
    galleryHtml += `
                <div class="group relative overflow-hidden rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-aos="fade-up" data-aos-delay="${(i%4)*100}">
                    <img src="./images/insights/${file}" alt="VitableTech Insight" loading="lazy" class="w-full h-auto object-cover" onclick="openLightbox(this.src)">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center" onclick="openLightbox(this.previousElementSibling.src)">
                        <i class="fas fa-search-plus text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100"></i>
                    </div>
                </div>
    `;
});

galleryHtml += `
            </div>
        </div>
    </section>

    <!-- Lightbox Modal -->
    <div id="lightbox" class="fixed inset-0 z-[100] bg-black bg-opacity-90 hidden flex items-center justify-center p-4 transition-opacity duration-300" onclick="closeLightbox(event)">
        <span class="absolute top-4 right-6 text-white text-4xl cursor-pointer hover:text-gray-300 transition-colors" onclick="closeLightbox(event)">&times;</span>
        <img id="lightbox-img" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl transform scale-95 transition-transform duration-300" src="" alt="Enlarged Insight">
    </div>

    <script>
        function openLightbox(src) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            lightboxImg.src = src;
            lightbox.classList.remove('hidden');
            setTimeout(() => {
                lightboxImg.classList.remove('scale-95');
                lightboxImg.classList.add('scale-100');
            }, 10);
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox(e) {
            if (e.target.id === 'lightbox' || e.target.tagName.toLowerCase() === 'span') {
                const lightbox = document.getElementById('lightbox');
                const lightboxImg = document.getElementById('lightbox-img');
                lightboxImg.classList.remove('scale-100');
                lightboxImg.classList.add('scale-95');
                setTimeout(() => {
                    lightbox.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        }
        
        document.addEventListener('keydown', function(event) {
            if (event.key === "Escape") {
                const lightbox = document.getElementById('lightbox');
                if (!lightbox.classList.contains('hidden')) {
                    closeLightbox({target: lightbox});
                }
            }
        });
    </script>
`;

let insightsHtml = aboutHtml.replace(/<section id="about".*?<!-- Services Section -->/s, galleryHtml + '\n    <!-- Services Section -->');
insightsHtml = insightsHtml.replace(/<title>.*?<\/title>/, '<title>Tech Insights - VitableTech</title>');

fs.writeFileSync(path.join(dir, 'insights.html'), insightsHtml);
console.log('Created insights.html');
