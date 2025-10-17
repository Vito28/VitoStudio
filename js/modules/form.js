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

      if (valid) {
        form.reset();
        alert("Form submitted successfully. Welcome aboard!");
      }
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
