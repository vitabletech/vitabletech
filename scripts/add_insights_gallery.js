const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const insightsHtmlPath = path.join(dir, 'insights.html');

let insightsHtml = fs.readFileSync(insightsHtmlPath, 'utf8');

// If we already added the gallery, don't do it again
if (insightsHtml.includes('VISUAL INFOGRAPHICS GALLERY')) {
    console.log('Gallery already exists in insights.html');
    process.exit(0);
}

const insightsDir = path.join(dir, 'images/insights');

function getAllImages(directory, fileList = []) {
    if (!fs.existsSync(directory)) return fileList;
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const filePath = path.join(directory, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllImages(filePath, fileList);
        } else {
            if (file.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
                // Get path relative to the root 'images/insights' folder to use in src
                const relPath = path.relative(dir, filePath);
                fileList.push(relPath);
            }
        }
    });
    return fileList;
}

const allImages = getAllImages(insightsDir);

// Sort images somewhat nicely (alphabetical or numeric)
allImages.sort((a, b) => {
    const nameA = path.basename(a);
    const nameB = path.basename(b);
    const numA = parseInt(nameA);
    const numB = parseInt(nameB);
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    return nameA.localeCompare(nameB);
});

let galleryHtml = `
    <!-- VISUAL INFOGRAPHICS GALLERY -->
    <section class="py-24 bg-slate-950 relative overflow-hidden border-t border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center mb-16" data-aos="fade-up">
                <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">Gallery</span>
                <h2 class="text-3xl sm:text-5xl font-extrabold text-white mb-6">Visual <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tech Posters</span></h2>
                <p class="text-gray-400 max-w-2xl mx-auto">Explore our collection of engineering infographics, guides, and simplified tech explanations.</p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
`;

allImages.forEach((imgSrc, i) => {
    // ensure forward slashes for web
    const webSrc = './' + imgSrc.split(path.sep).join('/');
    galleryHtml += `
                <div class="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl cursor-pointer hover:border-cyan-500/40 transition-all duration-500" data-aos="fade-up" data-aos-delay="${(i % 4) * 100}">
                    <img src="${webSrc}" alt="Tech Infographic" loading="lazy" class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" onclick="openLightbox(this.src)">
                    <div class="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-all duration-500 flex items-center justify-center pointer-events-none">
                        <div class="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 backdrop-blur-sm">
                            <i class="fas fa-search-plus text-cyan-300 text-xl"></i>
                        </div>
                    </div>
                </div>
    `;
});

galleryHtml += `
            </div>
        </div>
    </section>

    <!-- Lightbox Modal -->
    <div id="lightbox" class="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl hidden flex items-center justify-center p-4 transition-opacity duration-300" onclick="closeLightbox(event)">
        <button class="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:text-cyan-400 transition-colors flex items-center justify-center focus:outline-none" onclick="closeLightbox(event)">
            <i class="fas fa-times text-2xl pointer-events-none"></i>
        </button>
        <img id="lightbox-img" class="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl transform scale-95 transition-transform duration-300" src="" alt="Enlarged Infographic">
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
            // Close if clicking outside the image or on the close button
            if (e.target.id === 'lightbox' || e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'i') {
                const lightbox = document.getElementById('lightbox');
                const lightboxImg = document.getElementById('lightbox-img');
                lightboxImg.classList.remove('scale-100');
                lightboxImg.classList.add('scale-95');
                setTimeout(() => {
                    lightbox.classList.add('hidden');
                    document.body.style.overflow = '';
                }, 300);
            }
        }
        
        document.addEventListener('keydown', function(event) {
            if (event.key === "Escape") {
                const lightbox = document.getElementById('lightbox');
                if (!lightbox.classList.contains('hidden')) {
                    const lightboxImg = document.getElementById('lightbox-img');
                    lightboxImg.classList.remove('scale-100');
                    lightboxImg.classList.add('scale-95');
                    setTimeout(() => {
                        lightbox.classList.add('hidden');
                        document.body.style.overflow = '';
                    }, 300);
                }
            }
        });
    </script>
`;

// Insert right before the footer
insightsHtml = insightsHtml.replace('    <!-- FOOTER', galleryHtml + '\n    <!-- FOOTER');

fs.writeFileSync(insightsHtmlPath, insightsHtml);
console.log('Successfully added the gallery to insights.html');
