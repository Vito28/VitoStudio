export function initThemeToggle(btnSelector) {
  const root = document.documentElement;
  const key = "theme";
  const saved = localStorage.getItem(key) || "light";
  root.setAttribute("data-theme", saved);

  const buttons = Array.from(document.querySelectorAll(btnSelector));
  if (buttons.length === 0) return;

  buttons.forEach((button) => updateLabel(button, saved));

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem(key, next);
      buttons.forEach((btn) => updateLabel(btn, next));
    });
  });
}

function updateLabel(btn, theme) {
  btn.setAttribute("aria-pressed", theme === "dark");
  btn.textContent = theme === "light" ? "Dark mode" : "Light mode";
}
