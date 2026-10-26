#!/usr/bin/env python3
"""Generate the industry and expansion landing pages from one template.

Edit the PAGES content below, then run:
    python3 scripts/build-landing-pages.py
Writes views/industries/<slug>.html and views/<slug>.html. Titles and
descriptions for these routes live in lib/page-meta.js.
"""
import html
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = 'https://cresdynamics.com'

PAGES = [
    {
        'file': 'industries/logistics.html', 'path': '/industries/logistics', 'crumb': 'Logistics & distribution',
        'image': '/images/cards/erp-forklift-warehouse.jpg', 'alt': 'Forklift moving stock in a distribution warehouse',
        'h1': 'Logistics and distribution systems in Kenya',
        'statement': 'See every pallet, payment and delivery before it becomes a problem.',
        'lede': 'Cres Dynamics builds systems for logistics, distribution and warehouse companies: stock and fleet in one place, real-time tracking, payment alerts, and AI that predicts demand, spoilage and when to discount.',
        'proof': [('6 months', 'Demand forecast horizon in production'), ('40%', 'Fewer stockouts at Smart Brands'), ('Real time', 'Shipment, stock and payment alerts'), ('10+ countries', 'Systems live across Africa and the US')],
        'problems': [('Stock you cannot see', 'Warehouse and branch counts disagree, so buying runs on guesswork.'), ('Goods that expire on the shelf', 'Nobody is warned until a batch is already a write-off.'), ('Payments chased by phone', 'M-Pesa and bank receipts are matched to orders by hand.'), ('Exceptions lost in WhatsApp', 'Late trucks and short deliveries are discussed, not closed.')],
        'builds': [('Predict', 'Stock and demand forecasts', 'Per product and warehouse, 3 and 6 months ahead, with reorder points that adjust to season.'), ('Alert', 'Spoilage and expiry tracking', 'Batch-level warnings while there is still time to discount or move stock.'), ('Alert', 'Payment matching', 'M-Pesa, bank and card payments matched to orders, with overdue warnings.'), ('Operate', 'Fleet and warehouse exceptions', 'Late deliveries and stock mismatches routed to an owner until closed.'), ('Operate', 'Real-time tracking', 'Order and delivery status for your team and your customers.'), ('Advise', 'Discount and buying advice', 'What to discount, when to hold price, and which products to bring in.')],
        'cases': [('/case-studies/smart-brands', 'FMCG distribution', 'Smart Brands', 'Warehouse, POS and distributor network with 6-month demand forecasting.'), ('/case-studies/paintcare', 'Delivery', 'PaintCare Kenya', 'Delivery platform with real-time tracking and route optimisation.'), ('/logistics-ai', 'Product', 'Logistics and inventory AI', 'The full prediction and alerting system for logistics businesses.')],
        'reading': [('/blog/logistics-operating-system-cres-dynamics', 'The logistics operating system'), ('/blog/ai-inventory-prediction-logistics-spoilage-discounts', 'AI inventory prediction: spoilage and discounts'), ('/blog/logistics-fleet-warehouse-exception-management', 'Fleet and warehouse exception management'), ('/blog/mpesa-integration-business-systems-paybill-stk-push-reconciliation', 'M-Pesa payment matching')],
        'faq': [('Can one system cover several warehouses and branches?', 'Yes. Each warehouse and branch keeps its own stock and team, and management sees one combined view.'), ('Do you integrate with M-Pesa and our accounting software?', 'Yes. M-Pesa, bank and card payments are matched automatically, and the system connects to your existing accounting or ERP.'), ('How long before forecasts are useful?', 'With 12 months or more of sales and stock history, the first forecasts are usually live within weeks of starting.')],
        'service': 'Logistics and distribution software',
    },
    {
        'file': 'industries/fmcg.html', 'path': '/industries/fmcg', 'crumb': 'FMCG',
        'image': '/images/cards/erp-warehouse-operations.jpg', 'alt': 'Consumer goods stock in a warehouse',
        'h1': 'FMCG systems: warehouse, distributors and demand forecasting',
        'statement': 'Connect the warehouse, the shelf and the distributor in one system.',
        'lede': 'For consumer goods companies in Kenya: warehouse management, supermarket POS, distributor portals and AI demand forecasting at SKU level, built around how FMCG really moves.',
        'proof': [('95%', 'Stock visibility accuracy at Smart Brands'), ('40%', 'Reduction in stockouts'), ('30%', 'Faster reorder cycle'), ('6 months', 'SKU-level demand forecasts')],
        'problems': [('Demand signals arrive weeks late', 'Distributor sell-through reaches the warehouse long after it mattered.'), ('Overstock and stockouts at once', 'Popular lines run out while slow lines fill the shelves.'), ('Expiry tracked in spreadsheets', 'Short-dated stock is found too late to sell.'), ('Production planned on gut feel', 'No seasonality or forecast behind the plan.')],
        'builds': [('Warehouse', 'Warehouse management', 'Real-time stock, batches, expiry dates and automated reorder alerts.'), ('Retail', 'Supermarket POS', 'Sales feed straight into stock and demand signals.'), ('Distribution', 'Distributor portal', 'Orders, deliveries and sell-through reported in real time.'), ('Predict', 'Demand forecasting', 'SKU-level forecasts 6 months ahead using sales, seasonality and distributor data.'), ('Sales', 'Sales analytics', 'See which products actually sell, by region and channel.'), ('Alert', 'WhatsApp stock alerts', 'Low-stock and fast-mover alerts sent to the right person.')],
        'cases': [('/case-studies/smart-brands', 'FMCG', 'Smart Brands', 'End-to-end FMCG operations with 6-month demand forecasting.'), ('/case-studies/wazaverie', 'Retail analytics', 'Wazaverie Fashion', 'AI sales analytics and WhatsApp inventory alerts.'), ('/ai-forecasting', 'Product', 'AI forecasting', 'Forecasts and a weekly AI briefing for directors.')],
        'reading': [('/blog/ai-inventory-prediction-logistics-spoilage-discounts', 'AI inventory prediction for distribution'), ('/blog/erp-vs-custom-business-system-kenya', 'ERP vs a custom business system')],
        'faq': [('Does it work with our existing POS hardware?', 'Usually yes. We integrate with POS hardware and inventory systems already in use, or supply the POS as part of the system.'), ('Can distributors use it without training?', 'The distributor portal is built for phones and takes minutes to learn: place an order, track it, report sales.'), ('What data does forecasting need?', 'Ideally 12 months or more of sales by product; distributor and seasonal data improve accuracy.')],
        'service': 'FMCG operations and demand forecasting software',
    },
    {
        'file': 'industries/financial-services.html', 'path': '/industries/financial-services', 'crumb': 'SACCOs & financial services',
        'image': '/images/cards/finance-analytics-dashboard.jpg', 'alt': 'Financial dashboard showing member savings and loans',
        'h1': 'SACCO and financial services systems in Kenya',
        'statement': 'Member savings, loans and reporting you can trust at month-end.',
        'lede': 'Systems for SACCOs, microfinance and finance teams: member accounts, savings and loans, M-Pesa reconciliation, cash forecasting and the audit trail regulators and boards expect.',
        'proof': [('Thousands', 'Members served on our SACCO system'), ('30/60/90', 'Day cash position forecasts'), ('M-Pesa', 'Payments reconciled automatically'), ('Audit-ready', 'Every transaction traceable')],
        'problems': [('Member records in several places', 'Savings, loans and contributions do not reconcile without manual work.'), ('Slow loan processing', 'Applications and approvals move on paper and phone calls.'), ('Month-end takes a week', 'Reports are assembled by hand from exports.'), ('Cash surprises', 'No forward view of collections and payouts.')],
        'builds': [('Members', 'Member accounts', 'Savings, shares and contributions in one record per member.'), ('Credit', 'Loan management', 'Applications, approvals, schedules and arrears tracking.'), ('Payments', 'M-Pesa reconciliation', 'Paybill receipts matched to members and loans automatically.'), ('Digital', 'Member self-service', 'Balances, statements and loan status on a phone.'), ('Predict', 'Cash forecasting', 'Cash position 30, 60 and 90 days ahead.'), ('Control', 'Audit and reporting', 'Board and regulatory reports from live data, with a full audit trail.')],
        'cases': [('/case-studies/sacco-financial-services', 'SACCO', 'SACCO Financial Services', 'End-to-end financial management for thousands of members.'), ('/finance-platforms', 'Product', 'Finance platforms', 'Invoicing, M-Pesa reconciliation and cash forecasting.'), ('/data-security', 'Security', 'Data and security', 'How we protect financial data and align with the Data Protection Act.')],
        'reading': [('/blog/sacco-management-system-kenya-what-to-look-for', 'SACCO management system: what to look for'), ('/blog/mpesa-integration-business-systems-paybill-stk-push-reconciliation', 'M-Pesa integration and automatic reconciliation'), ('/blog/7-signs-business-outgrown-whatsapp-spreadsheets', '7 signs you have outgrown spreadsheets')],
        'faq': [('Can you migrate our existing member records?', 'Yes. Member balances, loans and history are imported and reconciled before go-live.'), ('How is member data protected?', 'Role-based access, encryption, backups and audit logs, aligned with the Kenya Data Protection Act.'), ('Can members use it on their phones?', 'Yes. Members can check balances, statements and loan status from a phone.')],
        'service': 'SACCO and financial services software',
    },
    {
        'file': 'industries/real-estate.html', 'path': '/industries/real-estate', 'crumb': 'Real estate & property',
        'image': '/images/sections/team-collaboration-board.jpg', 'alt': 'Property team planning on a board',
        'h1': 'Real estate and property management systems',
        'statement': 'From the first enquiry to the monthly rent, in one system.',
        'lede': 'For property developers, agents and managers in Kenya: lead-generating websites, tenant screening, rent collection with M-Pesa, maintenance requests and owner reporting.',
        'proof': [('5 departments', 'Run on one ERP at Zerepy Homes'), ('M-Pesa', 'Rent collection matched automatically'), ('24/7', 'Listings and enquiries online'), ('One view', 'Every unit, tenant and payment')],
        'problems': [('Leads lost between listing and viewing', 'Enquiries arrive on five channels and nobody owns the follow-up.'), ('Rent tracked by hand', 'Payments are matched to units from statements.'), ('Maintenance by phone call', 'Requests are forgotten and tenants lose patience.'), ('Owners wait for reports', 'Occupancy and income are compiled manually.')],
        'builds': [('Sales', 'Property websites that generate leads', 'Search-optimised listings that route each enquiry to an agent.'), ('Tenants', 'Tenant screening', 'Applications, checks and approvals in one flow.'), ('Payments', 'Rent collection', 'M-Pesa and bank payments matched to units, with reminders.'), ('Operations', 'Maintenance requests', 'Logged, assigned and tracked to completion.'), ('Reporting', 'Owner dashboards', 'Occupancy, income and arrears per property.'), ('Core', 'Property ERP', 'Departments that used scattered tools work in one system.')],
        'cases': [('/case-studies/zerepy', 'Property ERP', 'Zerepy Homes', 'One ERP for property management, screening, rent and maintenance.'), ('/blog/case-study-nairobi-real-estate-website-lead-machine', 'Website', 'Real estate lead website', 'How a Nairobi property website became a lead machine.'), ('/websites', 'Product', 'High-end websites', 'Premium, search-optimised websites.')],
        'reading': [('/blog/case-study-nairobi-real-estate-website-lead-machine', 'Real estate website case study')],
        'faq': [('Can tenants pay rent through M-Pesa?', 'Yes. Rent paid to your paybill is matched to the right unit automatically, with receipts and reminders.'), ('Can owners see their own properties only?', 'Yes. Owners get a dashboard limited to their properties.'), ('Do you build the property website too?', 'Yes. Listings, search and enquiry routing connect directly to the management system.')],
        'service': 'Real estate and property management software',
    },
    {
        'file': 'industries/education.html', 'path': '/industries/education', 'crumb': 'Education',
        'image': '/images/sections/startup-team-office.jpg', 'alt': 'Team working together in a learning space',
        'h1': 'Education systems: schools, colleges and learning platforms',
        'statement': 'Fees, academics and parents in one system, and learning platforms that scale.',
        'lede': 'Cres Dynamics builds school management systems and learning platforms in Kenya: M-Pesa fee collection, CBC report cards, parent portals, and online learning for thousands of students.',
        'proof': [('10,000+', 'Students on Ongoza Cyber Hub'), ('8+ countries', 'Learners on one platform'), ('M-Pesa', 'School fees reconciled automatically'), ('CBC ready', 'Competency-based report cards')],
        'problems': [('Fees reconciled by hand', 'Bursars match M-Pesa statements to learners line by line.'), ('Report cards take days', 'CBC assessment multiplies manual work.'), ('Parents call for every answer', 'Balances, results and notices are not online.'), ('Learning platforms that do not scale', 'Programmes outgrow spreadsheets and email.')],
        'builds': [('Schools', 'School management system', 'Admissions, fees, academics, attendance and staff in one place.'), ('Fees', 'M-Pesa fee collection', 'Payments matched to learners, receipted and reminded automatically.'), ('Academics', 'CBC assessment', 'Report cards per learner and class in minutes.'), ('Parents', 'Parent portal', 'Balances, results and notices on any phone.'), ('Learning', 'Learning platforms', 'Courses, mentors, missions and certification at scale.'), ('Insight', 'AI insights', 'Fee collection forecasts and learners at risk, flagged early.')],
        'cases': [('/case-studies/ongoza-cyber-hub', 'Learning platform', 'Ongoza Cyber Hub', '10,000+ students across 8+ African countries.'), ('/school-management-system', 'Product', 'School management system', 'Fees, CBC, parents and multi-campus control.')],
        'reading': [('/blog/school-management-system-kenya-guide', "School management system buyer's guide")],
        'faq': [('Can one system run several campuses?', 'Yes. Each campus runs its own classes and fees, and owners see one combined view.'), ('Do you support CBC?', 'Yes. Competency-based assessment and report cards are built in, alongside exam grading where still needed.'), ('Can you build a learning platform, not only school admin?', 'Yes. Ongoza Cyber Hub is a learning and talent platform we built for 10,000+ students.')],
        'service': 'Education and school management software',
    },
    {
        'file': 'industries/manufacturing.html', 'path': '/industries/manufacturing', 'crumb': 'Manufacturing',
        'image': '/images/modern-erp.jpg', 'alt': 'Manufacturing operations data on screens',
        'h1': 'Manufacturing systems: production, inventory and business intelligence',
        'statement': 'Know what the factory produced today, and what it needs tomorrow.',
        'lede': 'For manufacturers in Kenya: real-time production tracking, raw material and finished goods inventory, automated reordering and business intelligence for management.',
        'proof': [('Real time', 'Production tracking on the floor'), ('Automated', 'Raw material reordering'), ('One view', 'Production, stock and sales'), ('BI', 'Dashboards for management')],
        'problems': [('Production reported at day end', 'Problems on the line are found hours late.'), ('Raw materials run out mid-run', 'Reordering depends on someone noticing.'), ('Finished goods counts disagree', 'Warehouse and sales see different numbers.'), ('Management reports by hand', 'Decisions wait for spreadsheets.')],
        'builds': [('Production', 'Production tracking', 'Output, downtime and quality captured as it happens.'), ('Inventory', 'Raw materials and finished goods', 'Stock levels by location with automated reorder points.'), ('Planning', 'Production planning', 'Plans based on orders and demand forecasts.'), ('Quality', 'Quality and batch records', 'Batch traceability from input to dispatch.'), ('Insight', 'Business intelligence', 'Live dashboards for output, cost and margin.'), ('Predict', 'Demand forecasting', 'Forecasts that feed purchasing and production.')],
        'cases': [('/case-studies/manufacturing-digital-transformation', 'Manufacturing', 'Manufacturing digital transformation', 'Production tracking, inventory automation and business intelligence.'), ('/erp', 'Product', 'Custom ERP', 'One system for HR, finance, procurement and inventory.')],
        'reading': [('/blog/erp-vs-custom-business-system-kenya', 'ERP vs a custom business system')],
        'faq': [('Can operators use it on the factory floor?', 'Yes. Capture screens are built for tablets and phones with large, simple inputs.'), ('Does it connect to our accounting system?', 'Yes. Production and inventory data flow to your accounting or ERP.'), ('Can it forecast raw material needs?', 'Yes. Demand forecasts drive raw material and production planning.')],
        'service': 'Manufacturing operations software',
    },
    {
        'file': 'expand-into-east-africa.html', 'path': '/expand-into-east-africa', 'crumb': 'Expanding into East Africa',
        'image': '/images/connecting-nairobi.jpg', 'alt': 'Nairobi skyline connected by business systems',
        'h1': 'Expanding into Kenya and East Africa: the systems partner on the ground',
        'statement': 'Enter the market with systems built for how East Africa pays, sells and operates.',
        'lede': 'Cres Dynamics helps companies entering or growing across Kenya and East Africa run on systems that fit the region: M-Pesa and mobile money, multi-country operations, local data protection, and a Nairobi engineering team that stays after launch.',
        'proof': [('10+ countries', 'Our systems live across Africa and the US'), ('8+ countries', 'Learners on one platform we run'), ('M-Pesa native', 'Mobile money built in, not bolted on'), ('Nairobi team', 'Engineers in your time zone region')],
        'problems': [('Global software that ignores mobile money', 'Customers want to pay by M-Pesa; your platform expects cards.'), ('One country at a time', 'Each new market means another set of tools and spreadsheets.'), ('Local rules and data protection', 'Kenya’s Data Protection Act and local tax rules need to be designed in.'), ('No team on the ground', 'Support and changes wait for a vendor in another time zone.')],
        'builds': [('Payments', 'Mobile money checkout', 'M-Pesa built in; other mobile money and cards integrated per market.'), ('Operations', 'Multi-country operations', 'Entities, branches and currencies in one system with a group view.'), ('Sales', 'Market-entry websites', 'Search-optimised sites that rank locally and capture demand.'), ('Compliance', 'Data protection by design', 'Access control, audit trails and Data Protection Act alignment.'), ('AI', 'Forecasting new markets', 'See demand and cash by country as you grow.'), ('Support', 'Local engineering support', 'A Nairobi team that maintains and extends your systems.')],
        'cases': [('/case-studies/ongoza-cyber-hub', 'Multi-country', 'Ongoza Cyber Hub', 'One platform serving learners across 8+ African countries.'), ('/case-studies/millenia-bos', 'Multi-unit', 'Millenia BOS', 'Six business units on one operating system.'), ('/our-work', 'Portfolio', 'Systems we have built', 'Live systems across sectors and countries.')],
        'reading': [('/blog/outsourcing-software-development-to-kenya-guide', 'Outsourcing software development to Kenya'), ('/blog/mpesa-integration-business-systems-paybill-stk-push-reconciliation', 'How M-Pesa integration works'), ('/blog/why-companies-need-systems-to-scale-kenya', 'Why companies need systems to scale in Kenya')],
        'faq': [('Do you work with companies headquartered outside Kenya?', 'Yes. Our systems run in more than 10 countries across Africa and in the United States.'), ('Can you integrate mobile money beyond M-Pesa?', 'Yes. We integrate the payment providers each market needs as part of the project.'), ('Can you support us after launch?', 'Yes. Our Nairobi team maintains, monitors and extends the systems we build.')],
        'service': 'Market-entry systems for East Africa',
    },
    {
        'file': 'hire-kenyan-developers.html', 'path': '/hire-kenyan-developers', 'crumb': 'Hire a Kenyan engineering team',
        'image': '/images/devs-teams-techies-discussing.jpg', 'alt': 'Cres Dynamics engineers discussing a system design',
        'h1': 'Hire a Kenyan software engineering team',
        'statement': 'Senior product engineering from Nairobi, for companies in the US, UK and Europe.',
        'lede': 'Cres Dynamics is a Nairobi engineering company with 18 engineers building AI systems, business platforms and web products that run in more than 10 countries, including the United States. Work with one accountable team instead of managing freelancers.',
        'proof': [('18', 'Engineers on the team'), ('10+ countries', 'Systems in production, including the US'), ('UTC+3', 'Full overlap with UK and European working days'), ('Owned code', 'You keep the code and the data')],
        'problems': [('Freelancers who disappear', 'Work stalls when one person moves on.'), ('Agencies that only make mockups', 'Designs arrive; working software does not.'), ('No one owns production', 'After launch, nobody watches servers, backups or errors.'), ('Time zones that block progress', 'Questions wait a day for an answer.')],
        'builds': [('AI', 'AI systems and agents', 'Forecasting, AI advisors, RAG assistants and automation.'), ('Platforms', 'Business platforms', 'Operating systems, ERP, finance and workflow platforms.'), ('Web', 'Web products and ecommerce', 'Fast, search-optimised websites and online stores.'), ('Ops', 'DevOps and systems administration', 'Hosting, monitoring, backups and security.'), ('Team', 'Dedicated team', 'A stable team that learns your product and stays on it.'), ('Process', 'Weekly demos', 'Working software every week, not status reports.')],
        'cases': [('/case-studies/optiohire', 'AI product', 'OptioHire', 'AI hiring agent that screens every applicant.'), ('/case-studies/safarimart', 'AI assistant', 'SafariMart Africa', 'Custom-trained AI over 13 years of data.'), ('/how-we-work', 'Process', 'How we work', 'From first conversation to go-live.')],
        'reading': [('/blog/outsourcing-software-development-to-kenya-guide', 'Outsourcing software development to Kenya'), ('/blog/how-to-choose-software-development-company-kenya', 'How to choose a software development company in Kenya')],
        'faq': [('How much overlap is there with US and UK working hours?', 'Nairobi is UTC+3: the full UK and European working day overlaps, and US East Coast mornings overlap with our afternoons.'), ('Who owns the code?', 'You do. Code, data and infrastructure accounts belong to your company.'), ('Can we start small?', 'Yes. Most clients start with one scoped project, then keep the team for ongoing work.')],
        'service': 'Software engineering team in Kenya',
    },
    {
        'file': 'multi-branch-business-system.html', 'path': '/multi-branch-business-system', 'crumb': 'Multi-branch business system',
        'image': '/images/business-operating system.jpg', 'alt': 'Business operating system dashboard for several branches',
        'h1': 'Multi-branch business system for growing companies',
        'statement': 'Open the next branch without opening another set of spreadsheets.',
        'lede': 'For Kenyan companies growing to several branches or business units: one system where each branch runs its own stock, sales, staff and cash, and directors see the whole group live.',
        'proof': [('6 units', 'Unified at Millenia on one system'), ('90%', 'Faster financial consolidation'), ('100%', 'Real-time cross-unit visibility'), ('25%', 'Better resource utilisation')],
        'problems': [('Each branch has its own tools', 'Numbers arrive late and in different formats.'), ('Consolidation takes days', 'Month-end means merging spreadsheets.'), ('Stock moves without a trail', 'Transfers between branches are not tracked.'), ('Directors manage by phone', 'There is no live view of the group.')],
        'builds': [('Branches', 'Per-branch operations', 'Stock, sales, staff and cash for each branch.'), ('Group', 'Group dashboard', 'Live performance across every branch and unit.'), ('Finance', 'Automatic consolidation', 'Group accounts without spreadsheet merging.'), ('Stock', 'Inter-branch transfers', 'Requests, approvals and tracking between branches.'), ('People', 'HR across branches', 'Staff, leave and payroll per branch.'), ('AI', 'AI advisor for directors', 'A weekly briefing on which branches need attention.')],
        'cases': [('/case-studies/millenia-bos', 'Business OS', 'Millenia BOS', 'Six business units with per-unit dashboards and group reporting.'), ('/services/business-operating-system', 'Product', 'AI business operating system', 'The BOS that runs and forecasts multi-unit groups.'), ('/industries/multi-unit', 'Industry', 'Multi-unit groups', 'Group operating systems for multi-unit companies.')],
        'reading': [('/blog/business-operating-system-kenya-cresos-bos', 'Business operating systems for Kenyan companies'), ('/blog/why-companies-need-systems-to-scale-kenya', 'Why companies need systems to scale')],
        'faq': [('Can each branch see only its own data?', 'Yes. Access is set per branch and role; directors see the whole group.'), ('Can we add branches later?', 'Yes. A new branch is configured, not rebuilt.'), ('Does it handle different businesses under one owner?', 'Yes. Millenia runs six different business units on one system.')],
        'service': 'Multi-branch business management software',
    },
]


def esc(s):
    return html.escape(s, quote=True)


def render(p):
    proof = '\n'.join(f'    <div class="proof-strip__item"><strong>{esc(a)}</strong><span>{esc(b)}</span></div>' for a, b in p['proof'])
    problems = '\n'.join(f'      <div class="module-list__item"><strong>{esc(a)}</strong><p>{esc(b)}</p></div>' for a, b in p['problems'])
    builds = '\n'.join(f'''      <div class="path-link">
        <span class="path-link__kicker">{esc(k)}</span>
        <h3 class="path-link__title">{esc(t)}</h3>
        <p class="path-link__desc">{esc(d)}</p>
      </div>''' for k, t, d in p['builds'])
    cases = '\n'.join(f'''      <a class="path-link" href="{h}">
        <span class="path-link__kicker">{esc(k)}</span>
        <h3 class="path-link__title">{esc(t)}</h3>
        <p class="path-link__desc">{esc(d)}</p>
        <span class="path-link__cta">See more →</span>
      </a>''' for h, k, t, d in p['cases'])
    reading = ''.join(f'<li><a href="{h}">{esc(t)}</a></li>' for h, t in p['reading'])
    faq = '\n'.join(f'''      <details>
        <summary>{esc(q)}</summary>
        <p>{esc(a)}</p>
      </details>''' for q, a in p['faq'])
    is_industry = p['path'].startswith('/industries/')
    crumbs = [('Home', BASE + '/')] + ([('Industries', BASE + '/industries')] if is_industry else []) + [(p['crumb'], BASE + p['path'])]
    schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {'@type': 'Service', 'name': p['service'], 'description': p['lede'],
             'provider': {'@id': BASE + '/#organization'},
             'areaServed': [{'@type': 'Country', 'name': 'Kenya'}, {'@type': 'Place', 'name': 'East Africa'}],
             'url': BASE + p['path']},
            {'@type': 'FAQPage', 'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in p['faq']]},
            {'@type': 'BreadcrumbList', 'itemListElement': [{'@type': 'ListItem', 'position': i + 1, 'name': n, 'item': u} for i, (n, u) in enumerate(crumbs)]},
        ],
    }
    crumb_html = ' <span aria-hidden="true">/</span> '.join(
        f'<a href="{u.replace(BASE, "") or "/"}">{esc(n)}</a>' for n, u in crumbs[:-1]) + f' <span aria-hidden="true">/</span> <span>{esc(p["crumb"])}</span>'
    return f'''<!-- {esc(p['crumb'])} (generated by scripts/build-landing-pages.py) -->
<section class="product-hero" aria-label="{esc(p['crumb'])}">
  <img class="product-hero__media" src="{p['image']}" srcset="{p['image']}?w=800 800w, {p['image']} 1920w" sizes="100vw" alt="{esc(p['alt'])}" width="1600" height="900" fetchpriority="high" decoding="async">
  <div class="product-hero__shade" aria-hidden="true"></div>
  <div class="product-hero__content">
    <nav class="crumbs" aria-label="Breadcrumb">{crumb_html}</nav>
    <h1 class="product-hero__brand hero-kicker">{esc(p['h1'])}</h1>
    <p class="home-hero__title" style="max-width:20ch;">{esc(p['statement'])}</p>
    <p class="home-hero__lede">{esc(p['lede'])}</p>
    <div class="home-hero__actions">
      <a class="btn btn-primary" href="#enquire">Tell us what you need</a>
      <a class="btn btn-ghost-light" href="{p['cases'][0][0]}">See the proof</a>
    </div>
  </div>
</section>

<section class="proof-strip" aria-label="Proof">
  <div class="proof-strip__grid">
{proof}
  </div>
</section>

<section class="section-white">
  <div class="section-container">
    <span class="eyebrow">What gets in the way</span>
    <h2 class="section-title">The problems we are usually called in to fix.</h2>
    <div class="module-list" style="margin-top:32px;">
{problems}
    </div>
  </div>
</section>

<section class="section-light">
  <div class="section-container">
    <span class="eyebrow">What we build</span>
    <h2 class="section-title">One system, built around how you work.</h2>
    <div class="capability-grid" style="margin-top:32px;">
{builds}
    </div>
  </div>
</section>

<section class="section-dark">
  <div class="section-container">
    <span class="eyebrow">Proof</span>
    <h2 class="section-title">Built and running in production.</h2>
    <div class="capability-grid" style="margin-top:32px;">
{cases}
    </div>
    <div class="related-reading"><span>Further reading</span><ul>{reading}</ul></div>
  </div>
</section>

<section class="section-white">
  <div class="section-container">
    <span class="eyebrow">Questions</span>
    <h2 class="section-title">Common questions.</h2>
    <div class="faq-list" style="margin-top:32px;">
{faq}
    </div>
  </div>
</section>

<script type="application/ld+json">
{json.dumps(schema, ensure_ascii=False, indent=1)}
</script>
'''


for p in PAGES:
    out = os.path.join(ROOT, 'views', p['file'])
    with open(out, 'w') as f:
        f.write(render(p))
    print('wrote', p['file'])
