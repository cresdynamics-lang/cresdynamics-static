/**
 * Seed blog posts into PostgreSQL.
 * Run after init-db.js: node scripts/seed-blog.js
 */
require('dotenv').config();
const { Pool } = require('pg');

const BLOG_POSTS = [
  {
    slug: "integrate-ai-into-business-workflows-kenya",
    title: "How Cres Dynamics Helps Companies Integrate AI Into Daily Workflows",
    excerpt: "AI only creates value when it sits inside the work your team already does. Here is how Cres Dynamics wires AI into real Kenyan business workflows.",
    category: "AI",
    metaTitle: "Integrate AI Into Business Workflows Kenya | Cres",
    metaDescription: "Learn how Cres Dynamics helps Kenyan companies integrate AI into daily workflows — from status updates to RAG knowledge and voice commands.",
  },
  {
    slug: "ai-integration-industrial-area-nairobi-companies",
    title: "AI Integration for Industrial Area Businesses — More Than Five Companies Live",
    excerpt: "Cres Dynamics has integrated AI and operating systems for more than five companies in Nairobi's industrial area. Here is what that looks like on the ground.",
    category: "AI",
    metaTitle: "AI Integration Industrial Area Nairobi | Cres Dynamics",
    metaDescription: "Cres Dynamics has live AI and workflow integrations with more than five industrial-area companies in Nairobi — practical systems, not demos.",
  },
  {
    slug: "rag-systems-for-kenyan-businesses",
    title: "Building RAG Systems for Kenyan Businesses: Answers From Your Own Knowledge",
    excerpt: "RAG lets your team ask questions and get answers grounded in your SOPs, contracts, and manuals — not generic internet chat.",
    category: "AI",
    metaTitle: "RAG Systems for Kenyan Businesses | Cres Dynamics",
    metaDescription: "Cres Dynamics builds RAG systems so Kenyan teams get answers from company documents — SOPs, policies, and manuals — inside their workflow.",
  },
  {
    slug: "ai-voice-commands-business-systems-kenya",
    title: "AI Voice Commands at Work: Speak Once, Let the System Do the Rest",
    excerpt: "When people are short on time, typing kills momentum. Cres Dynamics adds AI voice commands so teams can speak updates and the system does the work.",
    category: "AI",
    metaTitle: "AI Voice Commands for Business Systems Kenya | Cres",
    metaDescription: "Cres Dynamics builds AI voice commands into business systems so Kenyan teams can speak tasks and updates instead of typing everything.",
  },
  {
    slug: "cresos-project-management-hr-module",
    title: "Project Management and HR in CresOS: One System for Delivery and People",
    excerpt: "CresOS now brings full project management and HR together — due-date flags, reporting, leave, and team structure in one operating system.",
    category: "CresOS",
    metaTitle: "CresOS Project Management & HR Module | Cres Dynamics",
    metaDescription: "CresOS includes project management and HR — flag due work, report in-system, manage people, and keep delivery aligned.",
  },
  {
    slug: "team-community-reporting-ai-one-system",
    title: "Team Community, Reporting, and AI — All in One Cres Dynamics System",
    excerpt: "Replace scattered WhatsApp groups with in-system community chat, structured reporting, and AI that helps the team move faster.",
    category: "CresOS",
    metaTitle: "Team Community & AI in One System | Cres Dynamics",
    metaDescription: "Cres Dynamics systems combine team community chat, reporting, project flags, and AI voice/RAG — WhatsApp-like communication tied to real work.",
  },
  {
    slug: "logistics-ai-predictions-analysis-kenya",
    title: "AI Predictions and Analysis for Logistics Companies in Kenya",
    excerpt: "Logistics firms in Kenya can use AI for demand forecasting, route analysis, and exception prediction — embedded in the workflows dispatch teams already run.",
    category: "Logistics",
    metaTitle: "AI Predictions for Logistics in Kenya | Cres Dynamics",
    metaDescription: "How Cres Dynamics embeds AI demand forecasting, route analysis, and exception prediction into logistics workflows for Kenyan operators.",
  },
  {
    slug: "logistics-workflow-automation-kenya",
    title: "Workflow Automation for Logistics Operations — Dispatch to Delivery",
    excerpt: "From dispatch approvals to proof of delivery and invoicing triggers, workflow automation removes the manual handoffs that slow Kenyan logistics teams.",
    category: "Logistics",
    metaTitle: "Logistics Workflow Automation Kenya | Cres Dynamics",
    metaDescription: "Automate dispatch, approvals, handoffs, POD, and invoicing triggers for Kenyan logistics operations with Cres Dynamics.",
  },
  {
    slug: "logistics-realtime-tracking-alerts-credits",
    title: "Real-Time Tracking, Flagging, Alerts, and Credits Management for Logistics",
    excerpt: "GPS tracking, SLA flags, customer alerts, and credit hold/release belong in one system — not scattered across spreadsheets and phone calls.",
    category: "Logistics",
    metaTitle: "Real-Time Logistics Tracking & Credits | Cres Dynamics",
    metaDescription: "Real-time GPS tracking, SLA alerts, customer credit limits, hold/release, and reconciliation for Kenyan logistics companies.",
  },
  {
    slug: "logistics-field-feedback-sales-marketing-procurement",
    title: "Field Feedback from Sales, Marketing, and Procurement Teams in Logistics",
    excerpt: "Sales reps, marketing campaigns, and procurement buyers all generate field intelligence. One system captures it and routes it to operations.",
    category: "Logistics",
    metaTitle: "Field Feedback for Logistics Teams | Cres Dynamics",
    metaDescription: "Capture field feedback from sales, marketing, and procurement into one logistics system — built by Cres Dynamics for Kenyan operators.",
  },
  {
    slug: "logistics-fleet-warehouse-exception-management",
    title: "Fleet and Warehouse Exception Management for Growing Logistics Firms",
    excerpt: "Delays, shortages, damaged goods, and unclear ownership break logistics SLAs. Structured exception management keeps growing firms in control.",
    category: "Logistics",
    metaTitle: "Fleet & Warehouse Exception Management | Cres Dynamics",
    metaDescription: "Manage delays, shortages, damaged goods, and escalations for Kenyan logistics fleets and warehouses with Cres Dynamics.",
  },
  {
    slug: "logistics-operating-system-cres-dynamics",
    title: "Building a Logistics Operating System with Cres Dynamics",
    excerpt: "Orders, tracking, credits, AI, field input, and leadership dashboards belong in one logistics operating system — not a patchwork of tools.",
    category: "Logistics",
    metaTitle: "Logistics Operating System Kenya | Cres Dynamics",
    metaDescription: "Build an end-to-end logistics operating system — orders, tracking, credits, AI, field input, and dashboards — with Cres Dynamics.",
  },
];

async function seed() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  let inserted = 0;

  for (const post of BLOG_POSTS) {
    try {
      await pool.query(
        `INSERT INTO blog_posts (slug, title, excerpt, category, meta_title, meta_description, status, published_at, author)
         VALUES ($1, $2, $3, $4, $5, $6, 'published', now() - interval '${Math.floor(Math.random() * 90)} days', 'CRES Dynamics')
         ON CONFLICT (slug) DO NOTHING`,
        [post.slug, post.title, post.excerpt, post.category, post.metaTitle, post.metaDescription]
      );
      inserted++;
    } catch (err) {
      console.error(`Failed: ${post.slug} — ${err.message}`);
    }
  }

  console.log(`Seeded ${inserted}/${BLOG_POSTS.length} blog posts`);
  await pool.end();
}

seed().catch((err) => { console.error(err); process.exit(1); });
