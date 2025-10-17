const SCROLLED_CLASS = "site-header--scrolled";

export function initNavbar() {
  const header = document.querySelector("[data-js='site-header']");
  const menu = document.querySelector("[data-js='navbar-menu']");
  const toggle = document.querySelector("[data-js='navbar-toggle']");
  const overlay = document.querySelector("[data-js='navbar-overlay']");

  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 32) {
      header.classList.add(SCROLLED_CLASS);
    } else {
      header.classList.remove(SCROLLED_CLASS);
    }
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  if (!menu || !toggle) return;

  let lastFocusedElement = null;

  const getFocusable = () =>
    Array.from(menu.querySelectorAll("a, button")).filter(
      (node) => !node.hasAttribute("disabled")
    );

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  const setMenuState = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("has-nav-open", open);
    overlay?.classList.toggle("navbar__overlay--visible", open);

    if (open) {
      lastFocusedElement =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const [firstFocusable] = getFocusable();
      window.setTimeout(() => firstFocusable?.focus(), 0);
    } else {
      lastFocusedElement?.focus?.();
    }
  };

  const toggleMenu = () => {
    setMenuState(!isOpen());
  };

  toggle.addEventListener("click", toggleMenu);
  overlay?.addEventListener("click", () => setMenuState(false));

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (!isOpen()) return;

    if (event.key === "Escape") {
      setMenuState(false);
      return;
    }

    if (event.key === "Tab") {
      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        last.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && isOpen()) {
      setMenuState(false);
    }
  });
}
