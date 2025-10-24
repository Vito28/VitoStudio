import { getUser, saveUser, setSession } from "./auth-storage.js";

export function initForms() {
  const forms = document.querySelectorAll("[data-js='auth-form']");

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailField = form.querySelector("input[type='email']");
      const passwordField = form.querySelector("input[type='password']");
      const nameField = form.querySelector("#full-name");
      const companyField = form.querySelector("#company");

      let valid = true;

      if (nameField) {
        toggleError(nameField, "[data-js='error-name']", !!nameField.value.trim());
        valid = valid && !!nameField.value.trim();
      }

      if (companyField) {
        toggleError(companyField, "[data-js='error-company']", !!companyField.value.trim());
        valid = valid && !!companyField.value.trim();
      }

      if (emailField) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailPattern.test(emailField.value);
        toggleError(emailField, "[data-js='error-email']", isValidEmail);
        valid = valid && isValidEmail;
      }

      if (passwordField) {
        const isValidPassword = passwordField.value.trim().length >= 8;
        toggleError(passwordField, "[data-js='error-password']", isValidPassword);
        valid = valid && isValidPassword;
      }

      if (!valid) {
        showMessage(form, "Please fix the highlighted fields.", true);
        return;
      }

      const authType = form.dataset.authType ?? "";
      const email = (emailField?.value ?? "").trim().toLowerCase();
      const password = (passwordField?.value ?? "").trim();
      const name = (nameField?.value ?? "").trim();
      const company = (companyField?.value ?? "").trim();

      if (authType === "signup") {
        const user = {
          name,
          company,
          email,
          password,
        };

        saveUser(user);
        setSession({ name, company, email });
        showMessage(form, "Account created! Redirecting to your dashboard…", false);
        form.reset();
        window.dispatchEvent(new CustomEvent("auth:updated"));
        redirect(form);
        return;
      }

      if (authType === "signin") {
        const storedUser = getUser();

        if (!storedUser || storedUser.email !== email) {
          showMessage(form, "We couldn’t find an account with that email.", true);
          return;
        }

        if (storedUser.password !== password) {
          showMessage(form, "Incorrect password. Please try again.", true);
          return;
        }

        setSession({
          name: storedUser.name,
          company: storedUser.company,
          email: storedUser.email,
        });
        showMessage(form, "Welcome back! Taking you to your dashboard…", false);
        form.reset();
        window.dispatchEvent(new CustomEvent("auth:updated"));
        redirect(form);
        return;
      }

      showMessage(form, "Form submitted successfully.", false);
      form.reset();
    });
  });
}

function toggleError(field, selector, condition) {
  const message = field.form?.querySelector(selector);
  if (!message) return;

  if (condition) {
    message.setAttribute("hidden", "true");
    field.classList.remove("form__field--invalid");
  } else {
    message.removeAttribute("hidden");
    field.classList.add("form__field--invalid");
  }
}

function showMessage(form, text, isError) {
  const message = form.querySelector("[data-js='auth-message']");
  if (!message) return;

  message.textContent = text;
  message.hidden = false;
  message.classList.toggle("form__message--error", isError);
  message.classList.toggle("form__message--success", !isError);
}

function redirect(form) {
  const redirectTarget = form.dataset.redirect ?? "/";
  window.setTimeout(() => {
    window.location.href = redirectTarget;
  }, 1200);
}
