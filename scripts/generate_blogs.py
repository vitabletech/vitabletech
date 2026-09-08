import os
import re

BASE_DIR = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech'
BLOG_DIR = os.path.join(BASE_DIR, 'blog')

BLOGS = [
    {
        "slug": "custom-software-development-cost-in-india-2026.html",
        "title": "Custom Software Development Cost in India (2026 Guide)",
        "category": "Software Pricing",
        "description": "Discover the average cost of custom software development in India for 2026. Learn about hourly rates, project estimates, and cost-driving factors.",
        "image_placeholder": "https://placehold.co/600x400/1e293b/38bdf8?text=Software+Cost",
        "content": """
<p>India remains the global hub for IT outsourcing and custom software development. As we head into 2026, the landscape of software engineering in India continues to evolve, balancing cost-effectiveness with top-tier technical expertise.</p>

<h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">Average Hourly Rates in India</h2>
<p>While rates vary depending on the agency's size and expertise, the standard hourly rates for software developers in India in 2026 typically range from <strong>$15 to $50 per hour</strong>. Specialized AI or blockchain developers may charge upwards of $60 to $80 per hour.</p>

<h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">Estimated Project Costs</h2>
<ul class="list-disc pl-6 space-y-2 mb-6 text-gray-300">
    <li><strong>Simple Web Applications:</strong> $10,000 - $25,000. These usually include basic frontend interfaces, standard backend logic, and simple databases.</li>
    <li><strong>Medium Complexity Platforms:</strong> $25,000 - $60,000. This includes custom CRMs, marketplaces, or apps with third-party API integrations and payment gateways.</li>
    <li><strong>Enterprise-Grade Software:</strong> $60,000 - $150,000+. Highly scalable systems with microservices architectures, AI integrations, and rigorous security compliances.</li>
</ul>

<h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">Factors Influencing the Cost</h2>
<p>Several factors will ultimately dictate your project's price tag:</p>
<ul class="list-disc pl-6 space-y-2 mb-6 text-gray-300">
    <li><strong>UI/UX Design:</strong> Custom animations and complex user journeys require more design hours.</li>
    <li><strong>Platform Choice:</strong> Building native iOS and Android apps will cost more than a cross-platform solution (like React Native or Flutter).</li>
    <li><strong>Integrations:</strong> Connecting your software to legacy systems, ERPs, or specific hardware APIs drives up development time.</li>
</ul>
<p>At VitableTech, we provide transparent project estimates and agile development cycles to ensure you get the best ROI on your custom software investment.</p>
"""
    },
    {
        "slug": "erp-development-cost-in-india-2026.html",
        "title": "ERP Development Cost in India in 2026",
        "category": "Enterprise Solutions",
        "description": "A comprehensive breakdown of how much it costs to build a custom ERP system from scratch in India in 2026.",
        "image_placeholder": "https://placehold.co/600x400/1e293b/a855f7?text=ERP+Cost",
        "content": """
<p>Enterprise Resource Planning (ERP) systems are the backbone of modern businesses, integrating everything from HR and finance to supply chain management. While off-the-shelf ERPs like SAP or Oracle exist, their licensing fees and rigid structures often push businesses toward building custom ERP solutions.</p>

<h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">The Cost to Build a Custom ERP in India</h2>
<p>Building an ERP from scratch is a massive undertaking. In India, for 2026, the cost of developing a custom ERP typically ranges from <strong>$30,000 to $120,000+</strong>, depending heavily on the number of modules and user roles required.</p>

<h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">Cost Breakdown by Module</h2>
<ul class="list-disc pl-6 space-y-2 mb-6 text-gray-300">
    <li><strong>Human Resources (HR) & Payroll:</strong> $5,000 - $15,000</li>
    <li><strong>Finance & Accounting:</strong> $10,000 - $25,000 (Requires high security and compliance logic)</li>
    <li><strong>Inventory & Supply Chain:</strong> $15,000 - $35,000 (Complex tracking and predictive analytics)</li>
    <li><strong>Sales & CRM integration:</strong> $8,000 - $20,000</li>
</ul>

<h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">Why Choose Custom Over SaaS ERP?</h2>
<p>While a custom ERP has a high upfront development cost, it eliminates the per-user monthly licensing fees associated with SaaS ERPs. If your organization has hundreds of employees, a custom ERP pays for itself within 2 to 3 years. Furthermore, you own the IP and the data entirely.</p>
<p>Partnering with an Indian software firm like VitableTech ensures your custom ERP is built using modern tech stacks (Node.js, Laravel, React) at a fraction of Western development costs.</p>
"""
    },
    {
        "slug": "crm-development-cost-in-india-2026.html",
        "title": "CRM Development Cost in India (2026)",
        "category": "CRM & Sales Tech",
        "description": "Learn the true cost of developing a custom Customer Relationship Management (CRM) platform in India for 2026.",
        "image_placeholder": "https://placehold.co/600x400/1e293b/ef4444?text=CRM+Cost",
        "content": """
<p>Customer Relationship Management (CRM) software is critical for sales and marketing teams. While platforms like Salesforce and HubSpot dominate the market, their enterprise tiers are notoriously expensive. Building a custom CRM allows businesses to tailor the workflow exactly to their sales cycle.</p>

<h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">Average Custom CRM Cost</h2>
<p>In 2026, building a custom CRM in India generally costs between <strong>$15,000 and $70,000</strong>. The broad range is due to the varying levels of automation and intelligence built into the system.</p>

<h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">Types of CRMs and Their Costs</h2>
<ul class="list-disc pl-6 space-y-2 mb-6 text-gray-300">
    <li><strong>Operational CRM ($15k - $30k):</strong> Focuses on daily sales force automation, contact management, and basic pipeline tracking.</li>
    <li><strong>Analytical CRM ($30k - $50k):</strong> Incorporates deep data mining, custom reporting dashboards, and historical sales trends.</li>
    <li><strong>AI-Powered CRM ($50k - $80k+):</strong> Integrates Large Language Models (LLMs) to automatically draft emails, predict lead conversion probabilities, and perform sentiment analysis on customer communications.</li>
</ul>

<h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">Is It Worth It?</h2>
<p>If you are paying thousands of dollars a month in Salesforce licensing fees for features your team doesn't even use, a custom CRM built by VitableTech's engineering team in India is a highly strategic investment.</p>
"""
    },
    {
        "slug": "erp-vs-custom-software-which-is-better.html",
        "title": "ERP vs Custom Software: Which Is Better?",
        "category": "Tech Strategy",
        "description": "Understand the differences between buying an ERP and building Custom Software to decide which path is right for your enterprise.",
        "image_placeholder": "https://placehold.co/600x400/1e293b/10b981?text=ERP+vs+Custom",
        "content": """
<p>When businesses hit a growth plateau due to operational inefficiencies, the inevitable question arises: Should we implement an ERP (Enterprise Resource Planning) system, or should we build Custom Software? The answer depends entirely on your specific business processes.</p>

<h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">What is an ERP?</h2>
<p>An ERP is a suite of integrated applications designed to manage core business processes—like finance, HR, manufacturing, and supply chain. Off-the-shelf ERPs (like SAP or Microsoft Dynamics) are built on "industry best practices." This means you must adapt your business processes to fit the software.</p>

<h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">What is Custom Software?</h2>
<p>Custom software is engineered specifically for your business. It is built to map perfectly to your existing workflows, rather than forcing you to change how you operate. Custom software can be a targeted tool (like a specialized logistics tracker) or a massive, holistic system that functions exactly like an ERP.</p>

<h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">Comparing the Two</h2>
<ul class="list-disc pl-6 space-y-2 mb-6 text-gray-300">
    <li><strong>Time to Market:</strong> SaaS ERPs can be deployed faster (months) but require extensive configuration. Custom software takes longer to build from scratch but requires less employee training since it matches current workflows.</li>
    <li><strong>Competitive Advantage:</strong> If your operational workflow is your secret weapon, an off-the-shelf ERP eliminates that advantage by standardizing your process to match your competitors. Custom software preserves and enhances your unique processes.</li>
    <li><strong>Cost:</strong> ERPs have high implementation fees and ongoing monthly licensing. Custom software has high upfront development costs but low ongoing maintenance costs.</li>
</ul>
<p>Ultimately, if your business operates in a highly niche market with unique processes, <strong>Custom Software</strong> is the superior choice.</p>
"""
    },
    {
        "slug": "how-to-build-an-ai-powered-crm.html",
        "title": "How to Build an AI-Powered CRM",
        "category": "AI Engineering",
        "description": "A technical overview of the architecture, features, and steps required to build a modern, AI-powered CRM system.",
        "image_placeholder": "https://placehold.co/600x400/1e293b/eab308?text=AI+CRM",
        "content": """
<p>Traditional CRMs are static databases; they require sales reps to manually log data, update statuses, and draft follow-ups. The future of sales technology is the <strong>AI-Powered CRM</strong>—systems that actively assist the sales team by analyzing data and automating busywork.</p>

<h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">Core AI Features to Implement</h2>
<ul class="list-disc pl-6 space-y-2 mb-6 text-gray-300">
    <li><strong>Predictive Lead Scoring:</strong> Instead of static rules, train a Machine Learning model (using historical win/loss data) to assign probability scores to incoming leads.</li>
    <li><strong>Automated Email Drafting:</strong> Integrate the OpenAI API or an open-source LLM to read the context of an email thread and automatically generate a drafted reply for the sales rep to approve.</li>
    <li><strong>Sentiment Analysis:</strong> Run transcripts of sales calls or email texts through a sentiment analysis pipeline to alert managers if a high-value account is becoming frustrated.</li>
</ul>

<h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">Recommended Tech Stack</h2>
<p>To build a high-performance, scalable AI CRM, we recommend the following architecture:</p>
<ul class="list-disc pl-6 space-y-2 mb-6 text-gray-300">
    <li><strong>Frontend:</strong> Next.js (React) for a lightning-fast, highly interactive user interface. TailwindCSS for sleek, modern design systems.</li>
    <li><strong>Backend:</strong> Node.js or Python (FastAPI). Python is highly recommended if you are building custom AI models, but Node.js is excellent if you are primarily relying on external AI APIs.</li>
    <li><strong>Database:</strong> PostgreSQL for relational sales data, coupled with a vector database (like Pinecone or pgvector) for storing text embeddings used in semantic search and AI RAG pipelines.</li>
</ul>

<h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">Getting Started</h2>
<p>Building an AI CRM requires a team skilled in both traditional web architecture and modern AI engineering. At VitableTech, our AI engineering division specializes in building custom CRMs that turn data into closed deals.</p>
"""
    }
]

def generate_blogs():
    template_path = os.path.join(BLOG_DIR, 'custom-software-development-benefits.html')
    with open(template_path, 'r', encoding='utf-8') as f:
        template = f.read()

    generated_urls = []
    
    for blog in BLOGS:
        content = template
        
        # Replace Title
        content = re.sub(
            r'<title>.*?</title>',
            f'<title>{blog["title"]} | VitableTech Blog</title>',
            content
        )
        content = re.sub(
            r'<meta name="title" content=".*?">',
            f'<meta name="title" content="{blog["title"]} | VitableTech Blog">',
            content
        )
        
        # Replace Description
        desc = blog["description"]
        content = re.sub(r'<meta name="description"\s+content=".*?">', f'<meta name="description" content="{desc}">', content, flags=re.DOTALL)
        content = re.sub(r'<meta property="og:description"\s+content=".*?">', f'<meta property="og:description" content="{desc}">', content, flags=re.DOTALL)
        content = re.sub(r'<meta property="twitter:description"\s+content=".*?">', f'<meta property="twitter:description" content="{desc}">', content, flags=re.DOTALL)
        
        # Canonical
        content = re.sub(
            r'<link rel="canonical" href=".*?">',
            f'<link rel="canonical" href="https://vitabletech.in/blog/{blog["slug"]}">',
            content
        )

        # Category
        content = re.sub(
            r'<div class="text-sm text-blue-200 font-semibold mb-3 tracking-widest uppercase">.*?</div>',
            f'<div class="text-sm text-blue-200 font-semibold mb-3 tracking-widest uppercase">{blog["category"]}</div>',
            content
        )
        
        # H1 Title
        content = re.sub(
            r'<h1 class="text-3xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">.*?</h1>',
            f'<h1 class="text-3xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">{blog["title"]}</h1>',
            content,
            flags=re.DOTALL
        )
        
        # Body Content
        body_pattern = re.compile(r'(<div class="mx-auto text-gray-300 leading-relaxed space-y-6 text-lg">)(.*?)(</div>\s*<!-- Author Card -->)', re.DOTALL)
        new_body = f'\n{blog["content"]}\n'
        content = body_pattern.sub(r'\1' + new_body + r'\3', content)
        
        # Save file
        file_path = os.path.join(BLOG_DIR, blog["slug"])
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
        generated_urls.append(f"https://vitabletech.in/blog/{blog['slug']}")
        
    print(f"Generated {len(generated_urls)} blog posts.")
    return generated_urls

def update_sitemap(urls):
    sitemap_path = os.path.join(BASE_DIR, 'sitemap.xml')
    if not os.path.exists(sitemap_path):
        return
        
    with open(sitemap_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if "</urlset>" in content:
        url_nodes = ""
        for url in urls:
            url_nodes += f"""
<url>
  <loc>{url}</loc>
  <priority>0.80</priority>
</url>"""
        content = content.replace("</urlset>", url_nodes + "\n</urlset>")
        
        with open(sitemap_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
    print("Updated sitemap.xml")

def update_blog_index():
    insights_path = os.path.join(BASE_DIR, 'insights.html')
    if not os.path.exists(insights_path):
        return
        
    with open(insights_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_cards = ""
    for blog in BLOGS:
        card = f"""
                <a href="./blog/{blog['slug']}" class="group block bg-slate-900/60 rounded-3xl border border-white/5 hover:border-cyan-500/30 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col">
                    <div class="relative h-56 overflow-hidden">
                        <img src="{blog['image_placeholder']}" alt="{blog['title']}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy">
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    </div>
                    <div class="p-6 md:p-8 flex flex-col flex-grow">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="text-[10px] font-bold text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded-full border border-cyan-400/20">{blog['category']}</span>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-tight">{blog['title']}</h3>
                        <p class="text-sm text-gray-400 leading-relaxed mb-6 flex-grow">{blog['description']}</p>
                        <div class="mt-auto flex items-center justify-between text-xs font-semibold text-gray-500">
                            <span>Read Article <i class="fas fa-arrow-right ml-1 text-cyan-400 group-hover:translate-x-1 transition-transform"></i></span>
                        </div>
                    </div>
                </a>"""
        new_cards += card

    # Insert into insights.html right after <div id="blog-grid" ...>
    pattern = re.compile(r'(<div id="blog-grid"[^>]*>)')
    content = pattern.sub(r'\1' + new_cards, content)

    with open(insights_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Updated insights.html")

if __name__ == "__main__":
    urls = generate_blogs()
    update_sitemap(urls)
    update_blog_index()
