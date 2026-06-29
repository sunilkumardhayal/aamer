const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = nav ? [...nav.querySelectorAll("a")] : [];
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const publications = [...document.querySelectorAll("[data-category]")];

const setMenuState = (isOpen) => {
  if (!navToggle || !nav) return;
  navToggle.setAttribute("aria-expanded", String(isOpen));
  nav.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
};

navToggle?.addEventListener("click", () => {
  setMenuState(navToggle.getAttribute("aria-expanded") !== "true");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuState(false);
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    publications.forEach((publication) => {
      publication.hidden = selected !== "all" && publication.dataset.category !== selected;
    });
  });
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();

const revealItems = [...document.querySelectorAll(".reveal")];
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px" }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
const floatingActions = document.querySelector("[data-floating-actions]");
const contactModal = document.querySelector("[data-contact-modal]");
const openContactModal = document.querySelector("[data-open-contact-modal]");
const closeContactModal = document.querySelector("[data-close-contact-modal]");

const setContactModalState = (isOpen) => {
  if (!contactModal) return;
  if (!isOpen) openContactModal?.focus();
  contactModal.hidden = !isOpen;
  contactModal.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("modal-open", isOpen);
  if (isOpen) closeContactModal?.focus();
};

openContactModal?.addEventListener("click", () => setContactModalState(true));
closeContactModal?.addEventListener("click", () => setContactModalState(false));
contactModal?.addEventListener("click", (event) => {
  if (event.target === contactModal) setContactModalState(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && contactModal && !contactModal.hidden) setContactModalState(false);
});

const updateFloatingActions = () => {
  floatingActions?.classList.toggle("is-visible", window.scrollY > 260);
};
updateFloatingActions();
window.addEventListener("scroll", updateFloatingActions, { passive: true });

const handleContactForm = async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector('button[type="submit"]');
  const status = form.querySelector("[data-form-status]");
  const originalLabel = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  status.textContent = "";

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error("Form submission failed");
    form.reset();
    status.textContent = "Thanks! Your message has been submitted successfully.";
    if (form.id === "contact-form-modal") window.setTimeout(() => setContactModalState(false), 1600);
  } catch {
    status.textContent = "There was a problem sending your message. Please use email instead.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalLabel;
  }
};

document.querySelectorAll("[data-contact-form]").forEach((form) => {
  form.addEventListener("submit", handleContactForm);
});
