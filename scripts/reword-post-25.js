/**
 * A06 (approved by Cres: "reword"): remove the unverifiable "#1 / verified by Clutch AI"
 * claims from blog post 25 and keep its URL. Only this one row is updated, and only if
 * it is unchanged since it was read (updated_at check). Original text is kept in
 * content-archive/blog-25-cres-dynamics-number-one-original-2026-10-26.json.
 *
 * Run once: node scripts/reword-post-25.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { Pool } = require('pg');

const SLUG = 'cres-dynamics-number-one-digital-innovation-company-kenya';
const EXPECTED_UPDATED_AT = '2026-07-27T09:38:30.931Z';

const POST = {
  title: 'Cres Dynamics: AI Systems and Digital Innovation in Kenya',
  meta_title: 'Cres Dynamics: AI Systems & Digital Innovation in Kenya',
  meta_description: 'Cres Dynamics Ltd builds AI systems, business operating systems and high-end websites in Nairobi. Results from live systems in 10+ countries.',
  excerpt: 'Who Cres Dynamics is, what we build, and the results from systems running in production: approvals in minutes at Sheraton, 6-month demand forecasting at Smart Brands, and six business units on one system at Millenia.',
  body: `Cres Dynamics Ltd is a Nairobi software company that builds the systems companies run on: AI systems and AI agents, business operating systems, ERP, logistics and school systems, and high-end websites. We work from Kivuli Tower in Westlands, and the systems we build are in production in more than 10 countries across Africa and the United States, used by more than 15,000 people every day.

We would rather show results than claim rankings. Here is what that looks like.

## Results from systems in production

- **Sheraton Nairobi Westlands:** an AI-powered operations and approvals platform took department sign-offs from hours to minutes, with every decision captured in an audit trail.
- **Smart Brands:** an FMCG system covering warehouse, supermarket POS and distributors, with AI demand forecasting six months ahead. Stock visibility reached 95% accuracy, stockouts fell 40% and reorder cycles got 30% faster.
- **Millenia:** one business operating system now runs six business units, with financial consolidation 90% faster and live cross-unit visibility.
- **OptioHire:** an AI hiring agent that screens every applicant, cutting screening time by 90%.
- **SafariMart Africa:** a custom-trained AI assistant that turned 13 years of customer data into instant product answers.
- **Ongoza Cyber Hub:** a learning and talent platform serving more than 10,000 students across 8+ African countries.

## AI that sits on real operations

AI only counts as innovation when it reduces cost or wins time. We build AI on top of structured operations: forecasting that predicts sales, stock and cash three and six months ahead, AI advisor agents that brief directors every week, assistants that answer from your own documents, and automation that removes duplicate entry between WhatsApp, spreadsheets and finance tools.

## Websites built to be found and to sell

For brands that need to stand out, we build fast, search-optimised websites and online stores with M-Pesa and card checkout, WhatsApp ordering, inventory and delivery tracking. Spark Lights 254, for example, became discoverable on Google for lighting searches in Nairobi after we rebuilt its site around search and catalogue education.

## Systems that run the whole business

CresOS and our business operating systems bring finance, CRM, HR, projects and multi-branch operations into one platform, so directors see one version of the truth. For specific sectors we build logistics and inventory AI, school management systems, SACCO platforms and property systems.

## How we work

We start by mapping how your company approves, sells, stocks and gets paid, then ship working software every week. You own the code and the data, and our team stays to run, monitor and extend what we build.

## Talk to us

If your company is losing time to manual workflows, an invisible website or forecasts that arrive too late, bring us the numbers that hurt. See our <a href="/projects">live projects</a> and <a href="/case-studies">case studies</a>, explore <a href="/ai-systems">AI systems for companies in Kenya</a>, or <a href="/contact">tell us what you need built</a>.
`,
};

(async () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const res = await pool.query(
    `UPDATE blog_posts SET title=$1, meta_title=$2, meta_description=$3, excerpt=$4, body=$5, updated_at=now()
     WHERE slug=$6 AND date_trunc('milliseconds', updated_at) = $7::timestamptz`,
    [POST.title, POST.meta_title, POST.meta_description, POST.excerpt, POST.body, SLUG, EXPECTED_UPDATED_AT]
  );
  console.log(res.rowCount === 1 ? 'Updated post 25 (URL unchanged).' : 'Not updated: the post changed since it was read, or was already reworded.');
  await pool.end();
})().catch((err) => { console.error(err.message); process.exit(1); });
