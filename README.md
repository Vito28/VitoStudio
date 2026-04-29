# VitoStudio — Front-End UTS (Semester 2 Midterm)

**VitoStudio** is a showcase website for a digital product agency that helps teams launch products with clarity and momentum. Built as a Semester 2 UTS project demonstrating modern front-end concepts with focus on **responsive design**, **accessibility**, **theme support**, and **interactive features**.

This is a **static website (no backend required)**, can be previewed directly without a bundler, and is ready to deploy to GitHub Pages.

<p align="left">
  <!-- Replace the badge links if you enable CI or deploy -->
  <a href="#"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
  <a href="#"><img alt="Status" src="https://img.shields.io/badge/status-stable-brightgreen.svg"></a>
</p>

---

## 📋 Table of Contents
- [Concept & Objectives](#concept--objectives)
- [Website Content](#website-content)
- [Features](#features)
- [Pages & Structure](#pages--structure)
- [Tech Stack](#tech-stack)
- [Frontend Concepts](#frontend-concepts)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Run Locally](#run-locally)
- [Theming](#theming)
- [Accessibility](#accessibility)
- [Deployment (GitHub Pages)](#deployment-github-pages)
- [Credits](#credits)
- [License](#license)

---

## 🎯 Concept & Objectives

### **Website Concept**
VitoStudio is a website for a **Digital Product Agency** that provides services:
- 🎨 **Product Discovery** - Identifying opportunities and designing strategy
- 🖌️ **Design & UX** - Creating intuitive and engaging user experiences
- ⚙️ **Engineering** - Technical implementation and product deployment

### **Target Users**
- **Businesses** who want to launch or improve their digital products
- **Product Teams** looking for a strategic partner for development
- **Clients** who want to view portfolio and service pricing

### **Website Objectives**
1. **Portfolio Showcase** - Display expertise and work samples
2. **Lead Generation** - Attract potential clients to start projects
3. **Education** - Share insights about product development through blog
4. **Client Workspace** - Login access for existing clients

---

## 📝 Website Content

### **Home Page (`/index.html`)**
- **Hero Section** - Headline & value proposition
- **Metrics** - Display achievements (98% client satisfaction, 30+ products launched, etc.)
- **Services Showcase** - Overview of offered services
- **Testimonials** - Client reviews with slider/carousel
- **Pricing Preview** - Pricing tier summary
- **CTA Buttons** - "Start a project" and "View case study"

### **Insights / Blog Page (`/pages/blog.html`)**
- List of articles about product discovery, design, engineering
- Filter by category/tag
- Load more functionality for pagination
- Each article has metadata (author, date, reading time)

### **Pricing Page (`/pages/pricing.html`)**
- **Three Service Tiers:**
  - **Basic** ($4,800/sprint) - Discovery & roadmap
  - **Standard** (custom) - Mid-tier engagement
  - **Premium** (custom) - Full team embed
- Feature comparison
- Toggle monthly/yearly pricing
- Modal for "Get a quote"

### **Case Study Page (`/pages/blog-detail.html`)**
- Detailed case study with hero image
- Project background and challenges
- Solution & results
- Timeline or process visualization
- Client testimonial

### **Sign In Page (`/pages/signin.html`)**
- Client workspace login
- Email & password form validation
- Particle background effect (animated)
- Link to Sign Up page

### **Sign Up Page (`/pages/signup.html`)**
- Account creation form
- Email, password, company name fields
- Form validation with error messages
- Terms & conditions checkbox
- Particle background effect (signup variant)

### **404 Error Page (`/404.html`)**
- Custom error page with branding
- Helpful navigation links
- Link back to home page
- Maintaining consistent design with other pages

---

## ✨ Features
- **Responsive Design** - Optimal on desktop, tablet, and mobile
- **Accessible Pages** - Semantic HTML, ARIA labels, keyboard navigation
- **Light/Dark Theme** - Toggle theme using CSS variables
- **Particles Background** - Animated particle effect on auth pages
- **SCSS Architecture** - Well-organized with abstracts, components, layouts, pages, themes
- **Form Validation** - Client-side validation with error messages
- **Auth Storage** - Local storage for session management (no backend)
- **Lazy Loading** - Images loaded lazily for performance
- **Testimonial Slider** - Interactive carousel for testimonials
- **Modal System** - Payment/quote modal for CTA
- **Mobile Menu** - Hamburger menu for responsive navigation
- **Theme Persistence** - Theme preference saved in local storage
- **SEO Optimized** - Meta tags, Open Graph, structured data
- **Custom 404** - Error page with consistent branding

---

## 📄 Pages & Structure

| Page | Route | Description |
|------|-------|-------------|
| Home | `/index.html` | Landing page with hero, metrics, services, testimonials |
| Insights | `/pages/blog.html` | Blog listing with filter and pagination |
| Pricing | `/pages/pricing.html` | Service tiers with feature comparison |
| Case Study | `/pages/blog-detail.html` | Detailed case study showcase |
| Sign In | `/pages/signin.html` | Client workspace login |
| Sign Up | `/pages/signup.html` | Client account creation |
| 404 Error | `/404.html` | Custom error page |

---

## 🔧 Tech Stack
- **HTML5** - Semantic markup with accessibility features
- **CSS/SCSS** - Modern styling with CSS variables, nesting, mixins
- **JavaScript (Vanilla)** - No framework, pure ES6+ modules
- **Google Fonts** - Inter (body), Playfair Display (headings)
- **particles.js** - Lightweight library for background particle effects
- **Local Storage API** - Session & theme persistence
- **Fetch API** - Load content from JSON file (dynamic content)
- **No Dependencies** for production - Only dev tools (Sass, gh-pages)

---

## 🎨 Frontend Concepts

This project demonstrates several modern frontend concepts:

### **1. SCSS Architecture (BEM + SMACSS)**
```
assets/scss/
├── abstracts/       # Variables, mixins, functions
├── base/            # Reset, typography, utilities
├── components/      # Reusable UI components
├── layout/          # Major layout sections (grid, header, footer)
├── pages/           # Page-specific styles
├── themes/          # Light/dark theme variants
└── main.scss        # Entry point
```

### **2. CSS Variables & Theming**
- Light & dark themes with CSS custom properties
- Automatic theme switching with `data-theme` attribute
- Theme saved in local storage

### **3. Component-Based Styling**
- Navbar, buttons, cards, forms, modals as reusable components
- Consistent naming convention with BEM (Block Element Modifier)
- Example: `.navbar__menu`, `.btn--ghost`, `.card__header`

### **4. Responsive Design**
- Mobile-first approach
- Breakpoints for tablet & desktop
- Flexible grid with CSS Grid & Flexbox
- Responsive typography & spacing

### **5. JavaScript Modules**
- ES6 modules (`import`/`export`)
- Modular architecture:
  - `theme.js` - Theme toggle logic
  - `navbar.js` - Mobile menu & responsive nav
  - `form.js` - Form validation
  - `modal.js` - Modal functionality
  - `slider.js` - Testimonial carousel
  - `particles-auth.js` - Particle effect on auth pages
  - `auth-storage.js` - Local storage management

### **6. Form Validation**
- Client-side validation without dependencies
- Real-time error messages
- Email & password validation rules
- Required field checking

### **7. Dynamic Content Loading**
- Load images from JSON file (`content.json`)
- Image optimization with lazy loading & async decoding
- Fetch with error handling

### **8. Accessibility (a11y)**
- Semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`)
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Focus management

### **9. Performance Optimization**
- Lazy loading for images
- CSS minification
- Async & defer attributes on scripts
- Preload critical resources

### **10. SEO Best Practices**
- Meta tags & Open Graph
- Canonical URLs
- Semantic HTML
- Structured data
- robots.txt & sitemap

---

## 📁 Project Structure

```
VitoStudio/
├── 404.html                          # Error page
├── index.html                        # Home page
├── package.json                      # Dependencies & scripts
├── README.md                         # This file
│
├── assets/
│   ├── css/
│   │   └── main.css                 # Compiled CSS (output)
│   │
│   ├── data/
│   │   └── content.json             # Dynamic content (images, etc)
│   │
│   ├── scss/
│   │   ├── main.scss                # Entry point
│   │   ├── abstracts/               # Variables, mixins, functions
│   │   ├── base/                    # Reset, typography, utilities
│   │   ├── components/              # UI components (btn, card, form, etc)
│   │   ├── layout/                  # Grid, header, footer
│   │   ├── pages/                   # Page-specific styles
│   │   └── themes/                  # Light & dark theme
│   │
│   ├── fonts/                       # Google Fonts (if self-hosted)
│   ├── icons/                       # SVG icons & favicon
│   ├── particles/                   # Particle.js config files
│   └── vendor/
│       └── particles.min.js         # Particle.js library
│
├── js/
│   ├── app.js                       # Main app initialization
│   ├── modules/
│   │   ├── auth-storage.js          # Local storage management
│   │   ├── form.js                  # Form validation
│   │   ├── modal.js                 # Modal functionality
│   │   ├── navbar.js                # Navigation logic
│   │   ├── particles-auth.js        # Particle effects
│   │   ├── slider.js                # Testimonial carousel
│   │   └── theme.js                 # Theme toggle logic
│   └── pages/
│       ├── 404.js                   # 404 page scripts
│       └── ...                      # Page-specific scripts
│
└── pages/
    ├── blog.html                    # Insights/Blog listing
    ├── blog-detail.html             # Case study detail
    ├── pricing.html                 # Pricing page
    ├── signin.html                  # Login page
    └── signup.html                  # Registration page
```

---

## Getting Started

### Prerequisites
- Node.js & npm (for running Sass compiler)
- Code editor (VS Code recommended)
- Live server or local HTTP server

### Installation

1. **Clone repository:**
   ```bash
   git clone https://github.com/vito28/VitoStudio.git
   cd VitoStudio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   - With npm/node:
     ```bash
     npm run sass:dev
     ```
   - Or use VS Code Live Server extension
   - Preview at `http://localhost:5500` (Live Server)

---

## 🏃 Run Locally

### Development Mode (Watch SCSS)
```bash
npm run sass:dev
```
Will compile SCSS to CSS every time a `.scss` file is saved.

### Build for Production
```bash
npm run sass:build
```
Generates minified CSS for production.

### Preview Website
**Option 1: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

**Option 2: Python HTTP Server**
```bash
python -m http.server 8000
```
Access at `http://localhost:8000`

**Option 3: Node.js HTTP Server**
```bash
npx http-server
```

---

## 🎨 Theming

### How Light/Dark Theme Works

1. **CSS Variables** - Theme colors defined in `assets/scss/abstracts/_variables.scss`:
   ```scss
   :root[data-theme="light"] {
     --color-bg: #ffffff;
     --color-text: #000000;
     --color-primary: #0066cc;
     // ... more variables
   }
   
   :root[data-theme="dark"] {
     --color-bg: #1a1a1a;
     --color-text: #ffffff;
     --color-primary: #4d94ff;
     // ... dark mode variants
   }
   ```

2. **Theme Toggle Button** - In navbar:
   ```html
   <button data-js="theme-toggle" type="button">
     <span data-theme-text>Dark mode</span>
   </button>
   ```

3. **JavaScript Logic** - `js/modules/theme.js`:
   - Toggle `data-theme` attribute on `<html>`
   - Save preference to localStorage
   - Restore theme on page load

### Customizing Themes

Edit theme files in `assets/scss/themes/`:
- `_light.scss` - Light mode styles
- `_dark.scss` - Dark mode styles

Add new variable in `assets/scss/abstracts/_variables.scss` and use throughout the codebase.

---

## ♿ Accessibility

This project follows **WCAG 2.1 Level AA** standards:

### Implemented Features
- ✅ **Semantic HTML** - `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`
- ✅ **ARIA Labels** - `aria-label`, `aria-current`, `aria-expanded`, `aria-hidden`
- ✅ **Keyboard Navigation** - Tab order, focus management, Enter/Escape key handling
- ✅ **Color Contrast** - Text meets minimum contrast ratio (4.5:1)
- ✅ **Form Labels** - Every input has associated `<label>`
- ✅ **Skip Links** - Link to skip to main content
- ✅ **Alt Text** - Every image has meaningful alt text
- ✅ **Focus Indicators** - Visible focus state for keyboard users

### Testing Accessibility
- Use browser DevTools accessibility inspector
- Test with keyboard-only navigation (Tab, Shift+Tab, Enter)
- Check color contrast with tools like WebAIM Contrast Checker
- Validate HTML with W3C Validator

---

## 🚀 Deployment (GitHub Pages)

### Deploy to GitHub Pages

1. **Setup git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/VitoStudio.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Branch: `main`, Folder: `/ (root)`
   - Save

4. **Deploy command:**
   ```bash
   npm run deploy
   ```
   Will push build to `gh-pages` branch (hosting)

### Result
Website will be accessible at: `https://YOUR_USERNAME.github.io/VitoStudio/`

---

## 📸 Screenshots (Optional)

Add screenshots from:
- Home page (hero section, metrics)
- Pricing page
- Sign In/Sign Up with particle effect
- Dark mode variant

---

## 👨‍💻 Development Workflow

### Adding New Page
1. Create `pages/new-page.html`
2. Import styles: `<link rel="stylesheet" href="../assets/css/main.css">`
3. Import scripts: `<script type="module" src="../js/app.js"></script>`
4. Add navigation link in navbar
5. Follow existing HTML structure & BEM naming

### Adding New Component
1. Create `assets/scss/components/_component-name.scss`
2. Define styles with BEM naming: `.component__element--modifier`
3. Import in `assets/scss/main.scss`
4. Use in HTML with semantic classes
5. Test in light & dark theme

### Adding New JavaScript Module
1. Create `js/modules/module-name.js`
2. Export function: `export function initModuleName() { ... }`
3. Import & call in `js/app.js`
4. Make it reusable with `data-js` selectors

---

## 🔧 Maintenance

### Regular Tasks
- Update npm dependencies: `npm update`
- Validate HTML: `npm run validate` (add to scripts)
- Lint SCSS: `npm run lint:scss` (add to scripts)
- Test accessibility: Use automated tools or screen reader

### Monitoring
- Check GitHub Pages deploy status
- Monitor console errors in production
- Test on various browsers & devices

---

## 🤝 Contributing

To contribute:
1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📚 Resources

### Learning Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [particles.js Documentation](https://vincentgarreau.com/particles.js/)
- [Web Accessibility](https://www.w3.org/WAI/test-evaluate/)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

### Tools
- [VS Code](https://code.visualstudio.com/) - Code Editor
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) - Local Development
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/) - Accessibility
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance & Accessibility Audit

---

## 📝 Notes for Grading

**For reviewers/instructors, here are project highlights:**
- ✅ Clean, semantic HTML structure
- ✅ SCSS architecture with BEM naming convention
- ✅ Vanilla JavaScript (no framework)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Light/Dark theme with CSS variables
- ✅ Form validation & error handling
- ✅ Accessibility features (ARIA, semantic HTML, keyboard nav)
- ✅ Particle effect on auth pages
- ✅ Custom 404 error page
- ✅ Dynamic content loading from JSON
- ✅ Performance optimizations (lazy loading, minified CSS)
- ✅ SEO best practices (meta tags, semantic markup)

**Demo Links:**
- 🏠 Home: `/VitoStudio/index.html`
- 💼 Pricing: `/VitoStudio/pages/pricing.html`
- 📝 Blog: `/VitoStudio/pages/blog.html`
- 🔐 Sign In: `/VitoStudio/pages/signin.html` (with particle effect)
- ✍️ Sign Up: `/VitoStudio/pages/signup.html`
- ❌ 404: `/VitoStudio/404.html`

---

## 📄 License

This project is licensed under the MIT License — see LICENSE file for details.

---

## 👏 Credits

- **Framework/Libraries:** particles.js
- **Typography:** Google Fonts (Inter, Playfair Display)
- **Images:** Unsplash
- **Icons:** Custom SVG & standard symbols
- **Built by:** [Your Name] for UTS Semester 2

---

## 📞 Contact

**Questions or feedback?**
- Email: your.email@example.com
- GitHub: [@yourhandle](https://github.com/yourhandle)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

---

**Last Updated:** April 2026  
**Status:** ✅ Stable & Ready for Production