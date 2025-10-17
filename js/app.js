import { initThemeToggle } from "./modules/theme.js";
import { initNavbar } from "./modules/navbar.js";
import { initPaymentModal } from "./modules/modal.js";
import { initTestimonials } from "./modules/slider.js";
import { initForms } from "./modules/form.js";
import { initAuthParticles } from "./modules/particles-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body?.dataset.page ?? "";

  loadContent(page);
  initThemeToggle("[data-js='theme-toggle']");
  initNavbar();
  initPaymentModal();
  initTestimonials();
  initForms();
  initBlogInteractions();
  updateYear();

  if (page === "signin" || page === "signup") {
    initAuthParticles(page);
  }
});

function loadContent(page) {
  fetch("../assets/data/content.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load content: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data) return;
      if (page === "home") renderHomeContent(data.home);
      if (page === "blog-detail") renderBlogDetailContent(data.blogDetail);
    })
    .catch((error) => {
      console.error("Content load error:", error);
    });
}

function renderHomeContent(content) {
  if (!content) return;
  injectImage("[data-slot='home-hero']", content.hero, "eager");
  injectImage("[data-slot='home-services']", content.services);
  injectImage("[data-slot='home-pricing']", content.pricing);
}

function renderBlogDetailContent(content) {
  if (!content) return;
  injectImage("[data-slot='blog-detail-hero']", content.hero);
}

function injectImage(selector, entry, loading = "lazy") {
  const container = document.querySelector(selector);
  if (!container || !entry || !entry.image) return;

  const img = document.createElement("img");
  img.src = entry.image;
  img.alt = entry.alt ?? "";
  img.loading = loading;
  img.decoding = "async";

  container.innerHTML = "";
  container.appendChild(img);
}

function initBlogInteractions() {
  const list = document.querySelector("[data-js='blog-list']");
  const loadMoreBtn = document.querySelector("[data-js='load-more']");
  const filterBtns = document.querySelectorAll(".blog-page__tag");
  let activeTag = "all";

  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((other) => other.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");

        activeTag = btn.dataset.tag ?? "all";
        list?.querySelectorAll(".blog__item").forEach((item) => {
          const match = activeTag === "all" || item.dataset.tag === activeTag;
          item.toggleAttribute("hidden", !match);
        });
      });
    });
  }

  if (!list || !loadMoreBtn) return;

  const queuedPosts = [
    {
      tag: "growth",
      date: "2023-12-02",
      title: "Driving activation with story-driven onboarding",
      summary: "Scripts we use to align sales, product, and success around a shared activation narrative.",
    },
    {
      tag: "design",
      date: "2023-11-10",
      title: "Why we think in journeys instead of screens",
      summary: "Mapping emotional states unlocks sharper design choices and calmer reviews.",
    },
  ];

  loadMoreBtn.addEventListener(
    "click",
    () => {
      const fragment = document.createDocumentFragment();

      queuedPosts.splice(0, 2).forEach((post) => {
        const article = document.createElement("article");
        article.className = "blog__item";
        article.dataset.tag = post.tag;
        article.innerHTML =
          '<div class="blog__meta">' +
          '<span>' + capitalize(post.tag) + '</span>' +
          '<time datetime="' + post.date + '">' + formatDate(post.date) + '</time>' +
          '</div>' +
          '<h3>' + post.title + '</h3>' +
          '<p>' + post.summary + '</p>' +
          '<a class="navbar__link" href="./blog-detail.html">Read story →</a>';
        if (activeTag !== "all" && post.tag !== activeTag) {
          article.hidden = true;
        }
        fragment.appendChild(article);
      });

      list.appendChild(fragment);
      loadMoreBtn.setAttribute("disabled", "true");
      loadMoreBtn.textContent = "All caught up";
    },
    { once: true }
  );
}

function updateYear() {
  const year = document.querySelectorAll("[data-js='year']");
  const current = new Date().getFullYear();
  year.forEach((node) => {
    node.textContent = current;
  });
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
