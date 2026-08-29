# CRES Dynamics — Static HTML/CSS/JS with Express & PostgreSQL

A complete port of the CRES Dynamics website from Next.js/React to static HTML, CSS, and JavaScript with an Express.js backend and PostgreSQL database.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start PostgreSQL (using Docker)
docker-compose up -d

# 3. Initialize the database
npm run db:init

# 4. Start the server
npm start
# → http://localhost:3001
```

## Project Structure

```
cresdynamics-static/
├── server.js              # Express server (API routes + page serving)
├── package.json
├── .env                   # Environment variables
├── db/
│   ├── index.js           # PostgreSQL connection pool
│   └── schema.sql         # Database schema (11 tables)
├── public/
│   ├── css/styles.css     # Brand CSS (palette, components, animations)
│   ├── js/main.js         # Client JS (nav, forms, chat widget)
│   └── images/            # Static assets
├── views/
│   ├── layout.html        # Master layout (header, nav, footer)
│   ├── index.html         # Homepage
│   ├── about.html         # About
│   ├── contact.html       # Contact form
│   ├── careers.html       # Careers + application form
│   ├── blog/              # Blog listing + post template
│   ├── events/            # Events hub, landing, programme, speaker form
│   ├── case-studies/      # 8 case studies + hub
│   ├── services/          # 7 service pages
│   ├── solutions/         # 6 solution pages
│   └── admin/             # 10 admin dashboard pages
├── scripts/
│   └── init-db.js         # Database initialization
└── README.md
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Server port (default: 3001) |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `ADMIN_EMAIL` | Yes | Admin login email |
| `ADMIN_PASSWORD` | Yes | Admin login password |
| `ADMIN_SESSION_SECRET` | Yes | HMAC signing key for admin cookies |
| `RESEND_API_KEY` | No | Resend email API key |
| `GROQ_API_KEY` | No | Groq AI chat backend |
| `GEMINI_API_KEY` | No | Gemini AI fallback |
| `PESAPAL_CONSUMER_KEY` | No | Pesapal payment gateway |
| `PESAPAL_CONSUMER_SECRET` | No | Pesapal payment gateway |
| `APP_BASE_URL` | No | Base URL for pay-by-link |

## Pages (45 routes)

- **Homepage** — Hero, problem cards, systems grid, how we build, CTA
- **Company** — About, Why Us, How We Build, How We Work
- **Services** — Websites, ERP, E-Commerce, AI, Finance, Operations, Software
- **Products** — CresOS business operating system
- **Events** — Events hub, "Future of AI in Business" landing, programme, speaker applications
- **Blog** — DB-driven listing and post pages
- **Case Studies** — 8 client case studies
- **Solutions** — 6 solution pages
- **Forms** — Contact, Careers, Event Registration, Speaker Application
- **Legal** — Terms, Privacy, Data Security
- **Admin** — Login, Dashboard, Blog CRUD, Events, Applications, Speakers, Sponsors, Messages, Payments

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/contact` | Contact form submission |
| POST | `/api/careers/apply` | Career application with CV upload |
| POST | `/api/events/register` | Event ticket registration |
| POST | `/api/events/speakers/apply` | Speaker application |
| POST | `/api/events/sponsors/apply` | Sponsor application |
| POST | `/api/chat` | AI chat (Frank) |
| POST | `/api/chat-lead` | Chat lead capture |
| GET | `/api/blog` | List published blog posts |
| GET | `/api/blog/:slug` | Get blog post by slug |
| POST | `/api/admin/login` | Admin authentication |
| POST | `/api/admin/logout` | Admin logout |
| GET | `/api/admin/me` | Check admin session |
| GET | `/api/admin/dashboard` | Dashboard stats |
| GET/POST | `/api/admin/blog` | Blog CRUD |
| PATCH/DELETE | `/api/admin/blog/:id` | Update/delete blog post |
| GET | `/api/admin/events/reservations` | List event reservations |
| PATCH | `/api/admin/events/reservations/:id` | Update reservation status |
| GET | `/api/admin/speakers` | List speaker applications |
| GET | `/api/admin/sponsors` | List sponsor applications |
| PATCH | `/api/admin/sponsors/:id` | Update sponsor status |
| GET | `/api/admin/applications` | List career applications |
| GET | `/api/admin/messages` | List chat sessions |
| GET | `/api/admin/payments` | List payments |
| GET | `/api/admin/events/attendees-export` | CSV export |

## Database Tables

| Table | Purpose |
|---|---|
| `contact_leads` | Contact form submissions |
| `career_applications` | Job applications |
| `chat_sessions` | AI chat visitor sessions |
| `chat_messages` | Chat message log |
| `event_reservations` | Event ticket registrations |
| `payments` | All payment records |
| `speaker_applications` | Speaker applications |
| `sponsors_applications` | Sponsor applications |
| `blog_posts` | CMS blog content |
| `events` | Event metadata |
| `event_communication_log` | Bulk email log |

## Key Features

- **Zero JavaScript framework** — Pure vanilla JS, no build step
- **PostgreSQL database** — All form data, blog posts, event registrations stored in DB
- **Admin dashboard** — Full CRUD for blog, events, speakers, sponsors, payments
- **AI chat widget** — "Frank" chatbot with Groq/Gemini backend
- **Mobile responsive** — Responsive CSS with mobile hamburger menu
- **Graceful degradation** — Site works without DB (forms show errors, blog shows empty)
- **HMAC admin auth** — Secure cookie-based admin sessions
