// Per-route <title> and meta description. Every indexable page gets its own,
// so Google can match each page to the search it actually answers.
// Titles stay under ~60 chars, descriptions under ~158.

const PAGE_META = {
  '/': {
    title: 'Cres Dynamics Ltd | AI Systems, Business OS & Websites Kenya',
    description: 'Cres Dynamics Ltd builds AI systems that predict the next 3-6 months, business operating systems, school systems, and high-end ecommerce websites. Live in 10+ countries.',
  },
  '/about': {
    title: 'About Cres Dynamics Ltd | Software Company in Nairobi, Kenya',
    description: 'Cres Dynamics Ltd is a Nairobi software engineering company building AI systems, business operating systems, ERP, and websites for companies across Kenya and Africa.',
  },
  '/why-us': {
    title: 'Why Choose Cres Dynamics | Software Developers in Kenya',
    description: 'Why Kenyan companies choose Cres Dynamics to build their AI systems, ERP, and websites: owned code, Kenya-first workflows, M-Pesa, and engineers who stay after go-live.',
  },
  '/how-we-build': {
    title: 'How We Build Software | Cres Dynamics Engineering Framework',
    description: 'The Cres Dynamics engineering framework: discovery, architecture, build, testing, and deployment for business systems and AI in Kenya. No skipped steps.',
  },
  '/how-we-work': {
    title: 'How We Work: Discovery to Go-Live | Cres Dynamics Kenya',
    description: 'Our software delivery process from first conversation to go-live: fixed scope, weekly demos, and low-risk rollout for businesses in Nairobi and across Kenya.',
  },
  '/cresos': {
    title: 'CresOS: Business Operating System for Companies in Kenya',
    description: 'CresOS is a modular business operating system: projects, finance, CRM, HR, chat, analytics, and AI in one platform for growing companies in Nairobi and Kenya.',
  },
  '/services/business-operating-system': {
    title: 'AI Business Operating System (BOS) Kenya | Cres Dynamics',
    description: 'An AI-powered business operating system for Kenyan companies: finance, CRM, HR, and multi-unit operations in one platform, with AI that tells directors what to act on.',
  },
  '/erp': {
    title: 'Custom ERP Development Kenya | Cres Dynamics Ltd',
    description: 'Custom ERP systems for Kenyan businesses: HR, finance, procurement, inventory, and sales in one system with M-Pesa integration. Built in Nairobi.',
  },
  '/finance-platforms': {
    title: 'Finance Platforms & Cash Flow Forecasting Kenya | Cres Dynamics',
    description: 'Finance platforms that show cash in, cash out, and your cash position 30, 60, and 90 days ahead. Invoicing, M-Pesa reconciliation, and director dashboards.',
  },
  '/operations-workflow': {
    title: 'Workflow Automation & Operations Systems Kenya | Cres Dynamics',
    description: 'Operations and workflow systems for Kenyan companies: approvals, tasks, projects, and reporting that move work forward without chasing people.',
  },
  '/ai-automation': {
    title: 'AI Agents & Business Automation Kenya | Cres Dynamics',
    description: 'AI agents that answer clients 24/7, qualify leads, follow up on invoices, and escalate only what needs a human. Business automation built for Kenyan companies.',
  },
  '/ai-systems': {
    title: 'AI Systems for Companies in Kenya | Cres Dynamics Ltd',
    description: 'AI systems for companies in Kenya, plus systems administration in Nairobi: audit to rollout, servers, access, backups, and monitoring from an 18-engineer team.',
  },
  '/ai-forecasting': {
    title: 'AI Forecasting & Executive Advisor Agents Kenya | Cres Dynamics',
    description: 'AI that predicts sales, cash flow, and demand 3 and 6 months ahead, and AI advisor agents that brief directors and executives on what to do next. Built in Kenya.',
  },
  '/logistics-ai': {
    title: 'AI Logistics & Inventory Prediction System | Cres Dynamics',
    description: 'AI for logistics and warehouses: predict stock and market shifts, get payment and spoilage alerts, and know when to discount and which products to bring in.',
  },
  '/school-management-system': {
    title: 'School Management System Kenya | Cres Dynamics Ltd',
    description: 'School management system for Kenyan schools: M-Pesa fee collection, admissions, CBC report cards, attendance, timetables, parent portal, and AI insights.',
  },
  '/websites': {
    title: 'High-End Website Design Kenya | Cres Dynamics Ltd',
    description: 'Premium website design and development in Kenya. Fast, search-optimised websites with M-Pesa and card payments that turn Google searches into clients.',
  },
  '/e-commerce': {
    title: 'Ecommerce Website Development Kenya | Cres Dynamics Ltd',
    description: 'Ecommerce websites for Kenyan businesses: product catalogue, M-Pesa and card checkout, delivery tracking, inventory, and WhatsApp ordering. Built in Nairobi.',
  },
  '/software': {
    title: 'Custom Software Development Kenya | Cres Dynamics Ltd',
    description: 'Custom software development in Nairobi: portals, dashboards, booking tools, and internal systems built around how your business works, with code you own.',
  },
  '/contact': {
    title: 'Contact Cres Dynamics Ltd | Westlands, Nairobi',
    description: 'Contact Cres Dynamics Ltd at Kivuli Tower, Westlands, Nairobi. Call +254 708 805 496 to discuss an AI system, business OS, school system, or website.',
  },
  '/partners': {
    title: 'Partner With Cres Dynamics | Technology Partners Africa',
    description: 'Partner with Cres Dynamics to build systems that scale across Africa: technology providers, institutions, and businesses working with our Nairobi engineering team.',
  },
  '/careers': {
    title: 'Careers at Cres Dynamics | Software Engineering Jobs Nairobi',
    description: 'Software engineering careers at Cres Dynamics in Nairobi. Build production systems, AI, and platforms that businesses run on every day.',
  },
  '/pricing': {
    title: 'Pricing: Custom Systems & Websites Kenya | Cres Dynamics',
    description: 'How Cres Dynamics prices custom systems, AI, and websites in Kenya: no per-seat fees, fixed quotes after a free strategy session.',
  },
  '/book-strategy-call': {
    title: 'Book a Free Strategy Call | Cres Dynamics Kenya',
    description: 'Book a free strategy call with Cres Dynamics. Tell us your business challenge and we respond within 2 hours during working hours.',
  },
  '/projects': {
    title: 'Projects: Systems in Production | Cres Dynamics Kenya',
    description: 'Live systems built by Cres Dynamics: business operating systems, AI agents, ecommerce platforms, and ERP used daily by businesses in Kenya and Africa.',
  },
  '/client-testimonials': {
    title: 'Client Testimonials | Cres Dynamics Ltd Kenya',
    description: 'What businesses in Kenya say about working with Cres Dynamics on their systems, AI, and websites.',
  },
  '/growth-guides': {
    title: 'Growth Guides for Kenyan Businesses | Cres Dynamics',
    description: 'Practical playbooks for Kenyan businesses: choosing business systems, adopting AI, and scaling operations.',
  },
  '/insights': {
    title: 'Insights: Technology & Business Strategy Kenya | Cres Dynamics',
    description: 'Analysis on technology, AI, business strategy, and digital transformation for companies in Kenya.',
  },
  '/terms': {
    title: 'Terms of Service | Cres Dynamics Ltd',
    description: 'Terms of service for cresdynamics.com and Cres Dynamics Ltd services.',
  },
  '/privacy': {
    title: 'Privacy Policy | Cres Dynamics Ltd',
    description: 'How Cres Dynamics Ltd collects, uses, and protects personal data, in line with the Kenya Data Protection Act.',
  },
  '/case-studies': {
    title: 'Case Studies: AI, ERP & Ecommerce in Kenya | Cres Dynamics',
    description: 'Case studies of systems Cres Dynamics built: hotel operations AI, multi-unit business OS, 6-month demand forecasting, ecommerce, and AI sales agents.',
  },
  '/case-studies/floral-whispers-gifts': {
    title: 'Floral Whispers Gifts Ecommerce Case Study | Cres Dynamics',
    description: 'How Cres Dynamics built a full ecommerce platform for a Kenyan gift and floral delivery business, designed to scale from day one.',
  },
  '/case-studies/florist-growth-system': {
    title: 'Florist Growth System Case Study | Cres Dynamics',
    description: 'An automated growth and marketing system for florists, from lead capture to repeat customer retention.',
  },
  '/case-studies/frank-labels': {
    title: 'WhatsApp AI Sales Agent Case Study: Frank Labels | Cres Dynamics',
    description: 'A WhatsApp AI sales agent that recommends products and closes orders at 2 AM while the owner sleeps. Built by Cres Dynamics in Kenya.',
  },
  '/case-studies/manufacturing-digital-transformation': {
    title: 'Manufacturing ERP & BI Case Study | Cres Dynamics Kenya',
    description: 'Digital operations overhaul for a manufacturer: real-time production tracking, inventory automation, and business intelligence.',
  },
  '/case-studies/millenia-bos': {
    title: 'Millenia Business Operating System Case Study | Cres Dynamics',
    description: 'A business operating system running 6 business units with per-unit dashboards, consolidated reporting, and cross-unit resource allocation.',
  },
  '/case-studies/ongoza-cyber-hub': {
    title: 'Ongoza Cyber Hub Learning Platform Case Study | Cres Dynamics',
    description: 'A multi-country cybersecurity learning platform for 10,000+ students in 8+ African countries, with mentor matching and certification tracking.',
  },
  '/case-studies/optiohire': {
    title: 'OptioHire AI Hiring Agent Case Study | Cres Dynamics',
    description: 'An AI hiring agent that scans every applicant, matches skills to roles, and ranks candidates by market demand. Built by Cres Dynamics.',
  },
  '/case-studies/paintcare': {
    title: 'PaintCare Kenya Ecommerce & Delivery Case Study | Cres Dynamics',
    description: 'A full-stack ecommerce and delivery platform with real-time tracking and route optimisation that stopped pay-on-delivery losses.',
  },
  '/case-studies/restaurant-automation-system': {
    title: 'Restaurant Automation System Case Study | Cres Dynamics',
    description: 'Restaurant automation from order management to inventory tracking and staff scheduling, in one system.',
  },
  '/case-studies/sacco-financial-services': {
    title: 'SACCO Management System Case Study | Cres Dynamics Kenya',
    description: 'An end-to-end SACCO financial management system for thousands of members: savings, loans, and digital banking.',
  },
  '/case-studies/safarimart': {
    title: 'SafariMart AI Product Assistant Case Study | Cres Dynamics',
    description: 'How a custom-trained AI turned 13 years of SafariMart customer data into a product assistant that answers compound questions.',
  },
  '/case-studies/sheraton-nairobi-westlands': {
    title: 'Hotel Operations AI Case Study: Sheraton Nairobi | Cres Dynamics',
    description: 'An AI-powered operations and approvals platform for a flagship Nairobi hotel. Department sign-offs went from hours to minutes.',
  },
  '/case-studies/smart-brands': {
    title: 'FMCG ERP & 6-Month Demand Forecasting Case Study | Cres Dynamics',
    description: 'FMCG operations system with warehouse management, supermarket POS, distributor networks, and AI demand forecasting 6 months ahead.',
  },
  '/case-studies/spark-lights-254': {
    title: 'Spark Lights 254 Ecommerce & SEO Case Study | Cres Dynamics',
    description: 'Digital transformation for a Kenyan lighting company: automated operations, an ecommerce website, and online sales from Google search.',
  },
  '/case-studies/the-stems-flowers': {
    title: 'The Stems & Flowers Ecommerce Case Study | Cres Dynamics',
    description: 'An ecommerce website with inventory management and WhatsApp ordering for a growing flower shop in Nairobi.',
  },
  '/case-studies/wazaverie': {
    title: 'Wazaverie Fashion AI Sales Analytics Case Study | Cres Dynamics',
    description: 'AI sales analytics and WhatsApp inventory alerts for a fashion business that can now see which products actually sell.',
  },
  '/case-studies/whitelight-store': {
    title: 'Whitelight Store Retail Ecommerce Case Study | Cres Dynamics',
    description: 'A retail ecommerce system for a lighting and home décor store, connecting in-store operations to online sales.',
  },
  '/case-studies/zerepy': {
    title: 'Property Management ERP Case Study: Zerepy Homes | Cres Dynamics',
    description: 'One ERP for a property company: property management, tenant screening, rent collection, and maintenance in a single system.',
  },
  '/solutions/ai-automation': {
    title: 'AI & Automation Solutions Kenya | Cres Dynamics',
    description: 'AI-powered systems that automate repetitive work, reduce errors, and free your team. Built for businesses in Kenya.',
  },
  '/solutions/consulting-strategy': {
    title: 'Technology Consulting & Strategy Kenya | Cres Dynamics',
    description: 'Technology consulting for Kenyan businesses: map the business first, then invest in the systems that move the numbers.',
  },
  '/solutions/content-brand': {
    title: 'Content & Brand Systems Kenya | Cres Dynamics',
    description: 'Brand identity and content systems that keep your business consistent and trusted across every touchpoint.',
  },
  '/solutions/digital-sales': {
    title: 'Digital Sales Systems Kenya | Cres Dynamics',
    description: 'Digital sales systems that capture leads, convert website visitors, and automate your sales pipeline.',
  },
  '/solutions/seo-visibility': {
    title: 'SEO Services Kenya: Rank on Google | Cres Dynamics',
    description: 'SEO strategy and technical foundations that put Kenyan businesses at the top of Google, where customers are searching.',
  },
  '/solutions/web-growth': {
    title: 'Website Growth & Conversion Kenya | Cres Dynamics',
    description: 'Conversion-optimised websites with integrated marketing systems that turn traffic into revenue for Kenyan businesses.',
  },
};

module.exports = { PAGE_META };
