const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directories = [
    path.join(__dirname, 'images', 'insights', 'English-Post'),
    path.join(__dirname, 'images', 'insights', 'Hindi-Post')
];

async function convertImages() {
    console.log('Starting image conversion...');
    
    for (const dir of directories) {
        if (!fs.existsSync(dir)) {
            console.log(`Directory not found: ${dir}`);
            continue;
        }

        const files = fs.readdirSync(dir);
        let convertedCount = 0;

        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
                const inputPath = path.join(dir, file);
                const basename = path.basename(file, ext);
                const outputPath = path.join(dir, `${basename}.webp`);

                if (!fs.existsSync(outputPath)) {
                    try {
                        await sharp(inputPath)
                            .webp({ lossless: true })
                            .toFile(outputPath);
                        console.log(`Converted: ${inputPath} -> ${outputPath}`);
                        convertedCount++;
                    } catch (err) {
                        console.error(`Error converting ${inputPath}:`, err);
                    }
                }
            }
        }
        console.log(`Finished processing ${dir}. Converted ${convertedCount} images.`);
    }
    console.log('Image conversion complete.');
}

convertImages();
