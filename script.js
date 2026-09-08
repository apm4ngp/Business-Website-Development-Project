document.getElementById("year").textContent = new Date().getFullYear();

const header = document.getElementById("siteHeader");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 12);
});

const menuToggle = document.getElementById("menuToggle");
const mobileOverlay = document.getElementById("mobileOverlay");

function closeMenu() {
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  mobileOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

function openMenu() {
  menuToggle.classList.add("open");
  menuToggle.setAttribute("aria-expanded", "true");
  mobileOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

menuToggle.addEventListener("click", () => {
  const isOpen = mobileOverlay.classList.contains("open");
  isOpen ? closeMenu() : openMenu();
});

document.querySelectorAll(".mobile-overlay .nav-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const form = document.getElementById("bookingForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");
const messageError = document.getElementById("messageError");
const formSuccess = document.getElementById("formSuccess");

function setFieldState(input, errorEl, message) {
  const row = input.closest(".form-row");
  if (message) {
    row.classList.add("invalid");
    errorEl.textContent = message;
    return false;
  }
  row.classList.remove("invalid");
  errorEl.textContent = "";
  return true;
}

function validateName() {
  const value = nameInput.value.trim();
  if (value.length < 2) {
    return setFieldState(nameInput, nameError, "Enter your full name.");
  }
  return setFieldState(nameInput, nameError, "");
}

function validatePhone() {
  const value = phoneInput.value.trim();
  const digitsOnly = /^[6-9]\d{9}$/;
  if (!digitsOnly.test(value)) {
    return setFieldState(phoneInput, phoneError, "Enter a valid 10-digit mobile number.");
  }
  return setFieldState(phoneInput, phoneError, "");
}

function validateMessage() {
  const value = messageInput.value.trim();
  if (value.length < 5) {
    return setFieldState(messageInput, messageError, "Tell us what you'd like to book.");
  }
  return setFieldState(messageInput, messageError, "");
}

nameInput.addEventListener("blur", validateName);
phoneInput.addEventListener("blur", validatePhone);
messageInput.addEventListener("blur", validateMessage);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formSuccess.textContent = "";

  const isNameValid = validateName();
  const isPhoneValid = validatePhone();
  const isMessageValid = validateMessage();

  if (isNameValid && isPhoneValid && isMessageValid) {
    formSuccess.textContent = `Thanks, ${nameInput.value.trim()}. Your request has been received — we'll call you shortly to confirm.`;
    form.reset();
    document.querySelectorAll(".form-row").forEach((row) => row.classList.remove("invalid"));
  }
});
