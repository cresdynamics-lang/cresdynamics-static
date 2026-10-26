/**
 * October 2026 content: 4 posts filling gaps in the target-search list (growth plan M03).
 *   - software development company kenya / custom software development nairobi
 *   - mpesa integration for business / ecommerce website with mpesa
 *   - sacco management system kenya
 *   - hire software developers in kenya / outsource software development africa
 *
 * INSERT-ONLY: ON CONFLICT DO NOTHING. Existing posts and all other data are never
 * updated or deleted. Safe to re-run.
 *
 * Run: node scripts/seed-blog-2026-10.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { Pool } = require('pg');

const POSTS = [
  {
    slug: 'how-to-choose-software-development-company-kenya',
    title: 'How to Choose a Software Development Company in Kenya: A 10-Point Checklist for 2026',
    excerpt: 'Hiring a software development company in Kenya? Ten questions that separate teams that ship working systems from teams that ship mockups, from code ownership to who answers the phone after launch.',
    category: 'Software',
    meta_title: 'Software Development Company Kenya: Checklist | Cres Dynamics',
    meta_description: 'How to choose a software development company in Kenya: 10 questions on proof, code ownership, M-Pesa, security, support and pricing before you sign.',
    published_days_ago: 0,
    body: `Searching for a software development company in Kenya returns hundreds of names, and most of their websites say the same things. The difference shows up months later: one team delivers a system your staff use every day, another delivers a demo that never quite works. This checklist is what we would ask if we were the buyer. Use it with any vendor, including Cres Dynamics Ltd.

## 1. Can they show systems that are live today?

Ask for systems in production, not designs. A good team can show you software real businesses run on every day and tell you what changed after it went live. At Cres Dynamics, for example, our projects page lists live systems: an operations and approvals platform for Sheraton Nairobi Westlands, an FMCG system with demand forecasting for Smart Brands, and a business operating system that runs six business units for Millenia.

## 2. Do they start with your process or with their product?

Teams that open with a feature list are selling a template. Teams that start by mapping how your company approves, sells, stocks and gets paid build software your staff will actually use. Ask what their discovery phase produces and how long it takes.

## 3. Who owns the code and the data?

You should. Confirm in writing that the code, the database and the hosting accounts belong to your company, and that you can move to another team if you need to.

## 4. Do they understand how Kenya pays?

M-Pesa is not an add-on. Ask how they handle paybill and till payments, STK push, and automatic reconciliation of payments to invoices, orders or accounts. A vendor that treats M-Pesa as an afterthought will leave your finance team matching statements by hand.

## 5. How do they deliver: big bang or working releases?

Ask how often you will see working software. Weekly demos and small releases reduce risk and keep the project honest. A single launch after six silent months is a warning sign.

## 6. Who looks after the system after launch?

Most problems start after go-live. Ask who monitors servers, backups and errors, how quickly they respond, and what support costs. A team that also does systems administration will keep the system healthy rather than hand it over and disappear.

## 7. How do they handle security and data protection?

Ask about access control, encryption, backups, audit logs and alignment with the Kenya Data Protection Act. Ask to see how a user's access is removed when they leave.

## 8. Can the system grow with you?

What works for one branch should work for ten. Ask how they handle new branches, business units, users and countries without rebuilding.

## 9. Is the price clear about what changes it?

Good vendors explain what drives cost: the number of modules, integrations, data migration, and the level of support after launch. Be wary of a low fixed price that leaves out migration and support.

## 10. Will they tell you when software is not the answer?

The best sign of an honest partner is a team that tells you when a process change, not a new system, will fix the problem.

## How Cres Dynamics answers these questions

Cres Dynamics Ltd is a Nairobi software company at Kivuli Tower, Westlands, with systems in production in more than 10 countries, including the United States. We build custom software, AI systems, business operating systems, ERP and high-end websites, and we keep running what we build.

See <a href="/software">custom software development in Kenya</a>, our <a href="/projects">live projects</a>, <a href="/how-we-work">how we work</a>, or <a href="/contact">tell us what you need built</a>.
`,
  },
  {
    slug: 'mpesa-integration-business-systems-paybill-stk-push-reconciliation',
    title: 'M-Pesa Integration for Business Systems: Paybill, STK Push and Automatic Reconciliation',
    excerpt: 'How M-Pesa integration works inside a real business system: paybill and till payments, STK push checkout, payouts, and matching every payment to the right invoice, order or account automatically.',
    category: 'Payments',
    meta_title: 'M-Pesa Integration for Business: Paybill, STK Push | Cres Dynamics',
    meta_description: 'M-Pesa integration for business systems in Kenya: paybill and till payments, STK push checkout, payouts and automatic reconciliation to invoices and orders.',
    published_days_ago: 1,
    body: `For most Kenyan businesses, M-Pesa is where the money arrives. Yet in many companies, finance teams still download statements and match payments to customers by hand. A properly integrated system removes that work: every payment lands, is identified, and updates the right invoice, order, school fee account or loan in seconds. This guide explains how M-Pesa integration works in practice and what to ask for.

## The building blocks

Safaricom's Daraja API exposes the pieces a business system uses. The ones that matter most are:

- C2B (customer to business): payments to your paybill or till. Your system is notified the moment a payment arrives, with the amount, phone number and account reference.
- STK push (Lipa Na M-Pesa Online): your website or app sends a payment prompt straight to the customer's phone. They enter their PIN and the order is paid without typing a paybill number.
- B2C (business to customer): payouts such as refunds, commissions or loan disbursements.
- Transaction status and reversal queries, used to confirm or correct payments.

## Reconciliation is the real value

Receiving a payment is easy. Knowing what it was for is the hard part. A good integration uses the account reference (an invoice number, admission number, order number or member number) to match each payment automatically. When the reference is missing or wrong, the payment goes into a short exceptions queue for a person to resolve, instead of disappearing into a statement.

The result is a live view of who has paid, who has not, and how much cash came in today, without a weekly reconciliation exercise.

## Where M-Pesa integration pays off

- Ecommerce: STK push at checkout, with stock and order status updating as soon as payment confirms.
- Schools: fee payments matched to each learner by admission number, receipted instantly, with reminders for balances.
- SACCOs and lenders: contributions and loan repayments matched to members, with payouts through B2C.
- Distributors and logistics: payment alerts the moment money lands, matched to orders and credit accounts.
- Service businesses: invoices marked paid automatically and overdue accounts flagged.

## What to ask a developer

Ask how they handle failed or duplicate callbacks, how payments without a valid reference are handled, whether reconciliation covers bank and card payments too, and how the system confirms a payment before releasing goods. Ask where payment records are stored and who can see them.

## How Cres Dynamics builds it

At Cres Dynamics Ltd, M-Pesa is built into the systems we deliver rather than added at the end: our finance platforms, school management system, ecommerce websites and logistics AI all match payments automatically and alert the right people when money arrives or goes overdue.

See <a href="/finance-platforms">finance platforms with M-Pesa reconciliation</a>, <a href="/e-commerce">ecommerce websites with M-Pesa checkout</a>, the <a href="/school-management-system">school management system</a>, or <a href="/contact">talk to us about your payment flow</a>.
`,
  },
  {
    slug: 'sacco-management-system-kenya-what-to-look-for',
    title: 'SACCO Management System in Kenya: What Boards and Managers Should Look For',
    excerpt: 'A practical guide to choosing a SACCO management system in Kenya: member accounts, loans, M-Pesa reconciliation, member self-service, reporting and data protection.',
    category: 'Financial Services',
    meta_title: 'SACCO Management System Kenya: What to Look For | Cres Dynamics',
    meta_description: 'Choosing a SACCO management system in Kenya? Member accounts, loans, M-Pesa reconciliation, member self-service, board reporting and data protection.',
    published_days_ago: 2,
    body: `A SACCO runs on trust. Members trust that their savings are recorded correctly, that loans are processed fairly, and that the board knows the true position. When records live across spreadsheets, paper ledgers and M-Pesa statements, that trust is hard to keep. A SACCO management system puts every member, contribution and loan in one place. Here is what boards and managers should look for.

## One record per member

Every member should have a single record holding shares, deposits, contributions, loans, guarantors and history. Staff should never have to check three places to answer a member's question.

## Loans from application to repayment

Look for a loan module that covers the full cycle: application, eligibility checks against savings and guarantors, approval workflow, disbursement, repayment schedules, and arrears tracking. Approvals should leave an audit trail showing who approved what and when.

## M-Pesa contributions and repayments matched automatically

Members pay by M-Pesa. The system should match each paybill payment to the right member and purpose (deposit, share or loan repayment) using the account reference, receipt it, and update balances immediately. Unmatched payments should go to a short exceptions list, not into a statement nobody reads.

## Member self-service

Members should be able to check balances, statements and loan status from a phone without calling the office. This cuts queries and builds confidence.

## Reporting for the board and the regulator

Board packs and regulatory returns should come from live data, not from a week of spreadsheet work. Deposit-taking SACCOs report to SASRA, so ask how the system supports the reports you file and how quickly month-end closes.

## Cash forecasting

A good system shows not just today's position but what is coming: expected repayments, pending disbursements and the cash position 30, 60 and 90 days ahead. That lets the board plan lending with confidence.

## Security and data protection

Member data is sensitive. Ask about role-based access, encryption, backups, audit logs and alignment with the Kenya Data Protection Act. Ask how access is removed when staff leave.

## Migration without losing history

Moving from an old system or spreadsheets is the riskiest step. Ask how member balances and loan histories are imported and reconciled before go-live, and how long both systems run side by side.

## How Cres Dynamics helps

Cres Dynamics Ltd built an end-to-end financial management system for a SACCO serving thousands of members, covering savings, loans and digital banking. We combine that with finance platforms that reconcile M-Pesa automatically and forecast cash 30, 60 and 90 days ahead.

See <a href="/industries/financial-services">SACCO and financial services systems</a>, the <a href="/case-studies/sacco-financial-services">SACCO case study</a>, <a href="/finance-platforms">finance platforms</a>, or <a href="/contact">book a conversation with our team</a>.
`,
  },
  {
    slug: 'outsourcing-software-development-to-kenya-guide',
    title: 'Outsourcing Software Development to Kenya: A Guide for US, UK and European Companies',
    excerpt: 'Why companies in the US, UK and Europe hire Kenyan software teams, how time zones, contracts and code ownership work, and how to run the engagement so it ships.',
    category: 'Engineering Teams',
    meta_title: 'Outsourcing Software Development to Kenya: Guide | Cres Dynamics',
    meta_description: 'Hiring software developers in Kenya: time-zone overlap with the UK, Europe and US, contracts, code ownership, communication and how to start with Cres Dynamics.',
    published_days_ago: 3,
    body: `Nairobi has become one of Africa's main technology hubs, with a deep pool of engineers building products used across the continent and beyond. For companies in the US, UK and Europe, a Kenyan engineering team can mean senior product engineering, a convenient time zone and a partner that understands how emerging markets pay and operate. This guide covers what to expect and how to make the engagement work.

## Why companies hire teams in Kenya

- Time zone: Kenya is on UTC+3 all year. The full UK and European working day overlaps with Nairobi's, and US East Coast mornings overlap with Nairobi afternoons.
- English-speaking engineering culture, with teams used to working with international product owners.
- Experience building for mobile-first and mobile-money markets, valuable for any company expanding into Africa.
- A stable, accountable team rather than a rotating set of freelancers.

## Freelancers, staff augmentation or a delivery team?

Freelancers suit small, well-defined tasks. Staff augmentation adds individual developers to your team, which works if you have strong engineering management. A delivery team takes responsibility for an outcome: design, build, test, deploy and support. If you lack local engineering leadership, a delivery team with its own technical lead is usually the safer choice.

## Contracts and code ownership

Agree in writing that your company owns the code, data, designs and infrastructure accounts. Keep repositories and cloud accounts in your own organisation from day one, with the team invited as collaborators. Agree how confidential information and personal data are handled, including Kenya's Data Protection Act where Kenyan data is involved.

## Communication that keeps projects on track

Set a weekly demo of working software, a shared task board, and a named lead on both sides. Ask for short written updates rather than long status meetings. The best signal of a healthy engagement is software you can click every week.

## Starting small

Start with a scoped first project of a few weeks, such as an internal tool, an integration or one module, then extend once you trust the team's delivery and communication.

## What to check before you sign

Ask to see live systems the team built, talk to a past client, confirm who will actually work on your project, and understand how support works after launch.

## Working with Cres Dynamics

Cres Dynamics Ltd is a Nairobi engineering company with 18 engineers building AI systems, business platforms and web products. Our systems run in more than 10 countries across Africa and in the United States. You own the code, you see working software every week, and the same team stays to support and extend what we build.

See <a href="/hire-kenyan-developers">hire a Kenyan software engineering team</a>, our <a href="/projects">live projects</a>, <a href="/expand-into-east-africa">expanding into East Africa</a>, or <a href="/contact">tell us about your project</a>.
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
