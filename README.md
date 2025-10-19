# VitoStudio — Front-End UTS (Semester 2 Midterm)

A short, responsive static website built for a Semester 2 **midterm (UTS)**.  
Focuses on clean layout, accessibility, theme support, simple auth pages, a custom 404, and a small particle effect—**no backend, no bundler required** for preview.

<p align="left">
  <!-- Replace the badge links if you enable CI or deploy -->
  <a href="#"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
  <a href="#"><img alt="Status" src="https://img.shields.io/badge/status-stable-brightgreen.svg"></a>
</p>

---

## Table of Contents
- [Features](#features)
- [Pages](#pages)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Run Locally](#run-locally)
- [Theming](#theming)
- [Accessibility](#accessibility)
- [Deployment (GitHub Pages)](#deployment-github-pages)
- [Screenshots (Optional)](#screenshots-optional)
- [Credits](#credits)
- [License](#license)

---

## Features
- **Responsive, accessible pages**: index, sign-in, sign-up, and 404.
- **Light/Dark theme** using CSS variables (see `assets/scss/_variables.scss`).
- **Particles background** via `particles.js` (CDN or local vendor).
- **SCSS organization** with variables and modest component styles.
- **Minimal vanilla JS** for theme toggle and basic form behavior.

---

## Pages
- `/index.html` — Landing / Home
- `/pages/signin.html` — Sign-In
- `/pages/signup.html` — Sign-Up
- `/pages/404.html` — Not Found (custom error page)

> Tip: Link the **404** page on purpose (e.g., a demo link to `/pages/404.html`) to showcase custom error UX during grading.

---

## Tech Stack
- **HTML5**, **CSS/SCSS**, **JavaScript (vanilla)**
- **Google Fonts**: Inter, Playfair Display
- **particles.js** (lightweight background effect)
- **No framework, no bundler** required to preview

---