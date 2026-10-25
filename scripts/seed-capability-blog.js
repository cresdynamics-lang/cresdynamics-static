/**
 * Capability blog seeding: 6 posts targeting searches for what Cres Dynamics builds
 * (AI systems, school management systems, ecommerce websites, logistics AI,
 * business operating systems, AI agents).
 *
 * INSERT-ONLY: ON CONFLICT DO NOTHING. Existing posts and all other data are never
 * updated or deleted. Safe to re-run.
 *
 * Run: node scripts/seed-capability-blog.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { Pool } = require('pg');

const POSTS = [
  {
    slug: 'ai-systems-kenya-predict-sales-stock-cash-flow',
    title: 'AI Systems in Kenya: How Companies Predict Sales, Stock and Cash Flow 3 to 6 Months Ahead',
    excerpt: 'What an AI system actually does for a Kenyan company: forecasting sales, stock, and cash 3 and 6 months ahead, and AI advisors that tell directors what to act on.',
    category: 'AI & Systems',
    meta_title: 'AI Systems in Kenya: Predict Sales, Stock & Cash | Cres Dynamics',
    meta_description: 'How AI systems help Kenyan companies predict sales, stock, and cash flow 3 to 6 months ahead, with AI advisors for directors. A guide from Cres Dynamics Ltd.',
    published_days_ago: 0,
    body: `Most directors in Kenya do not need another dashboard. They need to know what is coming. Will cash be tight in March? Which branch is about to miss target? Which products will run out before the next shipment lands? An AI system answers those questions before they become emergencies. This guide explains what that looks like in practice, and how Cres Dynamics Ltd builds AI systems for companies in Nairobi, across Kenya, and in more than 10 countries.

## What an AI system is, in plain terms

An AI system is software that learns from your own records (sales, invoices, stock movements, payments, customer behaviour) and turns them into predictions and recommendations. It is not a chatbot bolted onto your website. It sits on top of how the business already runs and does three jobs: it predicts, it alerts, and it advises.

## Predicting the next 3 and 6 months

Forecasting is where AI pays for itself first. With 12 or more months of clean history, a forecasting model can project sales by product, branch, and region for the next quarter and the next half-year. It does the same for cash: money expected in from invoices and M-Pesa collections against money going out on payroll, suppliers, and rent, giving a 30, 60, and 90-day cash position. For distributors and retailers it predicts demand, so purchasing is based on what will sell rather than what sold last month.

Every forecast should come with a confidence range. A number without a range invites false certainty. A range tells a finance director how much buffer to hold.

## Alerts that arrive before the problem

The second job is watching the business continuously. Useful alerts include a branch trending below target three weeks before month-end, receivables ageing past their normal pattern, stock that will run out before the reorder arrives, and a sudden change in what customers are buying. Alerts go to the person who owns the problem, by email or WhatsApp, with the reason attached.

## AI advisors for directors and executives

The third job is advice. An AI advisor agent reads the forecasts and the live numbers, then writes a short weekly briefing for directors: what changed, what it means, and the three actions with the biggest impact. Directors can also ask questions in plain language, such as "Why is Mombasa down this quarter?" or "What happens to cash if we hire ten people in March?", and get answers grounded in company data, not guesses.

## What it takes to get there

AI is only as good as the data under it. That is why Cres Dynamics usually starts by structuring operations, often inside a business operating system such as CresOS, so sales, finance, and stock live in one place. Then the forecasting and advisor layers go on top. A typical path is an audit in week one, a single forecast (cash or demand) live within weeks, and the advisor briefing added once the numbers have proven reliable.

## Proof it works in Kenya

Cres Dynamics runs demand forecasting 6 months ahead in production for Smart Brands, an FMCG business with warehouses, supermarket POS, and distributor networks. Our finance platforms give directors live 30, 60, and 90-day cash positions. Our systems run in more than 10 countries across Africa and in the United States.

If you are searching for an AI systems company in Kenya, start with the decisions you want to stop guessing. Then see <a href="/ai-forecasting">AI forecasting and executive advisor agents</a>, explore <a href="/ai-systems">AI systems for companies in Kenya</a>, or <a href="/contact">book a strategy session with Cres Dynamics</a>.
`,
  },
  {
    slug: 'school-management-system-kenya-guide',
    title: 'School Management System in Kenya: Features, M-Pesa Fees, CBC Report Cards and What to Ask Before You Buy',
    excerpt: 'A buyer\'s guide to school management systems in Kenya: M-Pesa fee collection, CBC assessment, parent portals, multi-campus control, and AI insights for school owners.',
    category: 'Education Systems',
    meta_title: 'School Management System Kenya: Buyer\'s Guide | Cres Dynamics',
    meta_description: 'Choosing a school management system in Kenya? Features to demand: M-Pesa fees, CBC report cards, parent portal, attendance, multi-campus, and AI insights.',
    published_days_ago: 1,
    body: `Kenyan schools run on fees, results, and trust with parents, and most still manage all three across spreadsheets, receipt books, and WhatsApp groups. A good school management system replaces that patchwork with one system that bursars, teachers, principals, and parents actually use. This guide covers what to look for, what to ask vendors, and how Cres Dynamics Ltd builds school management systems for schools in Kenya.

## Fee collection that reconciles itself

Fees are the lifeblood of a private school, and they are where most time is lost. The system should generate fee structures per class and term, accept payments through your M-Pesa paybill, and match each payment to the right learner automatically using the admission number. Parents should get an instant receipt, and the bursar should see balances in real time without matching M-Pesa statements line by line. Reminders by SMS or WhatsApp before and after due dates should run on their own.

## CBC assessment and report cards

Under the Competency-Based Curriculum, assessment is continuous and descriptive, which makes manual report cards slow. Look for a system that records assessments per learning area and competency, generates report cards per learner and class in minutes, and keeps exam-based grading for the levels that still need it. Teachers should be able to enter marks from a phone.

## A parent portal parents will use

Parents want three things: their balance, their child's progress, and school notices. A mobile-friendly parent portal that shows all three, and lets parents pay by M-Pesa from the same screen, cuts calls to the office and speeds up collections.

## Attendance, timetables, staff, and the rest

Daily attendance with absence alerts to parents, timetable building, staff records, leave, and payroll belong in the same system as fees. So do transport routes, boarding allocations, the store, uniforms, and the library. When everything lives in one place, the principal sees the whole school instead of chasing reports.

## Multi-campus schools

School groups need each campus to run its own classes, fees, and staff while owners and boards get one combined view. Ask any vendor to demonstrate this live with two campuses.

## AI insights for owners and boards

Modern systems go beyond record-keeping. They should forecast fee collections for the coming term, flag learners at risk of falling behind before exams, and send the principal and directors a short weekly summary of what needs attention.

## Questions to ask before you buy

Ask who owns the data and how you export it. Ask how existing records and fee balances are migrated. Ask what training is included for bursars and teachers, and who answers the phone when something breaks during admissions week. Ask to see M-Pesa reconciliation working with real transactions.

## Why Cres Dynamics

Cres Dynamics builds business operating systems and AI systems for companies, and we bring the same engineering to schools. We also built Ongoza Cyber Hub, a learning platform serving more than 10,000 students across 8+ African countries. Each school system is configured around your fee structure, curriculum, and approvals instead of a generic template.

See the <a href="/school-management-system">school management system by Cres Dynamics</a>, or <a href="/contact">request a demo with your own fee structure and classes</a>.
`,
  },
  {
    slug: 'ecommerce-website-development-kenya-high-end',
    title: 'Ecommerce Website Development in Kenya: What a High-End Online Store Needs to Sell (and Rank on Google)',
    excerpt: 'What separates a high-end ecommerce website in Kenya from a template store: M-Pesa and card checkout, speed, search visibility, inventory, delivery tracking, and WhatsApp ordering.',
    category: 'Websites & Ecommerce',
    meta_title: 'Ecommerce Website Development Kenya: High-End Guide | Cres Dynamics',
    meta_description: 'Planning an ecommerce website in Kenya? What a high-end store needs: M-Pesa checkout, speed, Google ranking, inventory, delivery tracking, and WhatsApp ordering.',
    published_days_ago: 2,
    body: `Kenyan shoppers search on Google, compare on Instagram, ask questions on WhatsApp, and pay with M-Pesa, often all in the same evening. An ecommerce website that ignores any one of those steps loses the sale to a competitor who does not. This guide explains what a high-end ecommerce website in Kenya needs, and how Cres Dynamics Ltd builds online stores that look premium, load fast, rank on Google, and connect to the operations behind them.

## Checkout built for how Kenya pays

The checkout is where stores win or lose. A Kenyan store needs M-Pesa STK push that confirms in seconds, card payments for diaspora and corporate buyers, and clear delivery fees by area before payment. Pay-on-delivery should be a deliberate choice with controls, not a default that leaks money. PaintCare Kenya, one of the stores Cres Dynamics built, stopped pay-on-delivery losses by redesigning delivery and payment together.

## Speed and design that signal quality

High-end does not mean heavy. Premium brands need large, sharp product photography, but served as modern compressed images so pages load fast on mobile data. Clean typography, generous spacing, consistent brand colours, and readable contrast make a store feel trustworthy. Every page should work perfectly on a phone, because that is where most Kenyan buyers shop.

## Built to be found on Google

A beautiful store nobody finds is a cost, not an asset. Each category and product page needs its own title and description, structured data so Google understands products and prices, a sitemap, fast load times, and content that answers what buyers search. Spark Lights 254 reached page one of Google for lighting searches in Nairobi after Cres Dynamics rebuilt its site around search and catalogue education.

## Inventory, orders, and delivery behind the storefront

The storefront is half the system. Behind it, stock levels should update with every sale, online and in-store, so customers never order something that is out of stock. Orders should flow to a dashboard with status tracking, and customers should get delivery updates without calling. For florists and gift shops such as The Stems & Flowers and Floral Whispers Gifts, same-day delivery windows and occasion-driven demand shape the whole design.

## WhatsApp as a sales channel, not a leak

Many Kenyan buyers still want to ask a question before paying. A WhatsApp button that opens a conversation with the product already attached keeps the sale alive. An AI sales assistant can answer common questions at 2 AM and hand serious buyers to a human, which is what Cres Dynamics built for Frank Labels.

## What it costs and how long it takes

Cost depends on catalogue size, integrations (M-Pesa, ERP, delivery partners), and design depth. A focused first release can go live in weeks, then grow. Avoid quotes that do not mention M-Pesa reconciliation, search optimisation, or who maintains the store after launch.

See <a href="/e-commerce">ecommerce website development by Cres Dynamics</a>, <a href="/websites">high-end website design in Kenya</a>, the stores on our <a href="/projects">projects page</a>, or <a href="/contact">start your store with a strategy session</a>.
`,
  },
  {
    slug: 'ai-inventory-prediction-logistics-spoilage-discounts',
    title: 'AI Inventory Prediction for Logistics and Distribution: Stop Spoilage, Know When to Discount, and Stock What Sells',
    excerpt: 'How AI helps logistics, distribution, and warehouse businesses predict stock and market shifts, get payment and spoilage alerts, and decide what to discount and what to bring in.',
    category: 'Logistics & AI',
    meta_title: 'AI Inventory Prediction for Logistics & Warehouses | Cres Dynamics',
    meta_description: 'AI for logistics and distribution: predict stock and market shifts, get spoilage and payment alerts, and know when to discount and which products to bring in.',
    published_days_ago: 3,
    body: `In logistics and distribution, money is lost quietly: stock that expires in a back row, a price cut that came a week too late, a product line that stopped selling months before anyone noticed, a payment nobody followed up. An AI inventory system makes those losses visible early enough to act. This article explains how, and how Cres Dynamics Ltd builds logistics AI systems running for businesses in Kenya, across Africa, and in the United States.

## Predicting stock, per product and per warehouse

Stock prediction starts with history: sales by product, branch, and season, supplier lead times, and promotions. From that, the system forecasts how much of each product each warehouse will need for the next 3 and 6 months and sets reorder points that adjust automatically. Purchasing stops being a gut call made from last month's numbers.

## Detecting market shifts early

Demand rarely collapses overnight. It drifts. AI watches for drift: a product slowing in two regions at once, a competitor's price change showing up in your conversion rate, customers switching pack sizes. Spotting these shifts weeks early lets you adjust orders and pricing before a warehouse fills with stock nobody wants.

## Spoilage and expiry alerts

For food, beverages, pharmaceuticals, cosmetics, and anything with a shelf life, batch and expiry tracking is essential. The system compares each batch's expiry date with forecast sales and raises an alert when a batch will not sell in time, while there is still time to discount it, transfer it to a faster-moving branch, or return it to the supplier.

## When to discount, and when not to

Discounting is a decision, not a reflex. The AI recommends which products to discount and by how much to clear ageing stock, and, just as important, tells you when to hold the price because demand is about to rise. That protects margin on products that would have sold at full price anyway.

## Which products to bring in

Ranking products and suppliers by margin, sell-through speed, and forecast demand shows which lines deserve more shelf and warehouse space and which should be phased out. Dead stock stops accumulating.

## Payment alerts and cash visibility

Every M-Pesa, bank, and card payment is matched to orders and invoices automatically, with instant alerts when money lands and early warnings on overdue accounts. Combined with stock forecasts, directors see both sides of the business: what is coming in and what needs to be bought.

## A weekly briefing for management

The AI advisor turns all of this into a short weekly briefing for directors: stock at risk, cash expected, demand shifts, and the three actions that matter most. Managers can ask follow-up questions in plain language.

## Proof in production

Cres Dynamics runs 6-month demand forecasting for Smart Brands across warehouses, supermarket POS, and distributor networks, and builds logistics operating systems covering fleet, warehouse exceptions, real-time tracking, and field feedback. Our systems run in more than 10 countries.

See the <a href="/logistics-ai">logistics and inventory AI system</a>, read about <a href="/ai-forecasting">AI forecasting for directors</a>, or <a href="/contact">send us a sample of your stock data and see what it would have predicted</a>.
`,
  },
  {
    slug: 'business-operating-system-kenya-cresos-bos',
    title: 'Business Operating System for Kenyan Companies: Replace 10 Disconnected Tools With One System',
    excerpt: 'What a business operating system is, why growing Kenyan companies outgrow WhatsApp, spreadsheets, and separate apps, and how CresOS and the Cres Dynamics BOS run finance, CRM, HR, and operations in one place.',
    category: 'Business Operating Systems',
    meta_title: 'Business Operating System Kenya: CresOS & BOS | Cres Dynamics',
    meta_description: 'A business operating system runs finance, CRM, HR, projects, and multi-branch operations in one platform. How Kenyan companies replace scattered tools with CresOS.',
    published_days_ago: 0,
    body: `Most growing companies in Kenya run on a patchwork: sales in WhatsApp, money in spreadsheets and M-Pesa statements, staff records in a folder, projects in someone's head, and reports assembled by hand every Friday. Each tool works on its own. Together they hide the truth about the business. A business operating system fixes that by putting every department on one platform. This guide explains what that means, and how Cres Dynamics Ltd builds business operating systems for companies in Nairobi, across Kenya, and in more than 10 countries.

## What a business operating system is

A business operating system (BOS) is one platform that runs the core of a company: finance, sales and CRM, HR and payroll, projects, procurement, inventory, and reporting. Instead of exporting data from one app to paste into another, every department works on the same records. When sales closes a deal, finance sees the invoice, operations sees the work, and the director sees the numbers, without anyone forwarding a spreadsheet.

## Signs you have outgrown your tools

You need a business operating system when month-end takes a week of reconciling, when two managers quote different numbers for the same thing, when approvals wait days because the right person did not see a message, when you cannot tell which branch or business unit is actually profitable, and when only one person knows how a critical process works.

## CresOS: one system, every department

CresOS is the modular business operating system built by Cres Dynamics. It covers projects, finance, CRM, HR, team chat, analytics, and AI in one platform, with M-Pesa built in. Companies switch on the modules they need and add more as they grow. Pricing is by module, not per seat, so adding staff does not punish growth.

## BOS: the operating system that thinks ahead

The Cres Dynamics BOS takes CresOS further. It predicts what is coming, automates repetitive work, and surfaces answers before directors ask. That includes cash forecasts 30, 60, and 90 days out, demand predictions 3 and 6 months ahead, and an AI advisor that sends directors a weekly briefing on what changed and what to act on.

## Built for multi-branch and multi-unit groups

Kenyan groups often run several branches or completely different businesses under one owner. A business operating system should let each unit run its own finance, staff, and stock while giving owners one consolidated view. Cres Dynamics built exactly this for Millenia, where one operating system runs 6 business units with per-unit dashboards and group reporting. For Zerepy Homes, one system replaced five departments' worth of scattered tools across property management, tenant screening, rent collection, and maintenance.

## How rollout works without stopping the business

A business operating system is not a big-bang switch. We start with the department where the pain is sharpest, usually finance or sales, migrate its data, train the team, and go live. Then the next department joins the same platform. Each step delivers value on its own, so the company never waits a year to see a return.

If your company is searching for a business operating system in Kenya, see <a href="/cresos">CresOS</a>, the <a href="/services/business-operating-system">AI-powered BOS</a>, the <a href="/case-studies/millenia-bos">Millenia BOS case study</a>, or <a href="/contact">book a strategy session with Cres Dynamics</a>.
`,
  },
  {
    slug: 'ai-agents-for-business-kenya-executive-advisor',
    title: 'AI Agents for Business in Kenya: Sales Agents, Hiring Agents, and AI Advisors That Tell Directors What to Do',
    excerpt: 'What AI agents actually do for Kenyan businesses: WhatsApp sales agents that close orders at 2 AM, hiring agents that screen every applicant, operations agents, and AI advisors that brief directors.',
    category: 'AI & Systems',
    meta_title: 'AI Agents for Business in Kenya | Cres Dynamics',
    meta_description: 'AI agents for Kenyan businesses: WhatsApp sales agents, hiring agents, operations agents, and AI advisors that tell directors what to act on. Built by Cres Dynamics.',
    published_days_ago: 1,
    body: `An AI agent is software that does a job, not just answers a question. It reads information, makes a decision within rules you set, takes an action, and hands off to a person when it should. For Kenyan businesses, that means fewer leads lost overnight, faster hiring, quicker approvals, and directors who see problems early. This guide covers the AI agents that pay off fastest, with real examples from systems Cres Dynamics Ltd has built.

## WhatsApp sales agents that sell while you sleep

Kenyan customers ask before they buy, and they ask on WhatsApp, often late at night. A sales agent trained on your products, prices, stock, and delivery areas answers instantly, recommends alternatives, takes the order, and passes serious or complex buyers to a human in the morning with the full conversation attached. Cres Dynamics built this for Frank Labels: clients message at 2 AM, and the business answers.

## Hiring agents that screen every applicant

When a role attracts hundreds of CVs, good candidates get lost. A hiring agent reads every application, matches skills to the role, ranks candidates, and gives the hiring manager a shortlist with reasons. OptioHire, built and run by Cres Dynamics, does exactly this, removing guesswork and inconsistency from first-round screening. A human still makes every hiring decision.

## Product and customer knowledge agents

Many companies sit on years of product and customer data that nobody can query. A knowledge agent trained on that data answers staff and customer questions, including compound ones. For SafariMart Africa, Cres Dynamics built a custom-trained AI that turned 13 years of customer data into a product assistant.

## Operations and approval agents

Approvals stall when the right person does not see the request. An operations agent routes requests, reminds approvers, escalates when deadlines slip, and keeps an audit trail. At Sheraton Nairobi Westlands, an AI-powered operations and approvals platform cut department sign-offs from hours to minutes.

## AI advisors for directors and executives

The most valuable agent for leadership is an advisor. It reads forecasts and live numbers, predicts sales, cash, and demand 3 and 6 months ahead, and writes a weekly briefing for directors: what changed, why, and the three actions with the biggest impact. Directors can ask it questions in plain language and get answers grounded in company data.

## How to start without risk

Pick one agent tied to revenue or time lost. Define what it may and may not do, and when it must hand off to a person. Run it on one channel or one team, measure the result for a few weeks, then expand. Keep humans in control of money, hiring, and customer commitments.

Cres Dynamics builds AI agents and AI systems for companies in Kenya and in more than 10 countries. See <a href="/ai-automation">AI agents and business automation</a>, <a href="/ai-forecasting">AI forecasting and executive advisor agents</a>, the <a href="/case-studies/optiohire">OptioHire case study</a>, or <a href="/contact">talk to Cres Dynamics about your first agent</a>.
`,
  },
];

async function seed() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  let inserted = 0;
  for (const p of POSTS) {
    const publishedAt = new Date(Date.now() - p.published_days_ago * 86400000);
    try {
      const res = await pool.query(
        `INSERT INTO blog_posts (slug, title, excerpt, category, body, status, meta_title, meta_description, author, published_at)
         VALUES ($1, $2, $3, $4, $5, 'published', $6, $7, 'Cres Dynamics', $8)
         ON CONFLICT (slug) DO NOTHING`,
        [p.slug, p.title, p.excerpt, p.category, p.body, p.meta_title, p.meta_description, publishedAt]
      );
      inserted += res.rowCount;
      console.log(`${res.rowCount ? 'INSERTED' : 'EXISTS (left unchanged)'}: ${p.slug}`);
    } catch (err) {
      console.error(`FAIL: ${p.slug} — ${err.message}`);
    }
  }
  console.log(`\nInserted ${inserted}/${POSTS.length} new posts. No existing rows were modified.`);
  await pool.end();
}

seed().catch((err) => { console.error(err); process.exit(1); });
