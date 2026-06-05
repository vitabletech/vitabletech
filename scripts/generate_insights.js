const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';
const aboutHtml = fs.readFileSync(path.join(dir, 'about.html'), 'utf8');

const englishDir = path.join(dir, 'images/insights/English-Post');
const hindiDir = path.join(dir, 'images/insights/Hindi-Post');

function getImages(directory) {
    if (!fs.existsSync(directory)) return [];
    return fs.readdirSync(directory)
        .filter(f => f.endsWith('.webp'))
        .sort((a,b) => {
            let numA = parseFloat(a);
            let numB = parseFloat(b);
            if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
            return a.localeCompare(b);
        });
}

const englishImages = getImages(englishDir);
const hindiImages = getImages(hindiDir);

function generateGrid(images, folderName, id, hidden = false) {
    let html = `
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${hidden ? 'hidden' : ''}" id="${id}">
`;
    images.forEach((file, i) => {
        html += `
                <div class="group relative overflow-hidden rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-aos="fade-up" data-aos-delay="${(i%4)*100}">
                    <img src="./images/insights/${folderName}/${file}" alt="VitableTech Insight" loading="lazy" class="w-full h-auto object-cover" onclick="openLightbox(this.src)">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center" onclick="openLightbox(this.previousElementSibling.src)">
                        <i class="fas fa-search-plus text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100"></i>
                    </div>
                </div>
        `;
    });
    html += `
            </div>
    `;
    return html;
}

const englishGridHtml = generateGrid(englishImages, 'English-Post', 'english-gallery', false);
const hindiGridHtml = generateGrid(hindiImages, 'Hindi-Post', 'hindi-gallery', true);

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
            <!-- Tabs -->
            <div class="flex justify-center space-x-4 mb-8">
                <button id="tab-english" class="px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-blue-600 text-white shadow-md focus:outline-none" onclick="switchTab('english')">English Posts</button>
                <button id="tab-hindi" class="px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-white text-gray-600 hover:bg-gray-100 shadow-md focus:outline-none" onclick="switchTab('hindi')">Hindi Posts</button>
            </div>

            <!-- Grids -->
            ${englishGridHtml}
            ${hindiGridHtml}
        </div>
    </section>

    <!-- Lightbox Modal -->
    <div id="lightbox" class="fixed inset-0 z-[100] bg-black bg-opacity-90 hidden flex items-center justify-center p-4 transition-opacity duration-300" onclick="closeLightbox(event)">
        <span class="absolute top-4 right-6 text-white text-4xl cursor-pointer hover:text-gray-300 transition-colors" onclick="closeLightbox(event)">&times;</span>
        <img id="lightbox-img" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl transform scale-95 transition-transform duration-300" src="" alt="Enlarged Insight">
    </div>

    <script>
        function switchTab(tab) {
            const btnEnglish = document.getElementById('tab-english');
            const btnHindi = document.getElementById('tab-hindi');
            const gridEnglish = document.getElementById('english-gallery');
            const gridHindi = document.getElementById('hindi-gallery');

            if (tab === 'english') {
                btnEnglish.className = 'px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-blue-600 text-white shadow-md focus:outline-none';
                btnHindi.className = 'px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-white text-gray-600 hover:bg-gray-100 shadow-md focus:outline-none';
                gridEnglish.classList.remove('hidden');
                gridHindi.classList.add('hidden');
            } else {
                btnHindi.className = 'px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-blue-600 text-white shadow-md focus:outline-none';
                btnEnglish.className = 'px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-white text-gray-600 hover:bg-gray-100 shadow-md focus:outline-none';
                gridHindi.classList.remove('hidden');
                gridEnglish.classList.add('hidden');
            }
        }

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
