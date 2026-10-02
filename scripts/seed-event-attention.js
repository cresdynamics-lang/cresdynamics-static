/**
 * Event-attention blog seeding — 2 posts:
 *   POST A: Networking (the "5 people" hook) -> targets networking event Kenya/ Nairobi/ Westlands
 *   POST B: Doubling sales & profitability   -> targets business growth events, entrepreneurship Nairobi
 * Run from /var/www/sites/cresdynamics.com with: node scripts/seed-event-attention.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { Pool } = require('pg');

const POSTS = [
  // ════════════════════════════════════════════════════════════════
  //  EVENT POST A — networking (the "5 people" hook)
  // ════════════════════════════════════════════════════════════════
  {
    slug: "networking-events-nairobi-2026-power-of-networking",
    title: "The Power of Networking: Networking Events Nairobi 2026",
    excerpt: "You rise to the level of the five people you surround yourself with. Find your five at the networking events Nairobi in 2026 — The Future of AI in Business, 31st October, Sarit Expo Centre.",
    category: "Events",
    meta_title: "Networking Events Nairobi 2026 | Business Networking Kenya",
    meta_description: "The best business networking event in Nairobi 2026: The Future of AI in Business at Sarit Expo Centre, 31st October. Surround yourself with the people who build, create, and scale.",
    published_days_ago: 1,
    body: `The best business decisions in Kenya are made in rooms, not in DMs. If you have been searching for networking events Nairobi 2026, or a business networking event in Westlands that actually delivers, The Future of AI in Business at Sarit Expo Centre is where the right rooms are happening on 31st October.

## You rise to the level of the five people you surround yourself with

If you're around five people who are in a boutique business, guess who you wanna be? Because the conversations are around the boutique business. So if you get around business people, the conversations are gonna be around building, creating, how to scale, tools to use, mistakes to avoid early.

That is the quiet law of networking events. Your ambition does not move as fast as your environment. When you walk into a room where the talk is about systems, revenue, and the next 90 days, you start thinking in that register. When you walk into a room where the talk is about who is struggling, you inherit that stress. Choose your room.

## The best networking events Kenya has in 2026

Not every business event in Nairobi is worth your Saturday. The ones that change your year share the same traits:

- The founders and owners in the room are already operating at the level you want to reach.
- The conversations go beyond introductions and into how, not just what.
- People actually follow up, and deals, referrals, and partnerships form after the event.
- There are real systems on display, not just speeches about possibilities.

The Future of AI in Business is built around all four. It is a business networking event in Westlands where the people at the front of the room are the builders and owners of live Kenyan companies, and the people in the seats are the ones ready to move.

## What happens in a room full of business people

When you surround yourself with founders, builders, and operators, the conversations change. Instead of complaining about the economy, people talk about how to scale. Instead of guarding weak processes, owners compare the tools they use. Instead of learning mistakes the expensive way, you hear where to avoid them early.

Add AI and predictive systems to that mix and the room gets even sharper. The builders are showing the machines that run their cash flow, their approvals, and their forecasting, and they will answer your questions directly.

- Founders comparing how they moved from five apps to one operating system.
- Owners showing the dashboards they open every morning.
- Developers explaining the AI systems companies are paying for right now.
- Deals struck over coffee, between the sessions, and after the closing.

## Networking that continues past the event

The real return from business networking events in Kenya is what happens after you leave. At this event, the connections are organised around the gaps people actually have. If you are looking for a systems partner, you meet the engineers. If you are looking for clients, you meet owners who are scaling and admitting they need better systems.

One conversation at an event like this can open the door that a year of cold messages cannot.

## Lock arms and cross over 2026

You have 100% uncertainty, but if there's 1% certainty about this opening doors for you, let's lock arms and cross over 2026.

Date: Saturday, 31st October 2026. Venue: Sarit Expo Centre, Westlands, Nairobi. Get your pass at <a href="/events">cresdynamics.com/events</a>.

Bring a genuine question and an open mind. The five people who raise your level are already confirmed on the guest list — the only missing piece is you.
`
  },

  // ════════════════════════════════════════════════════════════════
  //  EVENT POST B — doubling sales / profitability (growth hook)
  // ════════════════════════════════════════════════════════════════
  {
    slug: "double-your-sales-business-growth-events-nairobi-2026",
    title: "Imagine Doubling Your Sales: Business Growth Events Nairobi 2026",
    excerpt: "Imagine if your sales and profitability were twice as high as they are today. The Future of AI in Business is the business growth event in Nairobi built to close that gap — 31st October.",
    category: "Events",
    meta_title: "Double Your Sales: Business Growth Events Nairobi 2026",
    meta_description: "The business growth event in Nairobi that tackles the question every owner asks: is doubling my sales possible? The Future of AI in Business, 31st October, Sarit Expo Centre.",
    published_days_ago: 3,
    body: `Imagine if your sales and profitability were twice as high as they are today.

Imagine earning twice as much as your very best year. What kind of a difference would that make in your life?

Here's a question: is that possible? Well, the only question you have to ask then is, is there anybody in your industry who is earning twice as much as you? If you're honest, you'll admit that there are.

That gap, between where you are and where the leaders in your industry already stand, is not luck and it is not a different economy. It is a difference in systems, in visibility, and in how fast decisions move. And it is exactly what The Future of AI in Business, the business growth event in Nairobi on 31st October at Sarit Expo Centre, is built to unpack.

## Is doubling your sales possible?

Every business owner in Kenya has asked this question. The honest answer is that some businesses in every industry are growing at double the rate of their peers while running on similar teams and similar budgets. When you study them, the pattern is consistent:

- Their numbers are visible daily, not reconstructed monthly.
- Their repetitive work is automated, not staffed.
- Their decisions are based on predictions, not on reports from three weeks ago.
- Their cash flow is managed 90 days ahead, not 90 days behind.

None of that requires more hours. It requires better systems. That is why this event exists: to show business owners in Nairobi exactly how the companies doubling their sales are wired, from the inside.

## What the growth event in Nairobi actually covers

Most business events in Kenya give you motivation and leave you to figure out the mechanics. This one shows the mechanics on stage.

- Live case studies of Kenyan companies that automated revenue, invoicing, and follow-ups.
- Dashboards that show how leaders see money before it moves.
- AI systems that forecast demand, flag risk, and predict cash flow.
- Owners who will tell you, honestly, what changed after the system went live.

If you are comparing business growth events Nairobi has on the 2026 calendar, this is the one where the growth story comes with working evidence, not just ambition.

## What it would be worth to you

Sit with the question for a moment. If your sales and profitability were even fifty percent higher, what changes in your life? More freedom. More hiring power. More resilience when the market shifts. That is the real value at stake, and it is within reach of companies that stop running on manual tools.

The companies earning twice as much as their industry average did not get there by working twice as hard. They got there by deciding what to automate, what to measure, and what to predict — and then building the system that does all three.

## Decide in one afternoon

The Future of AI in Business, 31st October 2026, Sarit Expo Centre, Westlands, Nairobi. One afternoon, real systems, real Kenyan businesses already doing this. Come find out what is possible.

Book your seat at <a href="/events">cresdynamics.com/events</a>. The answer to whether doubling your sales is possible for your business starts with showing up.
`
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
         VALUES ($1, $2, $3, $4, $5, 'published', $6, $7, 'CRES Dynamics', $8)
         ON CONFLICT (slug) DO UPDATE SET
           title = EXCLUDED.title,
           excerpt = EXCLUDED.excerpt,
           category = EXCLUDED.category,
           body = EXCLUDED.body,
           status = 'published',
           meta_title = EXCLUDED.meta_title,
           meta_description = EXCLUDED.meta_description,
           author = EXCLUDED.author,
           published_at = COALESCE(blog_posts.published_at, EXCLUDED.published_at),
           updated_at = now()`,
        [p.slug, p.title, p.excerpt, p.category, p.body, p.meta_title, p.meta_description, publishedAt]
      );
      inserted += res.rowCount;
      console.log(`OK: ${p.slug}`);
    } catch (err) {
      console.error(`FAIL: ${p.slug} — ${err.message}`);
    }
  }

  console.log(`\nSeeded/updated ${inserted}/${POSTS.length} posts`);
  await pool.end();
}

seed().catch((err) => { console.error(err); process.exit(1); });