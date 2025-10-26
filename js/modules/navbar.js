import { clearSession, getSession, SESSION_KEY } from "./auth-storage.js";

const SCROLLED_CLASS = "site-header--scrolled";
const HIDDEN_CLASS = "site-header--hidden";
const SCROLL_HIDE_OFFSET = 80;
const SCROLL_SENSITIVITY = 6;

export function initNavbar() {
  const header = document.querySelector("[data-js='site-header']");
  if (!header) return;

  const menu = document.querySelector("[data-js='navbar-menu']");
  const toggle = document.querySelector("[data-js='navbar-toggle']");
  const overlay = document.querySelector("[data-js='navbar-overlay']");
  const profileItem = header.querySelector("[data-js='navbar-profile']");
  const profileToggle = profileItem?.querySelector("[data-js='profile-toggle']");
  const profileMenu = profileItem?.querySelector("[data-js='profile-menu']");
  const profileName = profileItem?.querySelector("[data-js='profile-name']");
  const profileEmail = profileItem?.querySelector("[data-js='profile-email']");
  const profileInitials = profileItem?.querySelector("[data-js='profile-initials']");
  let profileSignin = profileItem?.querySelector("[data-js='profile-signin']");
  let profileLogout = profileItem?.querySelector("[data-js='profile-logout']");

  let lastScrollY = window.scrollY;

  const closeProfileMenu = () => {
    profileToggle?.setAttribute("aria-expanded", "false");
    profileMenu?.setAttribute("aria-hidden", "true");
    profileMenu?.classList.remove("navbar__profile-menu--visible");
  };

  const openProfileMenu = () => {
    profileToggle?.setAttribute("aria-expanded", "true");
    profileMenu?.setAttribute("aria-hidden", "false");
    profileMenu?.classList.add("navbar__profile-menu--visible");
  };

  const toggleProfileMenu = () => {
    const isExpanded = profileToggle?.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeProfileMenu();
    } else {
      openProfileMenu();
    }
  };

  const ensureSigninButton = () => {
    if (!profileMenu) return null;
    if (!profileSignin) {
      const button = document.createElement("a");
      button.href = "./pages/signin.html";
      button.className = "navbar__profile-action";
      button.dataset.js = "profile-signin";
      button.textContent = "Sign in";
      profileMenu.appendChild(button);
      profileSignin = button;
    }
    return profileSignin;
  };

  const ensureLogoutButton = () => {
    if (!profileMenu) return null;
    if (!profileLogout) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "navbar__profile-action";
      button.dataset.js = "profile-logout";
      button.textContent = "Sign out";
      profileMenu.appendChild(button);
      profileLogout = button;
    }
    if (profileLogout && !profileLogout.dataset.bound) {
      profileLogout.addEventListener("click", () => {
        clearSession();
        closeProfileMenu();
        syncProfileUI();
        window.dispatchEvent(new CustomEvent("auth:updated"));
      });
      profileLogout.dataset.bound = "true";
    }
    return profileLogout;
  };

  const syncProfileUI = () => {
    const session = getSession();
    if (!session) {
      // User belum login - tampilkan Sign in button
      if (profileName) {
        profileName.textContent = "Guest";
      }
      if (profileEmail) {
        profileEmail.textContent = "You're browsing as guest.";
      }
      if (profileInitials) {
        profileInitials.textContent = "GU";
      }
      
      // Hapus logout button jika ada
      if (profileLogout) {
        profileLogout.remove();
        profileLogout = null;
      }
      
      // Tampilkan signin button
      ensureSigninButton()?.removeAttribute("hidden");
      profileToggle?.setAttribute("aria-label", "Guest account menu");
      return;
    }

    // User sudah login - tampilkan logout button
    if (profileName) {
      profileName.textContent = session.name?.trim() || deriveDisplayName(session.email);
    }
    if (profileEmail) {
      profileEmail.textContent = session.email ?? "";
    }
    if (profileInitials) {
      profileInitials.textContent = createInitials(session.name, session.email);
    }
    
    // Hapus signin button jika ada
    if (profileSignin) {
      profileSignin.remove();
      profileSignin = null;
    }
    
    // Tampilkan logout button
    ensureLogoutButton()?.removeAttribute("hidden");
    profileToggle?.setAttribute("aria-label", "Account menu");
  };

  const handleScroll = () => {
    const currentY = window.scrollY;

    if (currentY > 32) {
      header.classList.add(SCROLLED_CLASS);
    } else {
      header.classList.remove(SCROLLED_CLASS);
    }

    const isNavOpen = document.body.classList.contains("has-nav-open");

    if (currentY <= SCROLL_HIDE_OFFSET || isNavOpen) {
      header.classList.remove(HIDDEN_CLASS);
      lastScrollY = currentY;
      return;
    }

    const scrollDifference = currentY - lastScrollY;

    if (scrollDifference > SCROLL_SENSITIVITY) {
      header.classList.add(HIDDEN_CLASS);
    } else if (scrollDifference < -SCROLL_SENSITIVITY) {
      header.classList.remove(HIDDEN_CLASS);
    }

    if (profileMenu?.classList.contains("navbar__profile-menu--visible")) {
      closeProfileMenu();
    }

    lastScrollY = currentY;
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  profileToggle?.addEventListener("click", (event) => {
    event.preventDefault();
    toggleProfileMenu();
  });

  document.addEventListener("click", (event) => {
    if (profileToggle?.getAttribute("aria-expanded") !== "true") return;
    if (!profileItem?.contains(event.target)) {
      closeProfileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && profileToggle?.getAttribute("aria-expanded") === "true") {
      closeProfileMenu();
      profileToggle.focus();
    }
  });

  window.addEventListener("auth:updated", syncProfileUI);
  window.addEventListener("storage", (event) => {
    if (event.key === SESSION_KEY) {
      syncProfileUI();
    }
  });

  syncProfileUI();

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
      header.classList.remove(HIDDEN_CLASS);
      closeProfileMenu();
    }

    if (open) {
      if (window.innerWidth <= 768) {
        const headerRect = header.getBoundingClientRect();
        const topOffset = Math.max(headerRect.bottom + 16, 16);
        menu.style.top = `${topOffset}px`;
      } else {
        menu.style.removeProperty("top");
      }

      lastFocusedElement =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const [firstFocusable] = getFocusable();
      window.setTimeout(() => firstFocusable?.focus(), 0);
    } else {
      menu.style.removeProperty("top");
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

function deriveDisplayName(email = "") {
  if (!email) return "Account";
  const [localPart] = email.split("@");
  return localPart || "Account";
}

function createInitials(name, email = "") {
  const safeName = name?.trim();
  if (safeName) {
    const parts = safeName.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    if (parts[0].length >= 2) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }

  const safeEmail = email.trim();
  if (safeEmail) {
    return safeEmail[0].toUpperCase();
  }

  return "U";
}
