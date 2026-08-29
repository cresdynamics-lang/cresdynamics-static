const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

// Copy static assets
fs.cpSync(path.join(__dirname, 'public'), DIST, { recursive: true });

// All internal link mappings: bare path → .html path
const LINK_MAP = {
  '/': '/index.html',
  '/about': '/about.html',
  '/why-us': '/why-us.html',
  '/how-we-build': '/how-we-build.html',
  '/how-we-work': '/how-we-work.html',
  '/cresos': '/cresos.html',
  '/contact': '/contact.html',
  '/careers': '/careers.html',
  '/partners': '/partners.html',
  '/pricing': '/pricing.html',
  '/book-strategy-call': '/book-strategy-call.html',
  '/projects': '/projects.html',
  '/client-testimonials': '/client-testimonials.html',
  '/growth-guides': '/growth-guides.html',
  '/insights': '/insights.html',
  '/terms': '/terms.html',
  '/privacy': '/privacy.html',
  '/data-security': '/data-security.html',
  '/blog': '/blog/index.html',
  '/events': '/events/index.html',
  '/case-studies': '/case-studies/index.html',
  // Services
  '/websites': '/services/websites.html',
  '/erp': '/services/erp.html',
  '/e-commerce': '/services/e-commerce.html',
  '/ai-automation': '/services/ai-automation.html',
  '/finance-platforms': '/services/finance-platforms.html',
  '/operations-workflow': '/services/operations-workflow.html',
  '/software': '/services/software.html',
  '/services/business-operating-system': '/services/business-operating-system.html',
  // Solutions
  '/solutions/ai-automation': '/solutions/ai-automation.html',
  '/solutions/consulting-strategy': '/solutions/consulting-strategy.html',
  '/solutions/content-brand': '/solutions/content-brand.html',
  '/solutions/digital-sales': '/solutions/digital-sales.html',
  '/solutions/seo-visibility': '/solutions/seo-visibility.html',
  '/solutions/web-growth': '/solutions/web-growth.html',
  // Case studies
  '/case-studies/the-stems-flowers': '/case-studies/the-stems-flowers.html',
  '/case-studies/floral-whispers-gifts': '/case-studies/floral-whispers-gifts.html',
  '/case-studies/whitelight-store': '/case-studies/whitelight-store.html',
  '/case-studies/spark-lights-254': '/case-studies/spark-lights-254.html',
  '/case-studies/sacco-financial-services': '/case-studies/sacco-financial-services.html',
  '/case-studies/florist-growth-system': '/case-studies/florist-growth-system.html',
  '/case-studies/manufacturing-digital-transformation': '/case-studies/manufacturing-digital-transformation.html',
  '/case-studies/restaurant-automation-system': '/case-studies/restaurant-automation-system.html',
  '/case-studies/optiohire': '/case-studies/optiohire.html',
  '/case-studies/ongoza-cyber-hub': '/case-studies/ongoza-cyber-hub.html',
  '/case-studies/millenia-bos': '/case-studies/millenia-bos.html',
  '/case-studies/smart-brands': '/case-studies/smart-brands.html',
  '/case-studies/sheraton-nairobi-westlands': '/case-studies/sheraton-nairobi-westlands.html',
  '/case-studies/paintcare': '/case-studies/paintcare.html',
  '/case-studies/zerepy': '/case-studies/zerepy.html',
  '/case-studies/wazaverie': '/case-studies/wazaverie.html',
  '/case-studies/safarimart': '/case-studies/safarimart.html',
  '/case-studies/frank-labels': '/case-studies/frank-labels.html',
  // Events
  '/events/the-future-of-ai-in-business': '/events/future-ai.html',
  '/events/the-future-of-ai-in-business/programme': '/events/programme.html',
  '/events/speak': '/events/speak.html',
};

function fixLinks(html) {
  // Fix href="/xxx" (internal links without .html)
  for (const [bare, full] of Object.entries(LINK_MAP)) {
    const escaped = bare.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match href="/xxx" where xxx doesn't already end in .html and isn't /css/ /js/ /images/
    const re = new RegExp(`href="${escaped}"`, 'g');
    html = html.replace(re, `href="${full}"`);
  }
  // Fix src="/xxx" for images (only for known image paths)
  // Leave src="/css/", src="/js/", src="/images/" as-is
  return html;
}

function buildPage(srcPath, destPath, placeholders) {
  let page = fs.readFileSync(srcPath, 'utf-8');
  // Fix links inside page content too
  page = fixLinks(page);

  let layout = fs.readFileSync(path.join(__dirname, 'views/layout.html'), 'utf-8');
  // Fix links in layout
  layout = fixLinks(layout);

  let html = layout.replace('{{content}}', page);
  for (const [key, val] of Object.entries(placeholders)) {
    html = html.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), val);
  }

  const dir = path.dirname(destPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(destPath, html);
}

const pages = [
  ['views/index.html', 'index.html', { title: 'Home', description: 'CRES Dynamics - Custom ERP, AI Automation & Web Development in Nairobi, Kenya' }],
  ['views/about.html', 'about.html', { title: 'About', description: 'About CRES Dynamics' }],
  ['views/why-us.html', 'why-us.html', { title: 'Why Us', description: 'Why choose CRES Dynamics' }],
  ['views/how-we-build.html', 'how-we-build.html', { title: 'How We Build', description: 'Our build process' }],
  ['views/how-we-work.html', 'how-we-work.html', { title: 'How We Work', description: 'How we work' }],
  ['views/cresos.html', 'cresos.html', { title: 'CresOS', description: 'CresOS business operating system' }],
  ['views/contact.html', 'contact.html', { title: 'Contact', description: 'Contact CRES Dynamics' }],
  ['views/careers.html', 'careers.html', { title: 'Careers', description: 'Careers at CRES Dynamics' }],
  ['views/partners.html', 'partners.html', { title: 'Partners', description: 'Partner with CRES Dynamics' }],
  ['views/pricing.html', 'pricing.html', { title: 'Pricing', description: 'CRES Dynamics pricing' }],
  ['views/book-strategy-call.html', 'book-strategy-call.html', { title: 'Book Strategy Call', description: 'Book a strategy call' }],
  ['views/projects.html', 'projects.html', { title: 'Projects', description: 'CRES Dynamics projects' }],
  ['views/client-testimonials.html', 'client-testimonials.html', { title: 'Testimonials', description: 'Client testimonials' }],
  ['views/growth-guides.html', 'growth-guides.html', { title: 'Growth Guides', description: 'Business growth guides' }],
  ['views/insights.html', 'insights.html', { title: 'Insights', description: 'Industry insights' }],
  ['views/terms.html', 'terms.html', { title: 'Terms of Service', description: 'Terms of Service' }],
  ['views/privacy.html', 'privacy.html', { title: 'Privacy Policy', description: 'Privacy Policy' }],
  ['views/data-security.html', 'data-security.html', { title: 'Data Security', description: 'Data Security' }],
  ['views/services/websites.html', 'services/websites.html', { title: 'Websites', description: 'Web development services' }],
  ['views/services/erp.html', 'services/erp.html', { title: 'ERP', description: 'ERP development services' }],
  ['views/services/e-commerce.html', 'services/e-commerce.html', { title: 'E-Commerce', description: 'E-commerce development' }],
  ['views/services/ai-automation.html', 'services/ai-automation.html', { title: 'AI Automation', description: 'AI automation services' }],
  ['views/services/finance-platforms.html', 'services/finance-platforms.html', { title: 'Finance Platforms', description: 'Finance platform development' }],
  ['views/services/operations-workflow.html', 'services/operations-workflow.html', { title: 'Operations Workflow', description: 'Operations workflow automation' }],
  ['views/services/software.html', 'services/software.html', { title: 'Software', description: 'Custom software development' }],
  ['views/services/business-operating-system.html', 'services/business-operating-system.html', { title: 'BOS', description: 'AI-powered Business Operating System' }],
  ['views/solutions/ai-automation.html', 'solutions/ai-automation.html', { title: 'AI Automation Solutions', description: 'AI automation solutions' }],
  ['views/solutions/consulting-strategy.html', 'solutions/consulting-strategy.html', { title: 'Consulting & Strategy', description: 'Consulting and strategy' }],
  ['views/solutions/content-brand.html', 'solutions/content-brand.html', { title: 'Content & Brand', description: 'Content and brand' }],
  ['views/solutions/digital-sales.html', 'solutions/digital-sales.html', { title: 'Digital Sales', description: 'Digital sales' }],
  ['views/solutions/seo-visibility.html', 'solutions/seo-visibility.html', { title: 'SEO & Visibility', description: 'SEO and visibility' }],
  ['views/solutions/web-growth.html', 'solutions/web-growth.html', { title: 'Web Growth', description: 'Web growth' }],
  ['views/case-studies/index.html', 'case-studies/index.html', { title: 'Case Studies', description: 'CRES Dynamics case studies' }],
  ['views/case-studies/the-stems-flowers.html', 'case-studies/the-stems-flowers.html', { title: 'The Stems & Flowers', description: 'The Stems & Flowers case study' }],
  ['views/case-studies/floral-whispers-gifts.html', 'case-studies/floral-whispers-gifts.html', { title: 'Floral Whispers & Gifts', description: 'Floral Whispers case study' }],
  ['views/case-studies/whitelight-store.html', 'case-studies/whitelight-store.html', { title: 'Whitelight Store', description: 'Whitelight Store case study' }],
  ['views/case-studies/spark-lights-254.html', 'case-studies/spark-lights-254.html', { title: 'Spark Lights 254', description: 'Spark Lights 254 case study' }],
  ['views/case-studies/sacco-financial-services.html', 'case-studies/sacco-financial-services.html', { title: 'SACCO Financial Services', description: 'SACCO case study' }],
  ['views/case-studies/florist-growth-system.html', 'case-studies/florist-growth-system.html', { title: 'Florist Growth System', description: 'Florist Growth System case study' }],
  ['views/case-studies/manufacturing-digital-transformation.html', 'case-studies/manufacturing-digital-transformation.html', { title: 'Manufacturing Digital Transformation', description: 'Manufacturing case study' }],
  ['views/case-studies/restaurant-automation-system.html', 'case-studies/restaurant-automation-system.html', { title: 'Restaurant Automation System', description: 'Restaurant Automation case study' }],
  ['views/case-studies/optiohire.html', 'case-studies/optiohire.html', { title: 'OPTIOHIRE', description: 'OPTIOHIRE AI hiring platform case study' }],
  ['views/case-studies/ongoza-cyber-hub.html', 'case-studies/ongoza-cyber-hub.html', { title: 'Ongoza Cyber Hub', description: 'Ongoza Cyber Hub cybersecurity platform case study' }],
  ['views/case-studies/millenia-bos.html', 'case-studies/millenia-bos.html', { title: 'Millenia BOS', description: 'Millenia BOS multi-business unit case study' }],
  ['views/case-studies/smart-brands.html', 'case-studies/smart-brands.html', { title: 'Smart Brands', description: 'Smart Brands FMCG operations case study' }],
  ['views/case-studies/sheraton-nairobi-westlands.html', 'case-studies/sheraton-nairobi-westlands.html', { title: 'Sheraton Nairobi Westlands', description: 'Sheraton Nairobi Westlands operations automation case study' }],
  ['views/case-studies/paintcare.html', 'case-studies/paintcare.html', { title: 'PaintCare Kenya', description: 'PaintCare Kenya e-commerce and delivery case study' }],
  ['views/case-studies/zerepy.html', 'case-studies/zerepy.html', { title: 'Zerepy Homes', description: 'Zerepy Homes ERP case study' }],
  ['views/case-studies/wazaverie.html', 'case-studies/wazaverie.html', { title: 'Wazaverie Fashion', description: 'Wazaverie Fashion sales analytics case study' }],
  ['views/case-studies/safarimart.html', 'case-studies/safarimart.html', { title: 'SafariMart Africa', description: 'SafariMart Africa AI chatbot case study' }],
  ['views/case-studies/frank-labels.html', 'case-studies/frank-labels.html', { title: 'Frank Labels Store', description: 'Frank Labels WhatsApp AI sales assistant case study' }],
  ['views/events/index.html', 'events/index.html', { title: 'Events', description: 'CRES Dynamics events' }],
  ['views/events/future-ai.html', 'events/future-ai.html', { title: 'The Future of AI in Business', description: 'The Future of AI in Business event' }],
  ['views/events/programme.html', 'events/programme.html', { title: 'Event Programme', description: 'Event programme' }],
  ['views/events/speak.html', 'events/speak.html', { title: 'Speak', description: 'Speaker application' }],
  ['views/blog/index.html', 'blog/index.html', { title: 'Blog', description: 'CRES Dynamics blog' }],
];

let built = 0;
for (const [src, dest, ph] of pages) {
  try {
    buildPage(path.join(__dirname, src), path.join(DIST, dest), ph);
    built++;
  } catch (e) {
    console.error('FAIL:', src, e.message);
  }
}
console.log(`Built ${built}/${pages.length} pages with .html links into dist/`);
