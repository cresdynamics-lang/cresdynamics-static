# CRES Dynamics Codebase Documentation Index

## Quick Navigation

This folder contains comprehensive documentation of the CRES Dynamics website codebase. Choose the document that best fits your needs:

---

## Available Documents

### 1. QUICK_REFERENCE.md
**Best for:** Developers who need quick lookups
**Contains:**
- File locations (absolute paths)
- Color palette (hex values)
- Navigation dropdown complete map
- CSS classes reference
- JavaScript key functions
- Responsive breakpoints
- Homepage content structure
- Image specifications
- Font stack
- Key CSS variables

**Read time:** 5-10 minutes
**Use when:** You need a specific color hex, image path, or CSS class

---

### 2. CODEBASE_ANALYSIS.md
**Best for:** Comprehensive understanding
**Contains:**
- Detailed homepage file locations
- CSS styling system (page 1)
- Navigation structure with full dropdown listings
- Overall page layout and sections
- Modern design patterns (12 detailed patterns)
- Page inventory (all 48 pages)
- Image assets summary
- Technology stack
- Complete summary

**Read time:** 15-20 minutes
**Use when:** You want a deep understanding of the entire system

---

### 3. VISUAL_SUMMARY.txt
**Best for:** Visual learners
**Contains:**
- ASCII diagrams and visual structure
- Component hierarchy diagrams
- Color palette visualization
- Navigation dropdown structure (visual)
- JavaScript functionality overview
- Responsive design breakpoints
- Modern design patterns (visual)
- Key file paths
- Typography information
- Performance notes

**Read time:** 10-15 minutes
**Use when:** You prefer visual representations and diagrams

---

## Quick Answers

### "Where is the homepage?"
See QUICK_REFERENCE.md → **File Locations (Absolute Paths)**

### "What colors are used?"
See QUICK_REFERENCE.md → **Color Palette (Exact Hex Values)**

### "What CSS classes are available?"
See QUICK_REFERENCE.md → **CSS Classes - Design Components**

### "How do the dropdowns work?"
See QUICK_REFERENCE.md → **Navigation Dropdowns - Complete Map**
Or VISUAL_SUMMARY.txt → **Navigation Dropdowns Structure**

### "What design patterns are used?"
See CODEBASE_ANALYSIS.md → **Section 5: Existing Modern Design Patterns**

### "What images are in the dropdown menus?"
See QUICK_REFERENCE.md → **Navigation Dropdowns - Complete Map**
Or CODEBASE_ANALYSIS.md → **Section 3: Navigation Structure & Dropdown Images**

### "How do I modify the design?"
See end of this file → **Common Tasks**

### "What's the complete navigation structure?"
See QUICK_REFERENCE.md → **Navigation Dropdowns - Complete Map**

### "What is the page structure?"
See VISUAL_SUMMARY.txt → **Homepage & Layout**

---

## Key File Paths (Quick Reference)

| Purpose | Path |
|---------|------|
| **Main styling** | `/Users/airm1/Projects/cresdynamics-static/public/css/styles.css` |
| **Navigation & header** | `/Users/airm1/Projects/cresdynamics-static/views/layout.html` |
| **Homepage content** | `/Users/airm1/Projects/cresdynamics-static/views/index.html` |
| **JavaScript interactivity** | `/Users/airm1/Projects/cresdynamics-static/public/js/main.js` |
| **All images** | `/Users/airm1/Projects/cresdynamics-static/public/images/` |
| **Express server** | `/Users/airm1/Projects/cresdynamics-static/server.js` |

---

## Color Palette (Quick Reference)

```
Navy Dark:       #1A2433  (dark sections, buttons)
Navy Primary:    #2F3B52  (body text)
Teal Accent:     #2FA6B3  (CTAs, highlights)
Teal Deep:       #1E7C88  (section backgrounds)
Orange Energy:   #F39C24  (highlights)
Orange Hover:    #E48B18  (hover states)
White:           #FFFFFF  (backgrounds)
```

---

## Navigation Structure (Quick Reference)

### Desktop Navigation
```
Header
├── Who We Are (dropdown, 6 items)
├── CresOS (link)
├── Systems (dropdown, 6 items)
├── Services (dropdown, 7 items)
├── Case Proof (link)
├── Projects (link)
└── Events (link)
CTA: "Book Session" → WhatsApp
```

### Dropdowns
- **Who We Are:** 6 items in 6-column grid
- **Systems:** 6 items in 5-column grid
- **Services:** 7 items in 4-column grid

Each dropdown item has:
- Thumbnail image (100% width × 96px height)
- Title
- Description
- Link

---

## Common Tasks

### Task 1: Change a Brand Color
1. Open: `public/css/styles.css`
2. Find: `:root` section (lines 2-18)
3. Edit: Desired color variable (e.g., `--navy-dark: #1A2433;`)
4. Save: File automatically reloads on refresh

### Task 2: Add a Navigation Dropdown Item
1. Open: `views/layout.html`
2. Find: Desired dropdown (`#dropdown-who-we-are`, `#dropdown-systems`, or `#dropdown-services`)
3. Copy: Existing dropdown item structure
4. Paste: Below existing items
5. Edit: Image path, link, title, description

### Task 3: Change Homepage Section Content
1. Open: `views/index.html`
2. Find: Section (look for `<!-- HERO 1 -->`, `<!-- PAIN POINTS -->`, etc.)
3. Edit: Text, links, or structure
4. Save: Changes appear on refresh

### Task 4: Modify Navigation Links
1. Open: `views/layout.html`
2. Find: Navigation section (lines 42-50 for desktop, 104-143 for mobile)
3. Edit: href attributes or link text
4. Note: Must update both desktop and mobile sections

### Task 5: Add a New Image to Dropdowns
1. Save: Image to `/public/images/`
2. Open: `views/layout.html`
3. Find: Appropriate dropdown
4. Add: New dropdown-item with image path, title, description
5. Update: CSS grid class if needed (grid-5, grid-6, etc.)

### Task 6: Change Responsive Breakpoints
1. Open: `public/css/styles.css`
2. Find: `@media` queries
3. Edit: Breakpoint values (current: 768px mobile, 1024px tablet)
4. Note: Also check `public/js/main.js` (line 83) for mobile menu breakpoint

### Task 7: Modify Button Styling
1. Open: `public/css/styles.css`
2. Find: `.hero-btn-primary` or `.hero-btn-glass`
3. Edit: Colors, padding, transitions, etc.
4. Save: Changes apply globally

### Task 8: Change Animations
1. Open: `public/css/styles.css`
2. Find: `@keyframes` sections (lines 114-143)
3. Edit: Duration, easing, or transform values
4. Note: JavaScript controls scroll reveal (main.js lines 5-15)

---

## File Organization

```
cresdynamics-static/
├── DOCUMENTATION_INDEX.md (this file)
├── QUICK_REFERENCE.md (5-10 min read)
├── CODEBASE_ANALYSIS.md (15-20 min read)
├── VISUAL_SUMMARY.txt (10-15 min read)
├── README.md (project overview)
│
├── public/
│   ├── css/styles.css (180 lines)
│   ├── js/main.js (360 lines)
│   └── images/ (50+ assets)
│
├── views/
│   ├── layout.html (master template)
│   ├── index.html (homepage)
│   └── [other pages]
│
└── server.js (Express routes)
```

---

## Design Philosophy

**CRES Dynamics uses a professional, modern design system:**

- **Navy base color** establishes trust and authority
- **Teal accents** create innovation energy and guide attention
- **Orange highlights** provide excitement and urgency
- **White space** allows clarity and breathing room
- **Micro-interactions** create delightful user experiences
- **Responsive layout** works perfectly on all devices

---

## Technology Summary

| Layer | Technology |
|-------|-----------|
| **HTML** | EJS templates (server-rendered) |
| **CSS** | 180-line vanilla CSS (no framework) |
| **JavaScript** | Vanilla JS (no frameworks) |
| **Server** | Express.js |
| **Database** | PostgreSQL |
| **Font** | Inter (Google Fonts) |

---

## Getting Started

1. **For a quick overview:** Start with QUICK_REFERENCE.md
2. **For deep dive:** Read CODEBASE_ANALYSIS.md
3. **For visual learners:** Check VISUAL_SUMMARY.txt
4. **For specific tasks:** Use the "Common Tasks" section above

---

## Document Stats

| Document | Type | Size | Read Time |
|----------|------|------|-----------|
| QUICK_REFERENCE.md | Markdown | 9.4 KB | 5-10 min |
| CODEBASE_ANALYSIS.md | Markdown | 15 KB | 15-20 min |
| VISUAL_SUMMARY.txt | Text | 19 KB | 10-15 min |
| DOCUMENTATION_INDEX.md | Markdown | This file | 5 min |

---

## Last Updated

**Generated:** September 18, 2026
**Project:** CRES Dynamics Static Website
**Base URL:** `/Users/airm1/Projects/cresdynamics-static`

---

## Questions?

Refer to the appropriate documentation file above, or check the specific file in the codebase mentioned in the file paths.

Most common answers are in QUICK_REFERENCE.md.

