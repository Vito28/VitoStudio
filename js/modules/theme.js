const ICONS = {
  light: '<path d="M12 3v2M17.66 6.34l-1.42 1.42M21 12h-2M17.66 17.66l-1.42-1.42M12 17v2M7.76 16.24l-1.42 1.42M5 12H3M7.76 7.76L6.34 6.34M12 8a4 4 0 100 8 4 4 0 000-8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  dark: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
};

export function initThemeToggle(btnSelector) {
  const root = document.documentElement;
  const key = "theme";
  const saved = localStorage.getItem(key) || detectSystemTheme();
  root.setAttribute("data-theme", saved);

  const buttons = Array.from(document.querySelectorAll(btnSelector));
  if (buttons.length === 0) return;

  buttons.forEach((button) => updateButtonState(button, saved));

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem(key, next);
      buttons.forEach((btn) => updateButtonState(btn, next));
    });
  });
}

function detectSystemTheme() {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function updateButtonState(btn, theme) {
  const isDark = theme === "dark";
  const srLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  btn.setAttribute("aria-pressed", isDark ? "true" : "false");
  btn.setAttribute("aria-label", srLabel);
  btn.setAttribute("title", srLabel);

  const textNode = btn.querySelector("[data-theme-text]");
  if (textNode) {
    const lightText = textNode.dataset.themeLight ?? "Light";
    const darkText = textNode.dataset.themeDark ?? "Dark";
    textNode.textContent = isDark ? lightText : darkText;
  } else {
    btn.textContent = isDark ? "Light mode" : "Dark mode";
  }

  const iconWrapper = btn.querySelector("[data-theme-icon]");
  if (iconWrapper) {
    const svg = iconWrapper.matches("svg") ? iconWrapper : iconWrapper.querySelector("svg");
    if (svg) {
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "none");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      svg.innerHTML = isDark ? ICONS.light : ICONS.dark;
    }
  }
}
