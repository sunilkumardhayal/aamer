const loadEnhancementStyles = () => {
  if (document.querySelector('link[href="enhancements.css"]')) return;

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = "enhancements.css";
  document.head.appendChild(stylesheet);
};

const enhanceHeroMessage = () => {
  const heroNote = document.querySelector(".hero-note p");
  if (!heroNote) return;

  heroNote.innerHTML = "<strong>Research focus</strong><br>From sediment incipient motion to water-sensitive cities.";
};

const addContactSection = () => {
  const main = document.querySelector("main");
  if (!main || document.querySelector("#contact")) return;

  main.insertAdjacentHTML(
    "beforeend",
    `
      <section id="contact" class="section contact-section">
        <div class="container contact-grid">
          <div class="contact-intro reveal">
            <p class="eyebrow">Contact</p>
            <h2>Connect for research, teaching, and academic collaboration.</h2>
            <p>
              For research discussions, student supervision, invited talks, and collaboration
              in sediment transport or urban water management, use the contact details provided here.
            </p>
          </div>

          <div class="contact-card reveal">
            <ul class="contact-list">
              <li>
                <a href="mailto:aamer_majid@nitsri.ac.in">
                  <span>Institutional email</span>
                  <strong>aamer_majid@nitsri.ac.in</strong>
                </a>
              </li>
              <li>
                <a href="mailto:aamerbhat010@gmail.com">
                  <span>Alternate email</span>
                  <strong>aamerbhat010@gmail.com</strong>
                </a>
              </li>
              <li>
                <a href="tel:+919797213888">
                  <span>Phone</span>
                  <strong>+91 97972 13888</strong>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/aamer-majid-bhat-ph-d-921149167/" target="_blank" rel="noopener">
                  <span>LinkedIn</span>
                  <strong>Aamer Majid Bhat</strong>
                </a>
              </li>
            </ul>

            <nav class="contact-profile-links" aria-label="Academic and professional profiles">
              <a href="https://scholar.google.com/citations?user=DQRelcAAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar ↗</a>
              <a href="https://orcid.org/0000-0002-8832-2789" target="_blank" rel="noopener">ORCID ↗</a>
              <a href="Aamer_CV.pdf" download>Download CV ↓</a>
            </nav>
          </div>
        </div>
      </section>
    `
  );
};

const addFloatingActions = () => {
  document.querySelector(".floating-cv-button")?.remove();
  if (document.querySelector("[data-floating-actions]")) return;

  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <aside id="floating-contact-panel" class="floating-contact-panel" aria-label="Contact Dr. Aamer Majid Bhat" hidden>
        <div class="floating-panel-header">
          <div>
            <h2>Contact Me</h2>
            <p>Choose the most convenient way to connect.</p>
          </div>
          <button class="floating-panel-close" type="button" data-contact-close aria-label="Close contact panel">×</button>
        </div>
        <div class="floating-panel-links">
          <a href="mailto:aamer_majid@nitsri.ac.in">
            <span>Institutional email</span><span>↗</span>
          </a>
          <a href="mailto:aamerbhat010@gmail.com">
            <span>Alternate email</span><span>↗</span>
          </a>
          <a href="tel:+919797213888">
            <span>Call +91 97972 13888</span><span>↗</span>
          </a>
          <a href="https://www.linkedin.com/in/aamer-majid-bhat-ph-d-921149167/" target="_blank" rel="noopener">
            <span>LinkedIn profile</span><span>↗</span>
          </a>
        </div>
      </aside>

      <div class="floating-actions" data-floating-actions>
        <button class="floating-contact-button" type="button" data-contact-toggle aria-expanded="false" aria-controls="floating-contact-panel">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path>
          </svg>
          Contact Me
        </button>
        <div class="floating-secondary-row">
          <a class="floating-cv-link" href="Aamer_CV.pdf" download aria-label="Download Aamer Majid Bhat CV">
            <span aria-hidden="true">↓</span> CV
          </a>
          <a class="floating-top-button" href="#home" data-to-top aria-label="Back to top">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 19V5"></path><path d="m5 12 7-7 7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    `
  );
};

loadEnhancementStyles();
enhanceHeroMessage();
addContactSection();
addFloatingActions();

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = nav ? [...nav.querySelectorAll("a")] : [];
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const publications = [...document.querySelectorAll("[data-category]")];
const contactToggle = document.querySelector("[data-contact-toggle]");
const contactClose = document.querySelector("[data-contact-close]");
const contactPanel = document.querySelector("#floating-contact-panel");
const floatingActions = document.querySelector("[data-floating-actions]");
const toTopButton = document.querySelector("[data-to-top]");

const setMenuState = (isOpen) => {
  if (!navToggle || !nav) return;
  navToggle.setAttribute("aria-expanded", String(isOpen));
  nav.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
};

const setContactPanelState = (isOpen) => {
  if (!contactToggle || !contactPanel) return;
  contactToggle.setAttribute("aria-expanded", String(isOpen));
  contactPanel.hidden = !isOpen;

  if (isOpen) {
    contactClose?.focus();
  }
};

navToggle?.addEventListener("click", () => {
  setMenuState(navToggle.getAttribute("aria-expanded") !== "true");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

contactToggle?.addEventListener("click", () => {
  setContactPanelState(contactToggle.getAttribute("aria-expanded") !== "true");
});

contactClose?.addEventListener("click", () => {
  setContactPanelState(false);
  contactToggle?.focus();
});

document.addEventListener("pointerdown", (event) => {
  if (!contactPanel || contactPanel.hidden) return;
  if (contactPanel.contains(event.target) || floatingActions?.contains(event.target)) return;
  setContactPanelState(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  setMenuState(false);

  if (contactPanel && !contactPanel.hidden) {
    setContactPanelState(false);
    contactToggle?.focus();
  }
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
  toTopButton?.classList.toggle("is-visible", window.scrollY > 520);
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

const yearElement = document.querySelector("[data-year]");
if (yearElement) yearElement.textContent = new Date().getFullYear();

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
