# Phase 0 — Discovery Audit (CRES Dynamics)

**Date:** 2026-10-02  
**Scope:** Marketing site (`cresdynamics.com`) — Express + HTML/CSS/JS + Postgres  
**Goal:** Ground Phases 1–4 in measured findings, not generic advice.

---

## 1. Success metrics (targets)

| Metric | Baseline (est.) | Target |
|--------|-----------------|--------|
| LCP (home, mobile) | Likely >3s (heavy JPG, no srcset) | <2.5s |
| CLS | Medium (images without dimensions) | <0.1 |
| Home bounce / scroll depth | Unknown — instrument in Phase 4 | ↑ scroll past hero 60%+ |
| Book Session / Contact conversion | Forms partially locked / weak UX | Measurable lift after Phase 2 |
| Bot registrations / day | Was ~20k (cleared Oct 2) | ~0 with durable abuse controls |
| Design consistency | Split systems (CSS vs inline) | 1 token system sitewide |

---

## 2. Quantitative findings

| Signal | Count / note |
|--------|----------------|
| HTML templates | ~70 views |
| Inline `style=` on homepage | **124** occurrences |
| Inline styles on layout / contact / cresos | 38 / 72 / 74 |
| Empty `alt=""` (layout alone) | **19** (nav images) |
| Pages with emoji-as-icons | 15+ templates |
| WebP assets | **3** vs dozens of JPG/PNG |
| Open Graph / Twitter cards | **None** in layout |
| Font | Inter only (generic SaaS) |
| Homepage structure | **3× 100vh text heroes**, no product/place image |
| CSS vs homepage visual language | Monochrome tokens vs gradient/orange inline |
| Static cache headers | Not set on `express.static` |
| Form honeypot fields | Server checks `website` / `companywebsite_hp`; contact form lacks visible honeypot |
| Event register | Locked on prod after bot flood (410) |

---

## 3. Qualitative findings

### Brand / UX
- First viewport fails brand test: remove nav and it could be any agency.
- Systems vs Services vs CresOS vs BOS create IA confusion.
- Proof (case studies) exists but is under-shown on home.
- Emoji icons and typo asset names (`wh0-we-wre`, `finance-plartforms`) undercut premium positioning.

### Engineering
- `renderPage()` supports `{{title}}` / `{{description}}` only — no OG/canonical.
- Dead chat widget code remains in `main.js` while layout says chat removed.
- Multi-app Contabo host is isolated (PM2 memory caps) — keep single-app deploys.

### Security / ops
- Rate limits + lockdowns are reactive; need honeypot + disposable-email + spike alerts.
- `site_visits` is large; analytics fire-and-forget is good (non-blocking).

---

## 4. Phase 1 backlog (prioritized)

1. Unify design tokens + distinctive typography  
2. Component classes: buttons, sections, containers (stop new inline styles)  
3. Layout shell: skip link, OG/Twitter, a11y nav hooks, reduced-motion  
4. Static asset Cache-Control + image lazy/decoding defaults in CSS/JS docs  
5. Contact honeypot + stronger spamGuard (example.com, disposable domains)

## 5. Deferred to later phases

- Homepage rebuild (Phase 2)  
- CresOS product tour (Phase 2)  
- Case-study metrics rewrite (Phase 2)  
- Industry landers / blog SEO (Phase 3)  
- CI / Sentry / bot alerts (Phase 4)

---

## 6. Out of scope for Phase 0

- Live Search Console / GA (credentials not reviewed in this pass)  
- Competitor visual teardown board (recommend Figma board next)  
- Production deploy of Phase 1 (do after local verification)
