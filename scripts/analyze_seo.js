const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const issues = {
    missingTitle: [],
    genericTitle: [],
    missingMetaDesc: [],
    missingH1: [],
    multipleH1: [],
    missingAltImg: []
};

for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Check title
    const titleMatch = content.match(/<title>(.*?)<\/title>/is);
    if (!titleMatch) {
        issues.missingTitle.push(file);
    } else {
        const title = titleMatch[1].trim();
        if (title.length < 10 || title.includes('Document') || title === 'VitableTech') {
            issues.genericTitle.push(file + ' (' + title + ')');
        }
    }
    
    // Check meta description
    const metaDescMatch = content.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/is);
    if (!metaDescMatch || metaDescMatch[1].trim().length === 0) {
        issues.missingMetaDesc.push(file);
    }
    
    // Check H1
    const h1Matches = content.match(/<h1[^>]*>.*?<\/h1>/igs);
    if (!h1Matches) {
        issues.missingH1.push(file);
    } else if (h1Matches.length > 1) {
        issues.multipleH1.push(file + ' (' + h1Matches.length + ')');
    }
    
    // Check image alt tags
    const imgMatches = content.match(/<img[^>]*>/igs);
    if (imgMatches) {
        for (const img of imgMatches) {
            if (!img.includes('alt=') || img.match(/alt=""/)) {
                if (!issues.missingAltImg.includes(file)) {
                    issues.missingAltImg.push(file);
                }
            }
        }
    }
}

console.log(JSON.stringify(issues, null, 2));
