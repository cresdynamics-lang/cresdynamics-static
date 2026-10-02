/**
 * Event-attention blog — networking with founders, CEOs & investors.
 * The "scan the room / colored lanyards" hook. Targets:
 *   how to network with founders and investors, networking for jobs Kenya,
 *   networking events Nairobi investors, business networking Westlands.
 * Run from /var/www/sites/cresdynamics.com with: node scripts/seed-scan-room.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { Pool } = require('pg');

const POSTS = [
  {
    slug: "scan-the-room-networking-with-founders-investors-nairobi",
    title: "Scan the Room: Networking with Founders, CEOs, and Investors in Nairobi",
    excerpt: "If you want to create value in your network, surround yourself with the people who decide where the world is going. Learn how to scan the room and spot the colored lanyards at Nairobi's networking events.",
    category: "Events",
    meta_title: "How to Network with Founders & Investors in Nairobi | Networking 2026",
    meta_description: "The value is in the room. Learn how to scan the room, read the colored lanyards, and network your way to founders, CEOs, and investors at Nairobi's business events in 2026.",
    published_days_ago: 2,
    body: `If you are looking to create real value in your network, surround yourself with the people who decide where the world is going. Not people who talk about it. Not people who complain about it. The founders who built it, the CEOs who run it, and the investors who fund it.

The value is in the room.

Every business event in Nairobi has this value sitting inside it. The difference between a networker who walks out with deals, jobs, and ideas that matter, and the one who walks out with a handful of business cards, is simple: they know the room before they enter it.

## Scan the room before you say hello

The first skill is not conversation. It is reading. When you walk into a networking event in Nairobi, spend the first ten minutes scanning. Where is the energy? Who is surrounded by people already? Which directions do people gravitate toward? The room tells you where the value is before you start introducing yourself.

Scan for the signals:

- Who is being listened to, not just talked at.
- Who is holding court near the stage or the sponsor booths.
- Who moves between groups quickly, because their time is short and their value is high.
- Who looks like nobody knows who they are, even though they clearly decide things.

## The colored lanyards: know who you are talking to

At events like The Future of AI in Business, the badges and lanyards are not decoration. They are a map of the room. Speakers, sponsors, founders, investors, and attendees are distinguished the moment you enter, so you never have to waste time guessing.

- Gold or VIP lanyards: speakers and sponsors, the people who decide budgets and build companies.
- Founder or investor tags: the people funding and running the ventures in the room.
- Standard attendee badges: the people you should still meet, because some of them are the next VCs.

Learn the badge system before the event, then walk in knowing exactly who you need to talk to. There is no time to waste on the wrong conversation.

## Networking as a job search

If you are looking for a job, the event is not about handing out CVs. It is about being remembered in the right rooms. The hidden job market in Kenya, like everywhere, runs on referrals. Founders hire people they met, people they watched ask a sharp question, people who helped them before asking for anything.

- Ask a founder about the hardest part of their system, not about open roles.
- Offer something small and real: an insight, a connection, a follow-up note.
- Let your skills show through what you ask, not what you claim.

One strong conversation with a founder holding the right lanyard is worth more than one hundred online applications. That is the networking advantage this event is built around.

## Networking as an idea search

If you are building, every room like this is a market research session. Not an elevator pitch, a conversation. Test your idea against people who have built, scaled, or killed ideas in your industry. Founders and investors give you feedback that costs you nothing but attention, and saves you months of building the wrong thing.

This is the part of business networking that is underrated: the fastest way to sharpen an idea is to place it in front of the people who decide whether ideas survive. The value is in the room, and the room rewards those who bring questions worth answering.

## Walk in with a plan, no time to waste

Before any networking event in Nairobi:

- Set one goal: a job lead, an investor conversation, a partnership, or a decision-maker you must meet.
- Learn the attendee list and the lanyard system in advance.
- Prepare three questions that prove you did your homework.
- Follow up within 48 hours, with something specific from your conversation.

That is the difference between attending an event and working an event.

## The room is waiting

The Future of AI in Business, 31st October 2026, Sarit Expo Centre, Westlands, Nairobi, will have founders, CEOs, investors, and builders in one room. The colored lanyards will be there. The value will be in the room.

So . . . let's go.

Secure your pass at <a href="/events">cresdynamics.com/events</a>, scan the room when you arrive, and go talk to the people who decide where the world is going.
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