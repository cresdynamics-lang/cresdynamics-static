# Modernization Roadmap — CRES Dynamics

Tracking doc for Phases 0–4. Detailed Phase 0 findings: `PHASE0_AUDIT.md`.

## Phase 0 — Discovery ✅
- [x] Template / CSS / SEO / security audit
- [x] Success metrics defined
- [x] Phase 1 backlog prioritized

## Phase 1 — Foundation ✅ (local)
- [x] Design tokens + distinctive typography
- [x] Reusable `.btn` / layout utility classes
- [x] Layout shell: OG/Twitter, canonical, skip link, a11y nav attrs
- [x] Static Cache-Control + lazy image defaults
- [x] Form honeypot + stronger spamGuard + event register lockdown
- [x] Contact form wired to API with field aliases

## Phase 2 — Flagship pages ✅ (local)
- [x] Homepage: one brand-first composition (replace 3×100vh text heroes)
- [x] CresOS product page upgrade
- [x] Flagship case studies with metrics
- [x] Contact / booking conversion UX polish

## Phase 3 — Growth ✅ (local)
- [x] Industry landing paths (hospitality, retail, multi-unit)
- [x] Blog SEO + internal linking
- [x] Trust/security polish + restrained motion system

## Phase 4 — Operate ✅ (local)
- [x] CI smoke + Lighthouse gates (`scripts/smoke.js`, `scripts/lighthouse-gate.js`, `.github/workflows/ci.yml`)
- [x] Monitoring + bot spike alerts (`/health`, abuse counters, 15‑min cron email)
- [x] Staging / deploy hygiene docs (`DEPLOY.md`)

## Brand tagline
**Intelligent Systems That Run Your Business.** (replaces “Systems businesses run on.”)

## Deploy note
Phases 1–4 changes are **local** until explicitly deployed to Contabo (`cresdynamics` only via `app-restart`). See `DEPLOY.md`.
