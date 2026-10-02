# CRES Dynamics - Quick Reference Guide

## File Locations (Absolute Paths)

### Main Application Files
```
/Users/airm1/Projects/cresdynamics-static/
├── server.js                           # Express server + routes
├── public/
│   ├── css/styles.css                  # 180-line brand CSS
│   ├── js/main.js                      # Vanilla JS (navigation, forms, chat)
│   └── images/                         # 50+ asset images
├── views/
│   ├── layout.html                     # Master template (header, nav, footer)
│   ├── index.html                      # Homepage
│   ├── about.html, why-us.html, etc.   # Other pages
│   └── admin/                          # Admin dashboard pages
├── dist/                               # Pre-built static files
└── db/
    ├── index.js                        # PostgreSQL connection
    └── schema.sql                      # Database schema
```

---

## Color Palette (Exact Hex Values)

| Color | Hex | Usage |
|-------|-----|-------|
| Navy Primary | #2F3B52 | Body text, primary content |
| Navy Dark | #1A2433 | Dark sections, buttons |
| Teal Accent | #2FA6B3 | CTAs, highlights, links |
| Teal Deep | #1E7C88 | Section backgrounds |
| Orange Energy | #F39C24 | High-energy highlights |
| Orange Hover | #E48B18 | Hover states |
| White | #FFFFFF | Backgrounds, text contrast |

---

## Navigation Dropdowns - Complete Map

### Dropdown 1: Who We Are
**Parent Element**: `#dropdown-who-we-are`
**File**: `/Users/airm1/Projects/cresdynamics-static/views/layout.html` (Lines 61-72)

| # | Image | Link | Title | Description |
|---|-------|------|-------|-------------|
| 1 | /images/wh0-we-wre.jpg | /about | Who We Are | Our story and mission |
| 2 | /images/why-us-us.jpg | /why-us | Why Us | Why serious businesses choose us |
| 3 | /images/how-we-work.jpg | /how-we-work | How We Work | Discovery to go-live |
| 4 | /images/how-we-build.jpg | /how-we-build | How We Build | Our system engineering framework |
| 5 | /images/events-westlands.jpg | /events | Events | Upcoming events |
| 6 | /images/contact-us.jpg | /contact | Contact | Book a discovery session |

### Dropdown 2: Systems
**Parent Element**: `#dropdown-systems`
**File**: `/Users/airm1/Projects/cresdynamics-static/views/layout.html` (Lines 75-86)

| # | Image | Link | Title | Description |
|---|-------|------|-------|-------------|
| 1 | /images/business-operating system.jpg | /cresos | CresOS | Business operating system |
| 2 | /images/finance-plartforms.jpg | /finance-platforms | Finance Platforms | Revenue, invoices, dashboards |
| 3 | /images/streamline-your-workflow.jpg | /operations-workflow | Operations & Workflow | Projects, approvals, reporting |
| 4 | /images/workflow-automation.jpg | /ai-automation | AI & Automation | Workflows, triggers, intelligence |
| 5 | /images/modern-erp.jpg | /erp | Custom ERP | Modular ERP & governance |
| 6 | /images/business-operating system.jpg | /services/business-operating-system | BOS | AI-powered business operating system |

### Dropdown 3: Services
**Parent Element**: `#dropdown-services`
**File**: `/Users/airm1/Projects/cresdynamics-static/views/layout.html` (Lines 89-101)

| # | Image | Link | Title | Description |
|---|-------|------|-------|-------------|
| 1 | /images/websites.jpg | /websites | Websites | Professional websites that convert |
| 2 | /images/e-commerce.jpg | /e-commerce | E-Commerce | Online stores for Kenyan businesses |
| 3 | /images/business-operating system.jpg | /services/business-operating-system | BOS | AI-powered business operating system |
| 4 | /images/finance.jpg | /finance-platforms | Finance | Revenue, invoices, and dashboards |
| 5 | /images/time-automation.jpg | /ai-automation | AI & Automation | Automation and intelligence |
| 6 | /images/custome-software.jpg | /software | Custom Software | Portals, dashboards, booking tools |
| 7 | /images/streamline-your-workflow.jpg | /operations-workflow | Operations & Workflow | Projects, approvals, and reporting |

---

## CSS Classes - Design Components

### Sections
```css
.section-dark      /* Navy background (#1A2433) */
.section-teal      /* Teal background (#1E7C88) */
.section-light     /* White background */
.section-white     /* White background */
```

### Cards
```css
.card              /* Dark translucent (for dark sections) */
.card-light        /* White card with subtle border */
```

### Buttons
```css
.hero-btn-primary  /* Navy fill, white text */
.hero-btn-glass    /* Transparent, dark border */
.nav-cta-glass     /* Book Session button */
```

### Grids (Responsive)
```css
.grid-2            /* 2 columns → 1 on mobile */
.grid-3            /* 3 columns → 1 on mobile */
.grid-4            /* 4 columns → 1 on mobile */
.grid-6            /* 6 columns → 3 on tablet → 1 on mobile */
```

### Navigation
```css
.nav-glass         /* Frosted glass header */
.nav-link-glass    /* Navigation link */
.nav-dropdown      /* Dropdown menu container */
.dropdown-item     /* Item in dropdown */
.dropdown-img      /* 96px tall dropdown image */
.dropdown-title    /* Item title */
.dropdown-desc     /* Item description */
```

### Typography
```css
.section-title     /* Main section heading */
.section-subtitle  /* Section description */
.eyebrow          /* Label above title */
```

### Effects
```css
.scroll-reveal     /* Fade-in on scroll */
.scroll-reveal.visible  /* Revealed state */
```

---

## JavaScript Key Functions

**File**: `/Users/airm1/Projects/cresdynamics-static/public/js/main.js`

### Navigation
- **Scroll Reveal**: Intersection Observer watches `.scroll-reveal` elements
- **Desktop Dropdowns**: Mouse-enter triggers dropdown open, slight delay on mouse-leave
- **Mobile Menu**: Hamburger button toggles `.open` class on `#mobile-menu`
- **Active Nav Link**: Compares current pathname with href attributes

### Chat Widget
- **Phases**: closed → peek → open (progressive disclosure)
- **Lead Capture**: Form collects name, phone, email
- **AI Integration**: Sends to `/api/chat` endpoint
- **Session ID**: Unique per visitor (crypto.randomUUID)

---

## Responsive Breakpoints

```css
Mobile:   < 768px    (single column, hamburger menu)
Tablet:   769px-1024px (2-3 columns, hamburger menu shows at 1024px)
Desktop:  > 1024px   (full layout, desktop navigation)
```

---

## Homepage Content Structure

### Located in: `/Users/airm1/Projects/cresdynamics-static/views/index.html`

1. **Hero 1: Systems** (white background)
   - Tagline: "Custom Business Systems"
   - Title: "Your business needs a system that thinks ahead"
   - CTA: "I Need a System" + "See the Outcomes"

2. **Hero 2: Websites** (white background)
   - Tagline: "Websites That Sell"
   - Title: "Your clients are browsing at 2 AM"
   - CTA: "I Need a Website" + "See Client Results"

3. **Hero 3: Ads** (white background)
   - Tagline: "Sales Ads Management"
   - Title: "You need sales, not impressions"
   - CTA: "I Need Sales, Not Likes" + "Book a Free Audit"

4. **Marquee** (orange background)
   - Animated scrolling text with diamond separators

5. **Pain Points** (navy background)
   - 4 cards with customer frustration emojis
   - Title: "Your operations are running you"

6. **Outcomes** (white background)
   - 6 cards showing benefits
   - Title: "When your system works, this is what changes"

7. **How This Works** (teal background)
   - 3-step process (Tell, Build, Launch)

---

## Font Stack

**Primary Font**: Inter (Google Fonts)

Weights used:
- 400 (regular body text)
- 500 (medium labels)
- 600 (semi-bold)
- 700 (bold section titles)
- 800 (extra bold)
- 900 (ultra bold hero titles)

---

## Image Specifications

### Dropdown Images
- **Dimensions**: Full width × 96px height
- **Format**: JPG (compressed for web)
- **CSS**: `border-radius: 8px; object-fit: cover;`
- **Background Fallback**: `rgba(0,0,0,0.05)`

### Page Hero Images
- **Location**: `/Users/airm1/Projects/cresdynamics-static/public/images/cards/`
- **Naming**: Descriptive (ai-robotics-lab.jpg, finance-analytics-dashboard.jpg, etc.)
- **Optimization**: Already compressed, typical 50-200 KB

---

## Key CSS Variables (Copy-Paste)

```css
:root {
  --navy-primary: #2F3B52;
  --teal-accent: #2FA6B3;
  --teal-deep: #1E7C88;
  --orange-energy: #F39C24;
  --orange-energy-hover: #E48B18;
  --teal-accent-hover: #268F9A;
  --neutral-bg: #FFFFFF;
  --navy-dark: #1A2433;
  --cres-gradient-bg: linear-gradient(135deg, #1A2433 0%, #1E7C88 100%);
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.15);
  --shadow-md: 0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px rgba(243,156,36,0.1);
  --shadow-lg: 0 20px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(243,156,36,0.15);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
```

---

## Animation Keyframes

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes cres-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes chat-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
```

---

## Important Notes

1. **No Build Step**: CSS/JS is vanilla, no compilation needed
2. **Server-Side Rendering**: HTML is rendered by Express.js
3. **Responsive**: Mobile-first CSS with proper media queries
4. **Performance**: Minimal JavaScript, lazy-loaded images
5. **Accessibility**: Semantic HTML, proper ARIA labels
6. **Chat Widget**: Only loads on non-event/admin/management pages
7. **Admin Auth**: HMAC cookie sessions (no JWT)

