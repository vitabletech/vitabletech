const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';

// Read template from services.html
const templateSrc = fs.readFileSync(path.join(dir, 'services.html'), 'utf8');

// Extract header and footer
const headerEndIndex = templateSrc.indexOf('<!-- Page Header -->');
const headerHtml = templateSrc.substring(0, headerEndIndex);

const footerStartIndex = templateSrc.indexOf('<!-- Contact Section -->') !== -1 ? templateSrc.indexOf('<!-- Contact Section -->') : templateSrc.indexOf('<footer');
const footerHtml = templateSrc.substring(footerStartIndex);

const services = [
    {
        filename: 'service-custom-software.html',
        title: 'Custom Software Development',
        icon: 'fa-laptop-code',
        desc: 'Tailored software solutions designed to meet your specific business needs and challenges.',
        content: `
            <p class="text-lg text-gray-600 mb-6">Off-the-shelf software doesn't always fit. We build custom software solutions from the ground up, perfectly aligned with your unique business processes and goals.</p>
            <h3 class="text-2xl font-bold mb-4">What We Offer</h3>
            <ul class="space-y-4 text-gray-600 mb-8">
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Enterprise Web Applications:</strong> Scalable and secure platforms that power your business logic.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Desktop Software:</strong> High-performance native applications for Windows, Mac, and Linux.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>System Integration:</strong> Connecting disparate systems to ensure seamless data flow across your organization.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Legacy Modernization:</strong> Upgrading outdated systems to modern, efficient architectures.</div></li>
            </ul>
        `
    },
    {
        filename: 'service-ui-ux.html',
        title: 'UI/UX Design',
        icon: 'fa-paint-brush',
        desc: 'Beautiful, intuitive interfaces that enhance user experience and drive engagement.',
        content: `
            <p class="text-lg text-gray-600 mb-6">Great design is more than just aesthetics—it's about creating intuitive, seamless, and enjoyable experiences for your users.</p>
            <h3 class="text-2xl font-bold mb-4">What We Offer</h3>
            <ul class="space-y-4 text-gray-600 mb-8">
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>User Research:</strong> Understanding your audience to design products they will love.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Wireframing & Prototyping:</strong> Visualizing the layout and flow before writing a single line of code.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Visual Interface Design:</strong> Creating stunning, brand-aligned interfaces with modern design systems.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Usability Testing:</strong> Ensuring the final product is highly accessible and frictionless.</div></li>
            </ul>
        `
    },
    {
        filename: 'service-web-development.html',
        title: 'Web Development',
        icon: 'fa-server',
        desc: 'Responsive, high-performance websites and web applications that drive results.',
        content: `
            <p class="text-lg text-gray-600 mb-6">Your website is your digital storefront. We build lightning-fast, responsive, and SEO-optimized websites that convert visitors into customers.</p>
            <h3 class="text-2xl font-bold mb-4">What We Offer</h3>
            <ul class="space-y-4 text-gray-600 mb-8">
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Frontend Engineering:</strong> Building dynamic user interfaces using React, Vue, and Angular.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Robust Backend Architecture:</strong> Secure server-side development with Node.js, Python, and PHP.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>CMS Development:</strong> Custom WordPress themes, plugins, and headless CMS implementations.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Progressive Web Apps (PWA):</strong> Web apps that look and feel like native mobile apps.</div></li>
            </ul>
        `
    },
    {
        filename: 'service-mobile-app.html',
        title: 'Mobile App Development',
        icon: 'fa-mobile-alt',
        desc: 'Native and cross-platform mobile applications for iOS and Android.',
        content: `
            <p class="text-lg text-gray-600 mb-6">Reach your customers wherever they are with powerful, intuitive, and high-performance mobile applications.</p>
            <h3 class="text-2xl font-bold mb-4">What We Offer</h3>
            <ul class="space-y-4 text-gray-600 mb-8">
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Cross-Platform Development:</strong> Building apps with Flutter and React Native to deploy on both iOS and Android from a single codebase.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Native iOS Development:</strong> High-performance Swift applications tailored for the Apple ecosystem.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Native Android Development:</strong> Robust Kotlin/Java applications built for the diverse Android market.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>App Store Deployment:</strong> End-to-end support for launching your app on Google Play and the Apple App Store.</div></li>
            </ul>
        `
    },
    {
        filename: 'service-devops-cloud.html',
        title: 'DevOps & Cloud Services',
        icon: 'fa-cogs',
        desc: 'Streamline your development process and optimize infrastructure.',
        content: `
            <p class="text-lg text-gray-600 mb-6">Accelerate your delivery and ensure maximum uptime with our advanced DevOps and Cloud architecture solutions.</p>
            <h3 class="text-2xl font-bold mb-4">What We Offer</h3>
            <ul class="space-y-4 text-gray-600 mb-8">
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>CI/CD Pipelines:</strong> Automating testing and deployment to ship code faster and safer.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Cloud Infrastructure:</strong> AWS, Azure, and Google Cloud architecture design and management.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Containerization:</strong> Docker and Kubernetes implementation for scalable microservices.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Infrastructure as Code (IaC):</strong> Managing environments efficiently using Terraform and CloudFormation.</div></li>
            </ul>
        `
    },
    {
        filename: 'service-maintenance-support.html',
        title: 'Maintenance & Support',
        icon: 'fa-headset',
        desc: 'Ongoing support and maintenance to keep your systems running smoothly.',
        content: `
            <p class="text-lg text-gray-600 mb-6">Software development doesn't end at launch. We provide reliable, proactive maintenance to ensure your applications remain secure, fast, and up-to-date.</p>
            <h3 class="text-2xl font-bold mb-4">What We Offer</h3>
            <ul class="space-y-4 text-gray-600 mb-8">
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>24/7 Monitoring:</strong> Real-time alerts and monitoring to prevent downtime.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Security Patching:</strong> Regular updates to protect your platform from emerging vulnerabilities.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Performance Optimization:</strong> Continuous code profiling and database tuning to keep load times lightning fast.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Feature Enhancements:</strong> Iterative development to add new capabilities as your business grows.</div></li>
            </ul>
        `
    },
    {
        filename: 'service-edi-supply-chain.html',
        title: 'EDI & Supply Chain',
        icon: 'fa-network-wired',
        desc: 'Optimize your operations with seamless enterprise data exchange and supply chain management.',
        content: `
            <p class="text-lg text-gray-600 mb-6">Modern supply chains rely on instantaneous data transfer. Our Electronic Data Interchange (EDI) solutions connect your enterprise with vendors, distributors, and partners effortlessly.</p>
            <h3 class="text-2xl font-bold mb-4">What We Offer</h3>
            <ul class="space-y-4 text-gray-600 mb-8">
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>B2B Integration:</strong> Automating the exchange of purchase orders, invoices, and shipping notices.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>ERP Syncing:</strong> Integrating EDI data directly into your ERP (SAP, Oracle, NetSuite).</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Inventory Tracking:</strong> Real-time visibility into stock levels across multiple warehouses.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Custom Logistics Portals:</strong> Secure dashboards for vendors and suppliers.</div></li>
            </ul>
        `
    },
    {
        filename: 'service-ai-machine-learning.html',
        title: 'AI & Machine Learning',
        icon: 'fa-brain',
        desc: 'Leverage the power of Artificial Intelligence to automate processes and gain predictive insights.',
        content: `
            <p class="text-lg text-gray-600 mb-6">Unlock the potential of your data. We integrate cutting-edge AI models to automate tasks, personalize user experiences, and drive smarter business decisions.</p>
            <h3 class="text-2xl font-bold mb-4">What We Offer</h3>
            <ul class="space-y-4 text-gray-600 mb-8">
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Custom LLM Integration:</strong> Building intelligent chatbots and assistants using OpenAI, Claude, and local models.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Predictive Analytics:</strong> Utilizing historical data to forecast trends and optimize resource allocation.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Process Automation:</strong> AI-driven agents that handle repetitive tasks and data entry.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Computer Vision:</strong> Image and video analysis for quality control and security applications.</div></li>
            </ul>
        `
    },
    {
        filename: 'service-ecommerce.html',
        title: 'E-Commerce Solutions',
        icon: 'fa-shopping-cart',
        desc: 'Build scalable, high-converting online stores that provide exceptional shopping experiences.',
        content: `
            <p class="text-lg text-gray-600 mb-6">Take your retail business global. We build tailored e-commerce platforms that are secure, blazingly fast, and optimized for maximum conversions.</p>
            <h3 class="text-2xl font-bold mb-4">What We Offer</h3>
            <ul class="space-y-4 text-gray-600 mb-8">
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Shopify Development:</strong> Custom Shopify themes, app integrations, and headless Shopify builds.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Custom E-commerce:</strong> Fully bespoke storefronts built on modern stacks (React/Node) for unique requirements.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Payment Gateway Integration:</strong> Secure implementation of Stripe, PayPal, Razorpay, and other processors.</div></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1 mr-3"></i> <div><strong>Conversion Rate Optimization:</strong> UI/UX tweaks designed to reduce cart abandonment and increase sales.</div></li>
            </ul>
        `
    }
];

services.forEach(s => {
    // Update title in header
    let updatedHeader = headerHtml.replace(/<title>.*?<\/title>/g, `<title>${s.title} - VitableTech Services</title>`);
    updatedHeader = updatedHeader.replace(/<meta name="title" content=".*?">/g, `<meta name="title" content="${s.title} - VitableTech Services">`);
    
    // Make sure 'Services' is highlighted in the nav
    // Remove current highlight
    updatedHeader = updatedHeader.replace('text-primary font-medium', 'text-gray-700 hover:text-primary font-medium');
    // Add highlight to services
    updatedHeader = updatedHeader.replace('href="services.html"\n                        class="text-gray-700', 'href="services.html"\n                        class="text-primary');

    const bodyHtml = `
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-blue-700 to-blue-500 py-20 text-white text-center">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">${s.title}</h1>
            <p class="text-xl text-blue-100 max-w-2xl mx-auto">${s.desc}</p>
        </div>
    </section>

    <!-- Service Details -->
    <section class="py-16 md:py-24 bg-white">
        <div class="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
            <div class="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
                <div class="flex items-center mb-8">
                    <div class="bg-primary bg-opacity-10 p-4 rounded-full w-20 h-20 flex items-center justify-center mr-6">
                        <i class="fas ${s.icon} text-primary text-4xl"></i>
                    </div>
                    <h2 class="text-3xl font-bold text-gray-800">${s.title}</h2>
                </div>
                
                <div class="prose max-w-none">
                    ${s.content}
                </div>
                
                <div class="mt-12 text-center bg-blue-50 p-8 rounded-xl border border-blue-100">
                    <h3 class="text-2xl font-bold mb-4">Ready to start your project?</h3>
                    <p class="text-gray-600 mb-6">Contact our team today to discuss how our ${s.title} services can help your business grow.</p>
                    <a href="contact.html" class="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-secondary transition-colors text-lg">
                        Get in Touch
                    </a>
                </div>
            </div>
        </div>
    </section>
`;

    fs.writeFileSync(path.join(dir, s.filename), updatedHeader + bodyHtml + footerHtml);
    console.log(`Generated ${s.filename}`);
});

