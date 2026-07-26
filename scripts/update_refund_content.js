const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';
const refundFile = path.join(dir, 'return-refund-policy.html');

let content = fs.readFileSync(refundFile, 'utf8');

// Update meta and title
content = content.replace(/<title>Privacy Policy - VitableTech<\/title>/g, '<title>Return and Refund Policy - VitableTech</title>');
content = content.replace(/<h1 class="text-4xl md:text-5xl font-bold mb-4">Privacy Policy<\/h1>/g, '<h1 class="text-4xl md:text-5xl font-bold mb-4">Return and Refund Policy</h1>');
content = content.replace(/<p class="text-xl text-blue-100 max-w-2xl mx-auto">Learn how we collect, use, and protect your data.<\/p>/g, '<p class="text-xl text-blue-100 max-w-2xl mx-auto">Learn about our return and refund policies for our services.</p>');

// Replace the main content section
const mainContentRegex = /<h2 class="text-2xl font-bold mt-8 mb-4">Privacy Policy<\/h2>([\s\S]*?)<h3 class="text-xl font-bold mt-6 mb-3">Grievance Officer<\/h3>/;

const newContent = `<h2 class="text-2xl font-bold mt-8 mb-4">Return and Refund Policy</h2>
                <h3 class="text-xl font-bold mt-6 mb-3">Introduction</h3>
                <p class="mb-4">At <strong>Vitabletech</strong>, we are committed to providing the highest quality of service. This Return and Refund Policy outlines the terms and conditions under which refunds or returns are provided for our services and products.</p>

                <h3 class="text-xl font-bold mt-6 mb-3">Software Development & IT Services</h3>
                <p class="mb-4">Given the nature of custom software development and IT services, we do not offer refunds once a project has commenced and initial deliverables have been accepted. Refunds will only be considered under the following circumstances:</p>
                <ul class="list-disc pl-6 mb-4">
                    <li>If the project is cancelled before any work has begun, a full refund will be issued minus any administrative or payment gateway fees.</li>
                    <li>If Vitabletech is unable to deliver the agreed-upon services due to unforeseen circumstances on our end, a partial or full refund may be negotiated.</li>
                </ul>

                <h3 class="text-xl font-bold mt-6 mb-3">Pre-Packaged Products</h3>
                <p class="mb-4">For any pre-packaged digital products, refunds are only applicable if the product is proven to be defective or not as described, and if reported within 7 days of purchase.</p>

                <h3 class="text-xl font-bold mt-6 mb-3">Process for Requesting a Refund</h3>
                <p class="mb-4">To request a refund, please contact us at info@vitabletech.in with your order or project details. All requests are reviewed on a case-by-case basis and will be processed within 14 business days if approved.</p>

                <h3 class="text-xl font-bold mt-6 mb-3">Changes to this Policy</h3>
                <p class="mb-4">We reserve the right to modify this Return and Refund Policy at any time. Any changes will be posted on this page with an updated effective date.</p>

                <h3 class="text-xl font-bold mt-6 mb-3">Contact Us</h3>`;

content = content.replace(mainContentRegex, newContent);

fs.writeFileSync(refundFile, content);

// Now update all HTML files to include the link in the footer
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
    let htmlContent = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Check if the privacy policy link exists in the footer
    const privacyLinkRegex = /(<li>\s*<a href="privacy-policy\.html"[^>]*>Privacy Policy<\/a>\s*<\/li>)/i;
    
    // Add return-refund-policy.html link after privacy-policy.html
    if (htmlContent.match(privacyLinkRegex) && !htmlContent.includes('return-refund-policy.html')) {
        const newLink = `\n                        <li><a href="return-refund-policy.html" class="text-gray-300 hover:text-white transition-colors">Return & Refund Policy</a></li>`;
        htmlContent = htmlContent.replace(privacyLinkRegex, `$1${newLink}`);
        fs.writeFileSync(path.join(dir, file), htmlContent);
        console.log('Added refund link to ' + file);
    }
}
