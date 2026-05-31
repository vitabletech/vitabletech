const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const reviewButtonHtml = `
    <!-- Google Review Floating Button -->
    <a href="https://www.google.com/search?q=VitableTech+Gwalior" target="_blank" class="fixed bottom-6 right-6 z-50 bg-white text-gray-800 shadow-[0_4px_15px_rgba(0,0,0,0.1)] rounded-full px-4 py-3 flex items-center gap-3 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 border border-gray-100 group">
        <svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <div class="flex flex-col text-left">
            <span class="text-[13px] font-bold leading-tight text-gray-800">Review us on</span>
            <span class="text-[11px] text-gray-500 font-medium leading-tight group-hover:text-primary transition-colors">Google</span>
        </div>
        <div class="flex ml-1">
            <i class="fas fa-star text-yellow-400 text-xs"></i>
            <i class="fas fa-star text-yellow-400 text-xs"></i>
            <i class="fas fa-star text-yellow-400 text-xs"></i>
            <i class="fas fa-star text-yellow-400 text-xs"></i>
            <i class="fas fa-star text-yellow-400 text-xs"></i>
        </div>
    </a>
</body>`;

files.forEach(file => {
    let html = fs.readFileSync(path.join(dir, file), 'utf8');
    
    if (!html.includes('<!-- Google Review Floating Button -->') && html.includes('</body>')) {
        html = html.replace('</body>', reviewButtonHtml);
        fs.writeFileSync(path.join(dir, file), html);
        console.log(`Added Google review button to ${file}`);
    }
});
