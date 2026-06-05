const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';
const templateFile = path.join(dir, 'about.html');
const templateContent = fs.readFileSync(templateFile, 'utf8');

const headerRegex = /([\s\S]*?)<!-- Page Header -->/;
const footerRegex = /(<!-- Services Section -->[\s\S]*)/;

const headerMatch = templateContent.match(headerRegex);
const footerMatch = templateContent.match(footerRegex);

if (!headerMatch || !footerMatch) {
    console.error("Could not find header or footer in about.html");
    process.exit(1);
}

const blogs = [
    {
        id: "website-development-cost-in-gwalior",
        title: "Website Development Cost in Gwalior (2026 Guide)",
        category: "Web Development",
        icon: "fa-laptop-code",
        excerpt: "A comprehensive guide on what you should expect to pay for website development in Gwalior, factors that affect the cost, and why it's a crucial investment.",
        date: "June 2026",
        readTime: "10 min read"
        // content is already generated in the previous script, so we skip it here.
    },
    {
        id: "custom-software-development-benefits",
        title: "Why Your Business Needs Custom Software in 2026",
        category: "Custom Software",
        icon: "fa-code",
        excerpt: "Discover the top reasons why off-the-shelf software is holding your business back and how custom software development can drive unprecedented growth.",
        date: "June 2026",
        readTime: "8 min read",
        content: `
            <p>In today's fast-paced digital economy, relying on generic, off-the-shelf software solutions is no longer enough to maintain a competitive edge. As businesses scale, their operational workflows become unique, and a one-size-fits-all software product simply cannot accommodate those specialized needs.</p>

            <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6 tracking-tight">The Limitations of Off-the-Shelf Software</h2>
            <p>While SaaS (Software as a Service) platforms offer a quick start, they come with significant drawbacks:</p>
            <ul class="list-disc pl-6 space-y-2 mb-6 text-gray-700">
                <li><strong>Feature Bloat:</strong> You pay for hundreds of features you never use.</li>
                <li><strong>Lack of Scalability:</strong> When your user base grows, licensing fees skyrocket exponentially.</li>
                <li><strong>Integration Nightmares:</strong> Generic software rarely communicates seamlessly with your existing legacy systems.</li>
                <li><strong>Data Ownership:</strong> Your sensitive business data resides on third-party servers over which you have limited control.</li>
            </ul>

            <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6 tracking-tight">The Strategic Advantages of Custom Software</h2>
            
            <div class="space-y-6">
                <div class="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">1. Tailored to Your Exact Workflow</h3>
                    <p class="text-gray-600">Custom software is built entirely around your business logic. Whether you need a specialized CRM, an automated inventory management system, or an internal HR portal, the software adapts to your employees, not the other way around.</p>
                </div>
                <div class="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">2. Long-Term Cost Efficiency</h3>
                    <p class="text-gray-600">While the initial investment in custom software is higher, it eliminates recurring monthly per-user licensing fees. Over a 3-to-5-year period, custom software often proves significantly cheaper than enterprise-tier SaaS subscriptions.</p>
                </div>
                <div class="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">3. Uncompromised Security</h3>
                    <p class="text-gray-600">Off-the-shelf products are common targets for hackers because a single vulnerability exposes thousands of companies. Custom software provides a smaller surface area for attacks and allows you to implement specific security protocols like HIPAA or GDPR compliance.</p>
                </div>
            </div>

            <hr class="my-12 border-gray-200">

            <div class="bg-white p-8 md:p-12 border-2 border-dashed border-primary/30 rounded-3xl text-center">
                <h2 class="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Ready to build your custom solution?</h2>
                <p class="text-gray-600 mb-8 max-w-3xl mx-auto">VitableTech specializes in engineering robust, scalable custom software for enterprises and startups.</p>
                <a href="contact.html" class="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg"><i class="fas fa-paper-plane"></i> Get a Free Consultation</a>
            </div>
        `
    },
    {
        id: "ecommerce-seo-strategies-2026",
        title: "E-Commerce SEO Strategies to Dominate Search in 2026",
        category: "E-Commerce & SEO",
        icon: "fa-shopping-cart",
        excerpt: "Learn the most effective technical SEO and content strategies to skyrocket your online store's organic traffic and sales.",
        date: "June 2026",
        readTime: "12 min read",
        content: `
            <p>Running an e-commerce store without a robust SEO strategy is like opening a beautiful retail shop in the middle of a desert. You might have the best products in the world, but if nobody walks past your door, you won't make a single sale.</p>

            <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6 tracking-tight">1. Master Technical SEO and Core Web Vitals</h2>
            <p>Google's algorithms are increasingly prioritizing user experience. If your e-commerce site takes longer than 3 seconds to load, you are losing over 50% of your potential customers.</p>
            <ul class="list-none space-y-3 mt-4">
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1.5 mr-3"></i> <span><strong>Optimize Images:</strong> Use next-gen formats like WebP and implement lazy loading.</span></li>
                <li class="flex items-start"><i class="fas fa-check-circle text-primary mt-1.5 mr-3"></i> <span><strong>Mobile-First Indexing:</strong> Ensure your product pages and checkout flows are absolutely flawless on mobile devices.</span></li>
            </ul>

            <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6 tracking-tight">2. Optimize Product Descriptions (Stop Using Manufacturer Copies)</h2>
            <p>One of the biggest mistakes e-commerce store owners make is copy-pasting the manufacturer's product description. This creates massive duplicate content issues across the web.</p>
            <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg my-6 shadow-sm">
                <p class="m-0">Always write unique, highly descriptive product copy. Include long-tail keywords naturally (e.g., "handmade leather wallet for men" instead of just "leather wallet"). Focus on the benefits of the product, not just the features.</p>
            </div>

            <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6 tracking-tight">3. Implement Product Schema Markup</h2>
            <p>Schema markup (Structured Data) is code that helps search engines understand your content better. For e-commerce, implementing Product and Review schema is non-negotiable. It enables Google to display "Rich Snippets" directly in the search results—showing your product's price, availability, and star ratings before the user even clicks the link.</p>

            <hr class="my-12 border-gray-200">

            <div class="bg-white p-8 md:p-12 border-2 border-dashed border-primary/30 rounded-3xl text-center">
                <h2 class="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Need help ranking your E-Commerce Store?</h2>
                <p class="text-gray-600 mb-8 max-w-3xl mx-auto">Our SEO experts at VitableTech know exactly how to push your products to the top of Google.</p>
                <a href="contact.html" class="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg"><i class="fas fa-paper-plane"></i> Talk to an SEO Expert</a>
            </div>
        `
    }
];

// 1. Generate blog.html
let blogCardsHTML = '';
for (const blog of blogs) {
    blogCardsHTML += `
        <a href="blog-${blog.id}.html" class="block bg-gray-50 rounded-xl p-6 shadow-md card-hover group border border-gray-100 hover:border-primary transition-all flex flex-col h-full">
            <div class="bg-primary bg-opacity-10 rounded-lg h-48 flex items-center justify-center mb-6 overflow-hidden flex-shrink-0">
                <i class="fas ${blog.icon} text-primary text-5xl group-hover:scale-110 transition-transform duration-300"></i>
            </div>
            <div class="text-sm text-primary font-semibold mb-2 tracking-wide uppercase">${blog.category}</div>
            <h3 class="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-gray-900 leading-snug">${blog.title}</h3>
            <p class="text-gray-600 mb-6 line-clamp-3 text-sm flex-grow">${blog.excerpt}</p>
            <span class="text-primary font-medium group-hover:underline flex items-center gap-2 mt-auto">Read Article <i class="fas fa-arrow-right text-sm"></i></span>
        </a>
    `;
}

const blogListContent = headerMatch[1] + `
    <!-- Page Header -->
    <section class="gradient-bg py-20 text-white text-center">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p class="text-xl text-blue-100 max-w-2xl mx-auto">Insights, guides, and news from the tech world.</p>
        </div>
    </section>

    <!-- Blog List Section -->
    <section class="py-16 md:py-24 bg-white">
        <div class="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${blogCardsHTML}
            </div>
        </div>
    </section>
` + footerMatch[1];

let finalBlogListContent = blogListContent.replace(/<title>.*?<\/title>/, '<title>Blog - VitableTech</title>');
finalBlogListContent = finalBlogListContent.replace(/<meta name="title" content=".*?">/, '<meta name="title" content="Blog - VitableTech">');

fs.writeFileSync(path.join(dir, 'blog.html'), finalBlogListContent);
console.log('Updated blog.html with 3 posts.');

// 2. Generate the individual blog posts
for (const blog of blogs) {
    if (!blog.content) continue; // Skip if no content (like the first one which is already there)

    const blogPostHTML = headerMatch[1] + `
        <!-- Page Header -->
        <section class="gradient-bg py-20 text-white text-center">
            <div class="container mx-auto px-4">
                <div class="text-sm text-blue-200 font-semibold mb-3 tracking-widest uppercase">${blog.category}</div>
                <h1 class="text-3xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">${blog.title}</h1>
                <div class="flex items-center justify-center gap-6 text-blue-100 text-sm font-medium">
                    <span class="flex items-center"><i class="far fa-calendar-alt mr-2 text-lg"></i> ${blog.date}</span>
                    <span class="flex items-center"><i class="far fa-clock mr-2 text-lg"></i> ${blog.readTime}</span>
                </div>
            </div>
        </section>

        <!-- Blog Content Section -->
        <section class="py-16 md:py-24 bg-white">
            <div class="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
                <div class="mx-auto text-gray-700 leading-relaxed space-y-6 text-lg">
                    ${blog.content}
                </div>
            </div>
        </section>
    ` + footerMatch[1];

    let finalBlogPostContent = blogPostHTML.replace(/<title>.*?<\/title>/, `<title>${blog.title} | VitableTech Blog</title>`);
    finalBlogPostContent = finalBlogPostContent.replace(/<meta name="title" content=".*?">/, `<meta name="title" content="${blog.title} | VitableTech Blog">`);
    finalBlogPostContent = finalBlogPostContent.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${blog.excerpt}">`);

    fs.writeFileSync(path.join(dir, `blog-${blog.id}.html`), finalBlogPostContent);
    console.log(`Created blog-${blog.id}.html`);
}
