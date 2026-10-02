#!/usr/bin/env python3
"""Rebuild views/projects.html in the agreed flagship order."""
from pathlib import Path

def card(cat, badge, badge_color, name, blurb, problem, solution, outcome, url, expand=None):
    colors = {
        'teal': ('rgba(47,166,179,0.1)', 'var(--teal-accent)'),
        'orange': ('rgba(243,156,36,0.1)', 'var(--orange-energy)'),
        'navy': ('rgba(47,59,82,0.1)', 'var(--navy-primary)'),
        'deep': ('rgba(30,124,136,0.1)', 'var(--teal-deep)'),
    }
    bg, fg = colors.get(badge_color, colors['teal'])
    expand_html = ''
    btn = ''
    if expand:
        parts = ''.join(
            f'<div><p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:rgba(47,59,82,0.45);margin-bottom:2px;">{k}</p>'
            f'<p style="font-size:12px;color:rgba(47,59,82,0.85);line-height:1.5;">{v}</p></div>'
            for k, v in expand
        )
        expand_html = f'''
        <div class="project-expand" style="display:grid;grid-template-rows:0fr;transition:grid-template-rows 0.3s ease-out;">
          <div style="overflow:hidden;min-height:0;">
            <div style="padding-top:1.5rem;margin-top:1rem;border-top:1px dashed rgba(47,59,82,0.15);display:flex;flex-direction:column;gap:1rem;">{parts}</div>
          </div>
        </div>'''
        btn = (
            '<button type="button" onclick="toggleProject(this)" class="toggle-project-btn" '
            'style="flex:1;min-width:8rem;display:inline-flex;align-items:center;justify-content:center;gap:6px;'
            'border-radius:6px;background:var(--navy-primary);padding:6px 10px;font-size:10px;font-weight:700;'
            'text-transform:uppercase;letter-spacing:0.05em;color:#fff;border:none;cursor:pointer;">'
            'View Case Study ▾</button>'
        )
    return f'''
      <article class="project-card" data-category="{cat}" style="border-radius:10px;border:1px solid #E0E4EA;background:#fff;padding:1.5rem;">
        <div style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:0.75rem;margin-bottom:1rem;">
          <span style="display:inline-block;border-radius:9999px;background:{bg};padding:4px 12px;font-size:11px;font-weight:600;color:{fg};">{badge}</span>
          <span style="display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:#22c55e;"><span style="width:8px;height:8px;border-radius:50%;background:#22c55e;"></span> Live</span>
        </div>
        <h3 style="font-weight:700;font-size:16px;color:var(--navy-primary);margin-bottom:0.25rem;">{name}</h3>
        <p style="font-size:13px;color:rgba(47,59,82,0.7);line-height:1.6;margin-bottom:1rem;border-bottom:1px solid #E0E4EA;padding-bottom:1rem;">{blurb}</p>
        <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1rem;">
          <div><p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:rgba(47,59,82,0.45);margin-bottom:2px;">Problem</p><p style="font-size:12px;color:rgba(47,59,82,0.85);line-height:1.5;">{problem}</p></div>
          <div><p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:rgba(47,59,82,0.45);margin-bottom:2px;">Solution</p><p style="font-size:12px;color:rgba(47,59,82,0.85);line-height:1.5;">{solution}</p></div>
          <div><p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:rgba(47,59,82,0.45);margin-bottom:2px;">Outcome</p><p style="font-size:12px;color:rgba(47,59,82,0.85);line-height:1.5;">{outcome}</p></div>
        </div>
        <div style="display:flex;gap:0.75rem;">
          <a href="{url}" target="_blank" rel="noopener noreferrer" style="flex:1;min-width:8rem;display:inline-flex;align-items:center;justify-content:center;gap:6px;border-radius:6px;border:1px solid rgba(47,59,82,0.4);padding:6px 10px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--navy-primary);text-decoration:none;">Visit Live Site ↗</a>
          {btn}
        </div>{expand_html}
      </article>
'''

projects = [
  card('websites erp', 'Cybersecurity / Talent · Platform', 'teal', 'Ongoza Cyber Hub',
    'Africa cyber talent engine: discover, develop, and place defenders on one platform.',
    'Africa has cyber talent but lacked a single engine to profile learners, run real missions, mentor, certify, and connect employers. Degrees, certs, and YouTube left a skills-to-job gap.',
    'Built ongozacyberhub.com as an end-to-end hub: AI profiler, foundations, missions, mentorship, portfolio proof, and marketplace across Campus, Mentor, and Employer networks.',
    'Pilot live with hundreds of learners, mentors, and university partners. Public readiness scorecard and programme tracks on a brand-owned domain.',
    'https://ongozacyberhub.com',
    [('Business context', 'OCH grew from webinars and cohorts into a continental cyber talent system.'),
     ('What we built', 'Multi-network platform with missions, mentorship, employer discovery, and readiness scoring.'),
     ('What made it hard', 'Role-based journeys for learners, mentors, universities, and employers in one product.')]),

  card('ecommerce retail', 'Menswear · E-Commerce', 'orange', "Men's World Kenya",
    'Full menswear storefront for suits, shirts, shoes, and accessories across Kenya.',
    'Strong menswear range but buyers outside the shop could not browse categories, see product depth, or buy without a store visit or ad-hoc WhatsApp thread.',
    'Shipped mensworldkenya.com with shop-by-category catalogues (suits, formal shirts, blazers, shoes, belts, wallets) and a clear path from browse to purchase.',
    'Clients can shop curated menswear online by category. The brand owns a structured catalogue instead of relying on foot traffic alone.',
    'https://mensworldkenya.com',
    [('Business context', 'Kenyan menswear retail competing on assortment and convenience.'),
     ('What we built', 'Category-led e-commerce catalogue for apparel and accessories.'),
     ('What made it hard', 'Organising a wide SKU mix so Nairobi buyers find office and casual looks fast.')]),

  card('ecommerce retail', 'Swimwear · E-Commerce', 'orange', 'Beach Prints KE',
    'Swim and vacation wear store for women, men, kids, and travel essentials.',
    'Beach and vacation demand was hard to serve without a polished catalogue. Limited drops sold out fast, and sizing help lived only in DMs.',
    'Launched beachprintske.com with Escape Edit collections, men\'s vacation sets, size guidance, Nairobi same-day delivery messaging, and WhatsApp/Instagram support.',
    'Shoppers browse, price-check, and order online. Sold-out and limited edits are visible. Reviews from Nairobi and Diani reinforce trust.',
    'https://beachprintske.com',
    [('Business context', 'Kenya swim/vacation retail with limited-edition drops.'),
     ('What we built', 'Collection storefront with FAQ, delivery clarity, and social support paths.'),
     ('What made it hard', 'Communicating fit, limited stock, and hygiene exchange rules online.')]),

  card('websites retail', 'Lighting Retail · Website + SEO', 'teal', 'Spark Lights 254',
    'Nairobi lighting studio: chandeliers and ceiling lights with delivery and install.',
    'Large Nyamakima showroom stock was invisible online. Buyers searching by room or fixture found competitors first.',
    'Built sparklights.co.ke around room-based discovery, product ranges, colour-temperature guidance, WhatsApp quote flow, and same-day Nairobi install messaging.',
    'Organic discovery for lighting searches. Buyers choose by room, get sizing help on WhatsApp, and book delivery/install without visiting first.',
    'https://sparklights.co.ke',
    [('Business context', 'Physical lighting showroom at Nyamakima needing digital demand.'),
     ('What we built', 'SEO-led catalogue, guides, and WhatsApp conversion.'),
     ('What made it hard', 'Teaching buyers kelvin/size without a showroom visit.')]),

  card('ecommerce retail', 'Footwear Retail · E-Commerce', 'orange', 'Trendy Fashion Zone',
    'Original shoes on Moi Avenue CBD: Clarks, office, and street styles with delivery.',
    'Trusted CBD footwear shop with foot traffic only. Professionals and weekend buyers outside walking distance could not browse or reserve sizes.',
    'Live trendyfashionzone.co.ke with original footwear positioning, about/contact concierge, WhatsApp fitting, and CBD/Kilimani delivery promises.',
    'Nairobi buyers drop size and dress code on WhatsApp and get curated pairs delivered. Brand story and trust signals sit on an owned domain.',
    'https://trendyfashionzone.co.ke',
    [('Business context', 'Moi Avenue footwear retail since 2020.'),
     ('What we built', 'Conversion site + WhatsApp concierge + delivery positioning.'),
     ('What made it hard', 'Authenticity and fit trust for online shoe buyers.')]),

  card('ecommerce retail', 'Florist / Gift · E-Commerce', 'orange', 'Floral Whispers Gifts',
    'Nairobi florist and gifts: flowers, teddies, hampers with same-day delivery.',
    'Orders lived in Instagram DMs and word of mouth. No priced catalogue or structured delivery capture.',
    'E-commerce at floralwhispersgifts.co.ke with collections across flowers, teddies, hampers, cards, and cakes plus WhatsApp order flow.',
    'Buyers browse and order without a DM thread. Same-day delivery is a clear web promise.',
    'https://floralwhispersgifts.co.ke',
    [('Business context', 'Competitive Nairobi gift/flower market.'),
     ('What we built', 'Image-led catalogue and WhatsApp checkout.'),
     ('What made it hard', 'Perishable stock and owner-managed updates.')]),

  card('ecommerce retail', 'Florist · E-Commerce + M-Pesa', 'orange', 'The Stems Flowers',
    'CBD florist at Delta Hotel: roses, hampers, teddies, same-day Nairobi delivery.',
    'Flower buyers needed same-day delivery with M-Pesa, but the shop lacked a full online store with occasions, FAQs, and estate coverage.',
    'Shipped thestemsflowers.co.ke with bouquets, hampers, teddies, M-Pesa till/paybill, same-day zones, and gift guides for Nairobi neighbourhoods.',
    'Customers order online with M-Pesa or card. Same-day cut-offs and delivery areas are explicit. Content guides support SEO for flower delivery searches.',
    'https://thestemsflowers.co.ke',
    [('Business context', 'University Way CBD florist competing on speed and occasion gifts.'),
     ('What we built', 'Full gift storefront + M-Pesa + delivery FAQ/SEO guides.'),
     ('What made it hard', 'Same-day logistics messaging by estate.')]),

  card('websites retail', 'Luxury Menswear · Website', 'orange', 'Prince Esquire',
    'Luxury fashion Kenya: premium menswear, suits, shoes, and accessories.',
    'Premium Vera Street menswear needed a digital lookbook. Clients could not preview collections before visiting.',
    'Launched prince-esquire.co.ke as a luxury fashion site for tracksuits, formal shoes, presidential shirts, tailored suits, and casualwear with Kenya delivery.',
    'Premium positioning is visible online. Buyers explore curated luxury menswear and engage for delivery across Kenya.',
    'https://prince-esquire.co.ke',
    [('Business context', 'Nairobi luxury menswear retail.'),
     ('What we built', 'Brand site with curated category storytelling.'),
     ('What made it hard', 'Matching in-store luxury feel on the web.')]),

  card('websites hospitality', 'Fine Dining · Website + Reservations', 'deep', 'Tavo Restaurant',
    'Fine dining at Rosslyn Square with brand-owned web experience.',
    'Premium dining relied on Bolt Food and word of mouth. No owned site for menu, events, or table bookings.',
    'Full restaurant website with home, about, menu, gallery, events, contact, and reservation flow plus delivery link-outs.',
    'Guests research the brand before arriving. Reservations book on-site. Premium positioning is owned, not rented from aggregators.',
    'https://tavo-mu.vercel.app',
    [('Business context', 'Rosslyn Square fine dining.'),
     ('What we built', 'Hospitality site + reservation path.'),
     ('What made it hard', 'Photography and copy at fine-dining standard.')]),

  card('websites', 'Branding · Corporate Website', 'teal', 'Kalu Brands',
    'River Road branding company portfolio and services site (Kalou Brands).',
    'Strong branding portfolio with no digital home for Nairobi businesses searching for branding partners.',
    'Corporate site at kaloubrand.com showcasing services, portfolio, and contact for River Road and Nairobi clients.',
    'Portfolio and services are evaluable online before a call. New clients discover the studio without a physical visit first.',
    'https://kaloubrand.com'),

  card('websites retail', 'Menswear · Website', 'orange', 'Elijays Menswear',
    "Men's clothing brand on Bidiogo Street for mature men's apparel.",
    'In-store strength for mature men but no digital reach beyond foot traffic.',
    'Professional site at elijays-mens-wear.co.ke with apparel categories and WhatsApp ordering for delivery.',
    'Collections are browsable online. Clients order without visiting Bidiogo Street first.',
    'https://elijays-mens-wear.co.ke'),

  card('websites retail', 'Footwear · Website + SEO', 'teal', 'White Light Store',
    'Gym and running shoes from Rhoda Building, Lilia Avenue.',
    'Athletes and fitness buyers could not find the shop via search. Inventory lived only in-store.',
    'SEO-oriented site at whitelightstore.co.ke with gym/running categories, listings, and WhatsApp ordering.',
    'Fitness footwear is discoverable online. Clients find the shop before travelling to Lilia Avenue.',
    'https://whitelightstore.co.ke'),
]

head = '''<section class="hero-section" style="min-height:70vh;">
  <div class="hero-content animate-fade-in" style="text-align:center;max-width:800px;margin:0 auto;">
    <span class="eyebrow">Our Projects</span>
    <h1 class="hero-title">Systems in <span class="hero-title-underline">production.</span></h1>
    <p class="hero-subtitle" style="margin:0 auto;">We don't count mockups or wireframes. Every project here is live software used by real businesses every day.</p>
  </div>
</section>

<section class="section-dark scroll-reveal">
  <div class="section-container">
    <div class="grid-3" style="text-align:center;">
      <div class="stat-card">
        <div class="stat-number">20+</div>
        <div class="stat-label">Projects Delivered</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">15,000+</div>
        <div class="stat-label">Daily Active Users</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">8</div>
        <div class="stat-label">Industry Verticals</div>
      </div>
    </div>
  </div>
</section>

<section class="section-light" style="padding-top:4rem;">
  <div class="section-container">
    <span class="eyebrow" style="color:var(--teal-accent);">Live in Production</span>
    <h2 class="section-title" style="color:var(--navy-dark);">What we've built.</h2>
    <p class="section-subtitle" style="margin-bottom:2rem;">Flagship sequence first. Problem, solution, and outcome for each live property.</p>

    <div id="project-filters" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:2rem;">
      <button type="button" onclick="filterProjects('all')" class="filter-btn active" data-filter="all">All</button>
      <button type="button" onclick="filterProjects('websites')" class="filter-btn" data-filter="websites">Websites</button>
      <button type="button" onclick="filterProjects('ecommerce')" class="filter-btn" data-filter="ecommerce">E-Commerce</button>
      <button type="button" onclick="filterProjects('erp')" class="filter-btn" data-filter="erp">ERP</button>
      <button type="button" onclick="filterProjects('hospitality')" class="filter-btn" data-filter="hospitality">Hospitality</button>
      <button type="button" onclick="filterProjects('retail')" class="filter-btn" data-filter="retail">Retail</button>
    </div>
    <style>
      .filter-btn { padding:6px 14px; border-radius:9999px; border:1px solid #E0E4EA; background:#fff; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:rgba(47,59,82,0.8); cursor:pointer; transition:all 0.3s; }
      .filter-btn.active { background:var(--navy-primary); color:#fff; border-color:var(--navy-primary); }
      .filter-btn:hover { border-color:rgba(47,59,82,0.3); }
      .project-card[data-category] { transition:opacity 0.3s, transform 0.3s; }
      .project-card.hidden { display:none; }
    </style>

    <div id="projects-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
'''

foot = '''
    </div>
  </div>
</section>

<section class="section-dark scroll-reveal" style="text-align:center;">
  <div class="section-container">
    <span class="eyebrow">See the Results</span>
    <h2 class="section-title">Want to see the numbers?</h2>
    <p class="section-subtitle" style="margin:0 auto 2rem;text-align:center;">We publish case studies with real metrics. No vanity screenshots.</p>
    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
      <a href="/case-studies" class="hero-btn-primary">View Case Studies →</a>
      <a href="https://wa.me/254708805496?text=Hi%2C%20I%27d%20like%20to%20book%20a%20strategy%20session%20with%20CRES%20Dynamics." target="_blank" rel="noopener noreferrer" class="hero-btn-glass">Book Strategy Session</a>
    </div>
  </div>
</section>

<script>
function filterProjects(filter) {
  var cards = document.querySelectorAll('.project-card');
  var btns = document.querySelectorAll('.filter-btn');
  btns.forEach(function(b) { b.classList.remove('active'); });
  document.querySelector('[data-filter="'+filter+'"]').classList.add('active');
  cards.forEach(function(c) {
    if (filter === 'all') { c.classList.remove('hidden'); }
    else { c.classList.toggle('hidden', !c.dataset.category.includes(filter)); }
  });
}
function toggleProject(btn) {
  var expand = btn.closest('article').querySelector('.project-expand');
  if (!expand) return;
  var isOpen = expand.style.gridTemplateRows === '1fr';
  expand.style.gridTemplateRows = isOpen ? '0fr' : '1fr';
  btn.textContent = isOpen ? 'View Case Study ▾' : 'Close ▴';
}
</script>
'''

out = Path(__file__).resolve().parents[1] / 'views' / 'projects.html'
out.write_text(head + ''.join(projects) + foot, encoding='utf-8')
print(f'Wrote {len(projects)} projects → {out}')
