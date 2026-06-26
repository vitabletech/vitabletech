const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, '../services');

// We exclude web-development.html and index.html as we already did web-development or it's different.
const files = [
  'custom-software.html',
  'ui-ux.html',
  'mobile-app.html',
  'ecommerce.html',
  'maintenance-support.html',
  'edi-supply-chain.html',
  'ai-machine-learning.html',
  'devops-cloud.html'
];

const schemaReplacementMap = {
  'custom-software.html': { name: 'Custom Software Development', service: 'Custom Software Development', urlName: 'custom software', q1: 'What is the cost of custom software?', a1: 'Costs vary depending on features. Contact us for a precise quote.', q2: 'Do you build scalable software?', a2: 'Yes, we use microservices and scalable databases to handle enterprise loads.', q3: 'How long does development take?', a3: 'Typically 2 to 6 months depending on project scope.' },
  'ui-ux.html': { name: 'UI/UX Design Services', service: 'UI/UX Design', urlName: 'UI/UX design', q1: 'What is your UI/UX process?', a1: 'We start with user research, move to wireframes, and deliver high-fidelity prototypes.', q2: 'Do you design for mobile?', a2: 'Yes, all our designs follow mobile-first principles.', q3: 'Which tools do you use?', a3: 'We primarily use Figma and Adobe XD for all design work.' },
  'mobile-app.html': { name: 'Mobile App Development', service: 'Mobile App Development', urlName: 'mobile apps', q1: 'Do you develop for iOS and Android?', a1: 'Yes, we build native apps as well as cross-platform apps using React Native and Flutter.', q2: 'Can you help with app store submission?', a2: 'Yes, we handle end-to-end publishing on the Apple App Store and Google Play Store.', q3: 'Do you provide app maintenance?', a3: 'Yes, we offer ongoing maintenance and support plans.' },
  'ecommerce.html': { name: 'E-Commerce Solutions', service: 'E-Commerce Solutions', urlName: 'e-commerce', q1: 'Which platforms do you support?', a1: 'We specialize in Shopify, WooCommerce, and custom-built e-commerce platforms.', q2: 'Do you integrate payment gateways?', a2: 'Yes, we integrate Stripe, Razorpay, PayPal, and more.', q3: 'Is the checkout secure?', a3: 'Absolutely, we follow strict PCI compliance and security best practices.' },
  'maintenance-support.html': { name: 'Maintenance & Support', service: 'Maintenance & Support', urlName: 'maintenance', q1: 'Do you support existing applications?', a1: 'Yes, we can take over and maintain legacy codebases.', q2: 'What are your SLAs?', a2: 'We offer flexible SLAs including 24/7 support for critical enterprise systems.', q3: 'Do you do security patching?', a3: 'Yes, regular security updates and server patching are included.' },
  'edi-supply-chain.html': { name: 'EDI & Supply Chain', service: 'EDI & Supply Chain Solutions', urlName: 'EDI', q1: 'What EDI standards do you support?', a1: 'We support X12, EDIFACT, and custom API integrations.', q2: 'Can you integrate with our ERP?', a2: 'Yes, we seamlessly integrate with SAP, Oracle, and Microsoft Dynamics.', q3: 'Do you build custom portals?', a3: 'Yes, we build supplier and vendor portals tailored to your workflow.' },
  'ai-machine-learning.html': { name: 'AI & Machine Learning', service: 'AI & Machine Learning Services', urlName: 'AI solutions', q1: 'Can you build custom LLMs?', a1: 'We can fine-tune existing models or integrate OpenAI/Claude APIs into your systems.', q2: 'Do you offer predictive analytics?', a2: 'Yes, we build ML models to predict trends based on your business data.', q3: 'Is AI integration expensive?', a3: 'It is highly scalable. We offer POCs (Proof of Concepts) to validate ROI early.' },
  'devops-cloud.html': { name: 'DevOps & Cloud Services', service: 'DevOps & Cloud Solutions', urlName: 'cloud hosting', q1: 'Which clouds do you work with?', a1: 'AWS, Azure, and Google Cloud Platform (GCP).', q2: 'Do you set up CI/CD pipelines?', a2: 'Yes, we automate testing and deployment using GitHub Actions and Jenkins.', q3: 'Can you migrate our legacy servers?', a3: 'Yes, we specialize in zero-downtime migrations to modern cloud infrastructure.' }
};

const orgSchemaStr = `    <!-- Schema.org markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "VitableTech",
      "url": "https://vitabletech.in",
      "logo": "https://vitabletech.in/images/logo.svg",
      "description": "VitableTech provides custom software development, web development, mobile apps, and enterprise solutions.",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Gwalior",
                "addressRegion": "Madhya Pradesh",
                "addressCountry": "India",
                "addressLine1": "VitableTech, Gwalior, Madhya Pradesh, India",
                "postalCode": "474001"
            },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9009410973",
        "contactType": "customer service",
        "email": "info@vitabletech.in"
      },
      "sameAs": [
        "https://github.com/vitabletech",
        "https://www.linkedin.com/company/vitabletech",
        "https://x.com/vitabletech",
        "https://www.youtube.com/@vitabletech"
      ]
    }
    </script>`;

const bgBlue50Match = `<div class="mt-12 text-center bg-blue-50 p-8 rounded-xl border border-blue-100">`;

files.forEach(file => {
  const filePath = path.join(servicesDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const data = schemaReplacementMap[file];

    // 1. Replace Schema
    const newSchema = `    <!-- Schema.org markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "${data.name}",
          "provider": {
            "@type": "LocalBusiness",
            "name": "VitableTech",
            "image": "https://vitabletech.in/images/logo.svg",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Gwalior",
              "addressRegion": "Madhya Pradesh",
              "addressCountry": "India",
              "addressLine1": "VitableTech, Gwalior, Madhya Pradesh, India",
              "postalCode": "474001"
            },
            "telephone": "+91-9009410973"
          },
          "areaServed": {
            "@type": "City",
            "name": "Gwalior"
          },
          "description": "Elite ${data.urlName} services in Gwalior by VitableTech."
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "${data.q1}",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "${data.a1}"
              }
            },
            {
              "@type": "Question",
              "name": "${data.q2}",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "${data.a2}"
              }
            },
            {
              "@type": "Question",
              "name": "${data.q3}",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "${data.a3}"
              }
            }
          ]
        }
      ]
    }
    </script>`;

    content = content.replace(orgSchemaStr, newSchema);

    // 2. Replace intro text (AEO Definition)
    // Find the first <p> after prose max-w-none
    const introRegex = /(<div class="prose max-w-none">\s*)<p class="text-lg text-gray-600 mb-6">([^<]+)<\/p>/;
    content = content.replace(introRegex, (match, p1, p2) => {
      return `${p1}<p class="text-lg text-gray-600 mb-6"><strong>What is ${data.service}?</strong> VitableTech provides elite ${data.urlName} services in Gwalior. ${p2}</p>`;
    });

    // 3. Insert Testimonial & FAQ before the bg-blue-50 block
    const testFaqSection = `                <!-- Testimonial Section -->
                <div class="mt-12 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                    <h3 class="text-2xl font-bold mb-6 text-center">What Our Clients Say</h3>
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="bg-gray-50 p-6 rounded-lg flex-1">
                            <div class="flex text-yellow-400 mb-3">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <p class="text-gray-600 italic mb-4">"VitableTech delivered outstanding ${data.urlName}. The team in Gwalior was highly professional and deeply understood our requirements."</p>
                            <p class="font-semibold text-gray-800">— Verified Client</p>
                        </div>
                    </div>
                </div>

                <!-- FAQ Section -->
                <div class="mt-12 mb-12">
                    <h3 class="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
                    <div class="space-y-4">
                        <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h4 class="font-bold text-lg mb-2">${data.q1}</h4>
                            <p class="text-gray-600">${data.a1}</p>
                        </div>
                        <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h4 class="font-bold text-lg mb-2">${data.q2}</h4>
                            <p class="text-gray-600">${data.a2}</p>
                        </div>
                        <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h4 class="font-bold text-lg mb-2">${data.q3}</h4>
                            <p class="text-gray-600">${data.a3}</p>
                        </div>
                    </div>
                </div>

                `;

    // Only insert if we haven't already inserted it
    if (!content.includes('<!-- Testimonial Section -->')) {
      content = content.replace(bgBlue50Match, testFaqSection + bgBlue50Match);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + file);
  }
});
