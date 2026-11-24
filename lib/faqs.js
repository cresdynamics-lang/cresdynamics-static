// Question-and-answer blocks for answer engines (Google AI Overviews, ChatGPT,
// Perplexity, Claude, Copilot). Each route gets a visible FAQ section and a
// matching FAQPage JSON-LD block, rendered by renderPage() in server.js.
// Pages that already carry their own FAQPage markup are skipped automatically.
//
// Rules for answers: plain facts, first sentence answers the question on its
// own, no prices (pricing is custom), no team names or bios, and we build
// systems, not products.

const EMAIL = 'info@cresdynamics.com';

const FAQS = {
  '/about': [
    ['Who is Cres Dynamics?', 'Cres Dynamics Ltd is a software engineering company in Nairobi, Kenya, that builds AI systems, business operating systems, ERP, school management systems and high-end websites for growing companies.'],
    ['Where are Cres Dynamics offices?', 'Cres Dynamics has two offices in Nairobi: Westlands (Kivuli Tower), operating since January 2026, and Rongai, on Ole Kasasi opposite Manna Bible College.'],
    ['Which countries does Cres Dynamics work in?', 'Systems built by Cres Dynamics run in more than 10 countries, including Kenya, Tanzania, Mauritius, South Africa and the United States.'],
    ['Who are Cres Dynamics clients?', 'Clients include Smart Brands, Cyber Hub, Gadget Hub Investments, Strive Creative (South Africa), Millenia, House of Procurement and SAG Agro, which operates in Tanzania, Kenya and Mauritius.'],
  ],
  '/why-us': [
    ['Why choose Cres Dynamics over a freelancer or an off-the-shelf system?', 'Cres Dynamics designs each system around how your business actually runs, connects it to M-Pesa, banks and WhatsApp, and keeps the same engineers on it after go-live.'],
    ['Do we own the code Cres Dynamics builds?', 'Yes. You own the code, the database and the infrastructure accounts, and you can host the system anywhere.'],
    ['Does Cres Dynamics support systems after launch?', 'Yes. The team that built the system monitors, fixes and extends it after go-live.'],
  ],
  '/ai-automation': [
    ['Which company builds AI automation for businesses in Kenya?', 'Cres Dynamics in Nairobi builds AI automation that handles enquiries, approvals, reports and data entry for companies in Kenya and across Africa.'],
    ['What business tasks can AI automate?', 'Common ones are answering customer enquiries on WhatsApp and web chat, reconciling M-Pesa and bank payments, producing daily reports, following up unpaid invoices and routing approvals.'],
    ['Will AI automation work with our existing systems?', 'Yes. Cres Dynamics connects automation to the tools you already use, such as your ERP, accounting system, M-Pesa, email and spreadsheets.'],
    ['How much does AI automation cost in Kenya?', `Cres Dynamics prices every project to its scope. Email ${EMAIL} with what you want automated and the team will reply with a quote.`],
  ],
  '/ai-systems': [
    ['Who builds AI systems and AI agents in Kenya?', 'Cres Dynamics, a Nairobi software company, builds AI systems and AI agents for businesses in Kenya and more than 10 other countries.'],
    ['What can an AI agent do for directors and executives?', 'An AI agent can read your sales, stock and finance data, flag what is changing, and suggest actions such as reordering stock, chasing payments or adjusting prices.'],
    ['Can AI predict sales and stock 3 to 6 months ahead?', 'Yes. Cres Dynamics builds forecasting systems that use your own history to project sales, stock needs and cash flow 3 to 6 months ahead and alert you to risks early.'],
    ['Is our data safe in an AI system?', 'Your data stays in systems you own, access is limited by role, and Cres Dynamics follows the Kenya Data Protection Act.'],
  ],
  '/services/business-operating-system': [
    ['What is a business operating system?', 'A business operating system is one system that runs sales, stock, finance, staff and reporting together, so every branch and department works from the same live data.'],
    ['Who builds business operating systems in Kenya?', 'Cres Dynamics in Nairobi builds custom business operating systems for multi-branch retailers, distributors, schools, hospitality and service companies.'],
    ['How is a business operating system different from an ERP?', 'An ERP is usually a fixed package you adapt your business to. A business operating system from Cres Dynamics is built around your existing workflows, with AI forecasting and alerts included.'],
    ['Can it connect to M-Pesa and our bank?', 'Yes. Payments from M-Pesa and partner banks are matched to invoices and orders automatically.'],
  ],
  '/cresos': [
    ['What is CresOS?', 'CresOS is the modular business operating system Cres Dynamics builds on: projects, finance, CRM, HR, chat, analytics and AI in one platform, configured for each company.'],
    ['Is CresOS an off-the-shelf product?', 'No. CresOS is a foundation that Cres Dynamics tailors into a system for each client, so the modules and workflows match how that business runs.'],
    ['Which businesses use CresOS?', 'Growing companies in Kenya and the region that have outgrown spreadsheets, especially those with several branches, teams or warehouses.'],
  ],
  '/erp': [
    ['Who builds custom ERP systems in Kenya?', 'Cres Dynamics in Nairobi builds custom ERP systems covering stock, procurement, sales, finance and HR for companies in Kenya and across Africa.'],
    ['Should we buy an ERP package or build a custom ERP?', 'A package suits standard processes. A custom ERP suits companies whose branches, pricing or approvals do not fit a package, and it avoids per-user licence fees.'],
    ['Can a custom ERP handle several branches?', 'Yes. Each branch gets its own stock, sales and reports, and head office sees everything live in one place.'],
    ['How much does a custom ERP cost in Kenya?', `Pricing depends on modules, branches and integrations. Email ${EMAIL} for a quote.`],
  ],
  '/e-commerce': [
    ['Who builds high-end ecommerce websites in Kenya?', 'Cres Dynamics in Nairobi builds fast, high-end ecommerce websites with M-Pesa and card checkout, stock sync and delivery tracking.'],
    ['Can an ecommerce site take M-Pesa payments?', 'Yes. Cres Dynamics builds M-Pesa and card checkout and reconciles every transaction automatically.'],
    ['Will the online shop sync with our physical stock?', 'Yes. Online and in-store stock come from the same system, so customers cannot order items that are sold out.'],
  ],
  '/websites': [
    ['Who builds high-end business websites in Kenya?', 'Cres Dynamics in Nairobi builds fast, search-optimised business websites that are designed to bring in enquiries, not just look good.'],
    ['Will our website rank on Google?', 'Every Cres Dynamics website ships with page speed, structured data, per-page titles and a sitemap, which are the technical foundations Google needs to rank it.'],
    ['How much does a website cost in Kenya?', `Cres Dynamics quotes each website to its scope. Email ${EMAIL} with what you need.`],
  ],
  '/software': [
    ['Who develops custom software in Nairobi?', 'Cres Dynamics is a Nairobi software engineering company that builds custom business systems, web applications and integrations.'],
    ['Can you work with companies outside Kenya?', 'Yes. Cres Dynamics systems run in more than 10 countries, including the United States, South Africa, Tanzania and Mauritius.'],
    ['Who owns the software you build?', 'You do. The code, data and hosting accounts belong to your company.'],
  ],
  '/finance-platforms': [
    ['Can a finance platform reconcile M-Pesa and bank payments automatically?', 'Yes. Cres Dynamics builds finance platforms that match M-Pesa, bank and card payments to invoices and flag anything that does not match.'],
    ['Can the system alert us to late payments?', 'Yes. It sends payment alerts and follow-ups for overdue invoices and shows cash flow forecasts for the next 3 to 6 months.'],
    ['Which banks do you integrate with?', 'Cres Dynamics partners with Stanbic Bank, Co-operative Bank and I&M Bank, and integrates with other banks that offer APIs or statement exports.'],
  ],
  '/operations-workflow': [
    ['What is workflow automation?', 'Workflow automation moves approvals, requests and handovers into one system, so each step happens on time without chasing people on WhatsApp or email.'],
    ['Which workflows do companies automate first?', 'Usually purchase approvals, stock requests between branches, leave and expense requests, and daily reporting.'],
  ],
  '/industries/retail': [
    ['What system do retailers in Kenya use to manage several shops?', 'Multi-branch retailers use a business operating system that runs POS, stock, M-Pesa payments and reports across every shop. Cres Dynamics builds these in Nairobi.'],
    ['Can a system predict which products will sell next month?', 'Yes. AI forecasting uses your sales history to predict demand, suggest the right product mix and flag stock that should be discounted before it ages.'],
    ['Does it reduce stock losses?', 'Yes. Live stock counts, transfers between branches and exception alerts make shortages and shrinkage visible the same day.'],
  ],
  '/industries/hospitality': [
    ['What systems do hotels and restaurants in Kenya need?', 'Most need orders, stock and kitchen control, M-Pesa and card payments, and daily reports in one system. Cres Dynamics builds these for hospitality businesses.'],
    ['Can the system reduce food spoilage?', 'Yes. It tracks stock by expiry, predicts usage and alerts you before items spoil.'],
  ],
  '/industries/multi-unit': [
    ['How do we manage many branches from one place?', 'A business operating system gives every branch the same processes and sends live sales, stock and cash figures to head office in one dashboard.'],
    ['Do you build systems for franchises and chains?', 'Yes. Cres Dynamics builds multi-branch systems for chains, franchises and distributors in Kenya and the region.'],
  ],
  '/pricing': [
    ['How much does Cres Dynamics charge?', `Cres Dynamics uses custom pricing: every system is quoted to its scope. Email ${EMAIL} with what you need and the team will reply with a quote.`],
    ['Why is there no price list?', 'Each system is built around a different business, number of branches and integrations, so a fixed price list would not be accurate.'],
  ],
  '/contact': [
    ['How do I contact Cres Dynamics?', `Email ${EMAIL}. The team replies directly and can book a call.`],
    ['Where is Cres Dynamics located?', 'Cres Dynamics has offices in Westlands and Rongai (Ole Kasasi, opposite Manna Bible College), Nairobi, Kenya.'],
  ],
  '/case-studies': [
    ['What results have Cres Dynamics clients seen?', 'The case studies show measured results, such as faster reporting, fewer stock errors and more online enquiries, for retailers, manufacturers, hospitality and financial services clients.'],
    ['Can I speak to a client before hiring Cres Dynamics?', `Yes. Email ${EMAIL} and the team will arrange a reference where the client agrees.`],
  ],
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function faqSection(items) {
  return `
<section class="section-white faq-auto">
  <div class="section-container">
    <span class="eyebrow">Questions</span>
    <h2 class="section-title">Common questions.</h2>
    <div class="faq-list" style="margin-top:32px;">
${items.map(([q, a]) => `      <details>
        <summary>${esc(q)}</summary>
        <p>${esc(a)}</p>
      </details>`).join('\n')}
    </div>
    <p class="faq-more">Have a question that is not answered here? Email <a href="mailto:${EMAIL}">${EMAIL}</a> and the team will reply directly.</p>
  </div>
</section>
`;
}

function faqSchema(items) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

// Question/answer pairs already written into a page as <details><summary>…</summary><p>…</p>
function pageFaqItems(page) {
  const strip = (h) => h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#39;|&rsquo;/g, "'");
  const out = [];
  for (const m of page.matchAll(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)) {
    const q = strip(m[1]); const a = strip(m[2]);
    if (q && a && !/not answered here/i.test(q)) out.push([q, a]);
  }
  return out;
}

module.exports = { FAQS, faqSection, faqSchema, pageFaqItems };
