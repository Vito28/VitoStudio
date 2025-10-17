export function initPaymentModal() {
  const modal = document.querySelector("[data-js='payment-modal']");
  const planField = modal?.querySelector("#plan");
  const openers = document.querySelectorAll("[data-js='open-payment']");
  const closer = modal?.querySelector("[data-js='close-payment']");

  if (!modal || !planField) return;

  const toggleModal = (visible) => {
    modal.classList.toggle("modal--visible", visible);
    modal.setAttribute("aria-hidden", String(!visible));
    if (visible) {
      planField.focus();
    }
  };

  openers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const plan = btn.getAttribute("data-plan") ?? "basic";
      planField.value = plan.charAt(0).toUpperCase() + plan.slice(1);
      toggleModal(true);
    });
  });

  closer?.addEventListener("click", () => toggleModal(false));

  modal.addEventListener("click", (event) => {
    if (event.target === modal) toggleModal(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") toggleModal(false);
  });

  const form = modal.querySelector("[data-js='payment-form']");
  const companyField = form?.querySelector("#company");
  const emailField = form?.querySelector("#email");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const companyError = form.querySelector("[data-js='error-company']");
    const emailError = form.querySelector("[data-js='error-email']");
    let isValid = true;

    if (!companyField?.value.trim()) {
      companyError?.removeAttribute("hidden");
      isValid = false;
    } else {
      companyError?.setAttribute("hidden", "true");
    }

    const emailValue = emailField?.value.trim() ?? "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
      emailError?.removeAttribute("hidden");
      isValid = false;
    } else {
      emailError?.setAttribute("hidden", "true");
    }

    if (isValid) {
      form.reset();
      toggleModal(false);
      alert("Thanks! We will reach out within 24 hours.");
    }
  });
}
