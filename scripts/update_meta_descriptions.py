import os
import re

base_dir = "/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech"

# Mapping of file paths relative to base_dir to their unique descriptions
meta_descriptions = {
    "about.html": "Learn about VitableTech's mission, team, and history. We are an innovative IT company based in Gwalior providing enterprise and open source solutions.",
    "clients.html": "See the diverse range of clients and businesses that trust VitableTech for their digital transformation, custom software, and app development needs.",
    "contact.html": "Get in touch with VitableTech. Contact our team in Gwalior, India for custom software development, IT consulting, and expert technical support services.",
    "insights.html": "Explore the latest insights, infographics, and tech trends curated by VitableTech. Stay updated with our expert analyses and case studies.",
    "pricing.html": "Review the flexible pricing plans and tailored enterprise packages offered by VitableTech for our premium digital and software development services.",
    "products.html": "Discover VitableTech's innovative products and open-source software tools designed to optimize enterprise operations and improve productivity.",
    "projects.html": "Browse our portfolio of successful projects at VitableTech. See how we've helped businesses grow through robust software and web development.",
    "faq.html": "Find answers to frequently asked questions about VitableTech's services, engagement models, custom development processes, and technical capabilities.",
    
    # Services
    "services/index.html": "Explore VitableTech's comprehensive IT services, including web and mobile app development, UI/UX design, DevOps, and custom enterprise software.",
    "services/ai-machine-learning.html": "Leverage advanced AI and Machine Learning solutions with VitableTech to automate processes, build custom LLMs, and gain predictive insights.",
    "services/custom-software.html": "VitableTech delivers tailored custom software development services in Gwalior, building scalable desktop, web, and mobile solutions for your business.",
    "services/devops-cloud.html": "Streamline your IT infrastructure with VitableTech's DevOps and Cloud computing services. We specialize in CI/CD, cloud migration, and optimization.",
    "services/ecommerce.html": "Launch high-converting online stores with VitableTech's expert E-Commerce development services, specializing in Shopify and custom platform integrations.",
    "services/edi-supply-chain.html": "Optimize your supply chain and B2B operations with VitableTech's enterprise Electronic Data Interchange (EDI) and logistics integration services.",
    "services/maintenance-support.html": "Ensure uninterrupted performance with VitableTech's dedicated IT maintenance and support services, featuring regular updates and technical assistance.",
    "services/mobile-app.html": "Transform your ideas into reality with VitableTech's native and cross-platform mobile app development services for iOS and Android.",
    "services/ui-ux.html": "Enhance user engagement and conversion rates with VitableTech's professional UI/UX design services, featuring wireframing, prototyping, and visual design.",
    "services/web-development.html": "Build high-performance, responsive websites with VitableTech's expert web development services, focusing on modern frontend and backend architectures.",
    
    # Blog
    "blog/index.html": "Read the VitableTech blog for the latest tech news, programming tutorials, SEO strategies, and expert advice on modern software development.",
    "blog/custom-software-development-benefits.html": "Discover the key benefits of custom software development for your business and how tailored solutions outperform off-the-shelf software packages.",
    "blog/ecommerce-seo-strategies-2026.html": "Learn the top E-Commerce SEO strategies for 2026. Increase your online store's visibility and drive organic traffic with our expert guide.",
    "blog/website-development-cost-in-gwalior.html": "Find out the real cost of website development in Gwalior, India. A comprehensive guide to budgeting for your digital presence and IT needs.",
    
    # Policies
    "policies/privacy-policy.html": "Read VitableTech's privacy policy to understand how we collect, use, and protect your personal information and sensitive data.",
    "policies/return-refund-policy.html": "Review VitableTech's return and refund policy for our software products and IT services to understand our guarantee and cancellation terms.",
    "policies/terms-and-conditions.html": "Access the terms and conditions for using VitableTech's website, open source products, and comprehensive enterprise IT services."
}

# The generic description to replace
generic_desc = "VitableTech provides custom software development, web development, mobile apps, and enterprise solutions. We create powerful open source tools and deliver professional services."

updated_count = 0

for root, dirs, files in os.walk(base_dir):
    if '.git' in root or 'node_modules' in root:
        continue
        
    for file in files:
        if not file.endswith('.html'):
            continue
            
        filepath = os.path.join(root, file)
        
        # Calculate relative path to match our dictionary
        rel_path = os.path.relpath(filepath, base_dir)
        
        # We don't touch index.html directly since we want it to keep the generic main description
        if rel_path == "index.html" or rel_path == "index copy.html":
            continue
            
        if rel_path in meta_descriptions:
            new_desc = meta_descriptions[rel_path]
            
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Replace the generic description in content attribute
            # We use a simple string replacement because the description might be split across lines,
            # but in the HTML it's formatted as:
            # content="VitableTech provides custom software development, web development, mobile apps, and enterprise solutions. We create powerful open source tools and deliver professional services."
            
            if generic_desc in content:
                content = content.replace(generic_desc, new_desc)
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated_count += 1
                print(f"Updated: {rel_path}")

print(f"Total files updated: {updated_count}")
