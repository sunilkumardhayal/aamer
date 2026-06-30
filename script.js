const loadUpgradeStyles = () => {
  if (document.querySelector('link[href^="portfolio-upgrade.css"]')) return;

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = "portfolio-upgrade.css?v=20260630-7";
  document.head.appendChild(stylesheet);
};

const createNavLink = (href, text) => {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = text;
  return link;
};

const enhanceHeroAndNavigation = () => {
  const heroNote = document.querySelector(".hero-note p");
  if (heroNote) {
    heroNote.innerHTML = "<strong>Research focus</strong><br>From sediment incipient motion to water-sensitive cities.";
  }

  const heroActions = document.querySelector(".hero-actions");
  if (heroActions && !heroActions.querySelector('[href="#contact"]')) {
    const contactButton = document.createElement("a");
    contactButton.className = "button button-ghost hero-contact-button";
    contactButton.href = "#contact";
    contactButton.textContent = "Contact me";
    heroActions.appendChild(contactButton);
  }

  const nav = document.querySelector("[data-nav]");
  if (!nav) return;

  const researchLink = nav.querySelector('a[href="#research"]');
  if (researchLink && !nav.querySelector('a[href="#projects"]')) {
    researchLink.insertAdjacentElement("afterend", createNavLink("#projects", "Projects"));
  }

  const cvLink = nav.querySelector(".nav-cv");
  if (cvLink && !nav.querySelector('a[href="#teaching"]')) {
    nav.insertBefore(createNavLink("#teaching", "Teaching"), cvLink);
  }

  if (cvLink && !nav.querySelector('a[href="#contact"]')) {
    nav.insertBefore(createNavLink("#contact", "Contact"), cvLink);
  }
};

const addProjectsSection = () => {
  const researchSection = document.querySelector("#research");
  if (!researchSection || document.querySelector("#projects")) return;

  researchSection.insertAdjacentHTML(
    "afterend",
    `
      <section id="projects" class="section projects-section">
        <div class="container">
          <div class="section-heading section-heading-row reveal">
            <div>
              <p class="eyebrow">Selected research themes</p>
              <h2>Research translated into practical water solutions.</h2>
            </div>
            <p class="projects-intro">
              Three connected areas link fundamental hydraulics with resilient river and urban-water systems.
            </p>
          </div>

          <div class="project-grid">
            <article class="project-card reveal">
              <span class="project-number">01</span>
              <div class="project-visual" aria-hidden="true">
                <svg viewBox="0 0 96 96">
                  <path d="M10 58c14-13 27-17 40-10s25 6 36-6"/>
                  <path d="M10 70c15-8 29-10 42-4s24 5 34 1"/>
                  <circle cx="27" cy="37" r="7"/><circle cx="49" cy="29" r="5"/><circle cx="69" cy="24" r="6"/>
                  <path d="M23 18v12m-6-6 6 6 6-6"/>
                </svg>
              </div>
              <h3>Sediment Incipient Motion</h3>
              <p>
                Dimensionless threshold variables, movability number, grain protrusion,
                sediment non-uniformity, and stability of coarse material in natural streams.
              </p>
              <ul class="project-tags">
                <li>Threshold mechanics</li>
                <li>Movability number</li>
                <li>Open-channel flow</li>
              </ul>
              <a class="project-link" href="#publications" data-project-filter="sediment">View related publications <span aria-hidden="true">→</span></a>
            </article>

            <article class="project-card reveal">
              <span class="project-number">02</span>
              <div class="project-visual" aria-hidden="true">
                <svg viewBox="0 0 96 96">
                  <path d="M12 70h72"/><path d="M18 70V46h15v24M40 70V34h18v36M65 70V23h13v47"/>
                  <path d="M10 27c14 0 14 11 28 11s14-11 28-11 14 11 20 11"/>
                  <path d="M29 81h38"/>
                </svg>
              </div>
              <h3>Green Stormwater Infrastructure</h3>
              <p>
                SWMM-based urban flood mitigation, sustainable drainage pathways,
                stormwater-control measures, and climate-aware design for Indian cities.
              </p>
              <ul class="project-tags">
                <li>SWMM</li>
                <li>Urban flood mitigation</li>
                <li>Climate resilience</li>
              </ul>
              <a class="project-link" href="https://doi.org/10.1061/JHYEFF.HEENG-6677" target="_blank" rel="noopener">Open featured study <span aria-hidden="true">↗</span></a>
            </article>

            <article class="project-card reveal">
              <span class="project-number">03</span>
              <div class="project-visual" aria-hidden="true">
                <svg viewBox="0 0 96 96">
                  <path d="M12 67h72"/><path d="M17 61c13-18 24-18 37 0 10-14 19-14 29 0"/>
                  <path d="M20 67v10m13-10v10m13-10v10m13-10v10m13-10v10"/>
                  <path d="M17 31h62"/><path d="M23 31v15m50-15v15"/>
                  <path d="M30 22c0 5-4 9-9 9m45-9c0 5 4 9 9 9"/>
                </svg>
              </div>
              <h3>Curb Inlets and Vegetated Swales</h3>
              <p>
                Hydraulic performance of roadside curb inlets and swales for safer streets,
                sustainable drainage, and improved stormwater conveyance.
              </p>
              <ul class="project-tags">
                <li>Curb-inlet hydraulics</li>
                <li>Vegetated swales</li>
                <li>Street drainage</li>
              </ul>
              <a class="project-link" href="https://doi.org/10.1016/j.wsee.2025.05.003" target="_blank" rel="noopener">Read the review paper <span aria-hidden="true">↗</span></a>
            </article>
          </div>
        </div>
      </section>
    `
  );
};

const addFeaturedPublications = () => {
  const filters = document.querySelector(".publication-filters");
  if (!filters || document.querySelector(".featured-publications")) return;

  filters.insertAdjacentHTML(
    "beforebegin",
    `
      <section class="featured-publications reveal" aria-labelledby="featured-publications-title">
        <div class="featured-publications-header">
          <div>
            <p class="eyebrow">Featured publications</p>
            <h3 id="featured-publications-title">A balanced view of recent and foundational work.</h3>
          </div>
          <p>Selected papers covering urban flood resilience, water-sensitive cities, and sediment-threshold mechanics.</p>
        </div>

        <div class="featured-grid">
          <article class="featured-paper">
            <div class="featured-paper-meta"><span>2026</span><span>Urban water</span></div>
            <h4>Optimizing green infrastructure for urban flood mitigation using SWMM model</h4>
            <p>Case-study research focused on green infrastructure and urban flood mitigation in Kozhikode, India.</p>
            <a href="https://doi.org/10.1061/JHYEFF.HEENG-6677" target="_blank" rel="noopener">Open DOI <span aria-hidden="true">↗</span></a>
          </article>

          <article class="featured-paper">
            <div class="featured-paper-meta"><span>2026</span><span>Review</span></div>
            <h4>Towards water sensitivity: A critical review of urban water management strategies</h4>
            <p>A recent review connecting urban-water management strategies with the wider water-sensitive-cities agenda.</p>
            <a href="https://doi.org/10.1007/s11269-025-04377-2" target="_blank" rel="noopener">Open DOI <span aria-hidden="true">↗</span></a>
          </article>

          <article class="featured-paper">
            <div class="featured-paper-meta"><span>2023</span><span>Sediment transport</span></div>
            <h4>Movability number as the parameter of sediment incipient motion</h4>
            <p>A mathematical treatment of movability number as a parameter for sediment incipient motion.</p>
            <a href="https://doi.org/10.1007/s12601-023-00112-3" target="_blank" rel="noopener">Open DOI <span aria-hidden="true">↗</span></a>
          </article>
        </div>
      </section>
    `
  );
};

const addPublicationTools = () => {
  const filters = document.querySelector(".publication-filters");
  const publicationList = document.querySelector("[data-publication-list]");
  if (!filters || !publicationList || document.querySelector(".publication-toolbar")) return;

  filters.insertAdjacentHTML(
    "beforebegin",
    `
      <div class="publication-toolbar reveal">
        <label class="publication-search-wrap">
          <span class="sr-only">Search publications</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path>
          </svg>
          <input class="publication-search" type="search" placeholder="Search by title, author, journal, year, or topic" autocomplete="off">
        </label>
        <p class="publication-results-count" aria-live="polite"></p>
      </div>
    `
  );

  publicationList.insertAdjacentHTML(
    "afterend",
    '<p class="publication-empty-state" hidden>No publications match this search. Try a broader keyword or select another category.</p>'
  );

  publicationList.querySelectorAll(".publication-item").forEach((publication) => {
    const details = publication.querySelector("div");
    const doiLink = details?.querySelector('a[href*="doi.org"]');
    if (!details || !doiLink || details.querySelector(".copy-citation-button")) return;

    const actions = document.createElement("div");
    actions.className = "publication-actions";
    doiLink.insertAdjacentElement("beforebegin", actions);
    actions.appendChild(doiLink);

    const copyButton = document.createElement("button");
    copyButton.className = "copy-citation-button";
    copyButton.type = "button";
    copyButton.textContent = "Copy citation";
    copyButton.setAttribute("aria-label", `Copy citation for ${publication.querySelector("h3")?.textContent.trim() || "publication"}`);
    actions.appendChild(copyButton);
  });
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
              For research discussions, student-supervision enquiries, invited talks,
              peer-review activities, or academic collaboration, use the details provided here.
            </p>
            <span class="contact-availability">Academic enquiries welcome</span>
          </div>

          <div class="contact-card reveal">
            <ul class="contact-list">
              <li class="contact-copy-row">
                <span>Institutional email</span>
                <div>
                  <strong>aamer_majid@nitsri.ac.in</strong>
                  <button class="copy-email-button" type="button" data-copy-email="aamer_majid@nitsri.ac.in">Copy email</button>
                </div>
              </li>
              <li><a href="mailto:aamerbhat010@gmail.com"><span>Alternate email</span><strong>aamerbhat010@gmail.com</strong></a></li>
              <li><a href="tel:+919797213888"><span>Phone</span><strong>+91 97972 13888</strong></a></li>
              <li><a href="https://nitsri.ac.in/Department/DisplayDeptPage.aspx?ItemID=oaoke&nDeptID=c&page=maigs" target="_blank" rel="noopener"><span>Faculty profile</span><strong>NIT Srinagar</strong></a></li>
            </ul>

            <nav class="contact-profile-links" aria-label="Academic and professional profiles">
              <a href="https://scholar.google.com/citations?user=DQRelcAAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar ↗</a>
              <a href="https://orcid.org/0000-0002-8832-2789" target="_blank" rel="noopener">ORCID ↗</a>
              <a href="https://www.linkedin.com/in/aamer-majid-bhat-ph-d-921149167/" target="_blank" rel="noopener">LinkedIn ↗</a>
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
          <a href="mailto:aamer_majid@nitsri.ac.in"><span>Institutional email</span><span>↗</span></a>
          <a href="mailto:aamerbhat010@gmail.com"><span>Alternate email</span><span>↗</span></a>
          <a href="tel:+919797213888"><span>Call +91 97972 13888</span><span>↗</span></a>
          <a href="#contact"><span>Full contact section</span><span>↓</span></a>
        </div>
      </aside>

      <div class="floating-actions" data-floating-actions>
        <button class="floating-contact-button" type="button" data-contact-toggle aria-expanded="false" aria-controls="floating-contact-panel">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path>
          </svg>
          Contact Me
        </button>
        <div class="floating-secondary-row">
          <a class="floating-cv-link" href="Aamer_CV.pdf" download aria-label="Download Aamer Majid Bhat CV"><span aria-hidden="true">↓</span> CV</a>
          <a class="floating-top-button" href="#home" data-to-top aria-label="Back to top">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 19V5"></path><path d="m5 12 7-7 7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    `
  );
};

const updateFooter = () => {
  const footerIdentity = document.querySelector(".site-footer .footer-row > div");
  if (!footerIdentity || footerIdentity.querySelector(".site-updated")) return;

  const updated = document.createElement("p");
  updated.className = "site-updated";
  updated.textContent = "Academic portfolio · Last updated June 2026";
  footerIdentity.appendChild(updated);
};

const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
};

loadUpgradeStyles();
enhanceHeroAndNavigation();
addProjectsSection();
addFeaturedPublications();
addPublicationTools();
addContactSection();
addFloatingActions();
updateFooter();

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const publications = [...document.querySelectorAll(".publication-item[data-category]")];
const publicationSearch = document.querySelector(".publication-search");
const publicationResultsCount = document.querySelector(".publication-results-count");
const publicationEmptyState = document.querySelector(".publication-empty-state");
const contactToggle = document.querySelector("[data-contact-toggle]");
const contactClose = document.querySelector("[data-contact-close]");
const contactPanel = document.querySelector("#floating-contact-panel");
const floatingActions = document.querySelector("[data-floating-actions]");
const toTopButton = document.querySelector("[data-to-top]");
let activePublicationFilter = "all";

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
  if (isOpen) contactClose?.focus();
};

const applyPublicationFilters = () => {
  const query = publicationSearch?.value.trim().toLowerCase() || "";
  let visibleCount = 0;

  publications.forEach((publication) => {
    const matchesCategory = activePublicationFilter === "all" || publication.dataset.category === activePublicationFilter;
    const matchesSearch = !query || publication.textContent.toLowerCase().includes(query);
    const isVisible = matchesCategory && matchesSearch;
    publication.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  if (publicationResultsCount) {
    publicationResultsCount.textContent = `${visibleCount} of ${publications.length} publications shown`;
  }

  if (publicationEmptyState) publicationEmptyState.hidden = visibleCount !== 0;
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
    activePublicationFilter = button.dataset.filter || "all";

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    applyPublicationFilters();
  });
});

publicationSearch?.addEventListener("input", applyPublicationFilters);
applyPublicationFilters();

document.querySelectorAll("[data-project-filter]").forEach((link) => {
  link.addEventListener("click", () => {
    const requestedFilter = link.dataset.projectFilter;
    const targetButton = filterButtons.find((button) => button.dataset.filter === requestedFilter);
    targetButton?.click();
  });
});

document.querySelectorAll(".copy-citation-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const publication = button.closest(".publication-item");
    if (!publication) return;

    const title = publication.querySelector("h3")?.textContent.trim() || "";
    const details = publication.querySelector("p")?.textContent.trim() || "";
    const doi = publication.querySelector('a[href*="doi.org"]')?.href || "";
    const citation = [title, details, doi].filter(Boolean).join(". ");

    try {
      await copyText(citation);
      const originalText = button.textContent;
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1600);
    } catch {
      button.textContent = "Copy failed";
    }
  });
});

document.querySelectorAll("[data-copy-email]").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await copyText(button.dataset.copyEmail || "");
      const originalText = button.textContent;
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1600);
    } catch {
      button.textContent = "Copy failed";
    }
  });
});

const yearElement = document.querySelector("[data-year]");
if (yearElement) yearElement.textContent = new Date().getFullYear();

const revealItems = [...document.querySelectorAll(".reveal")];
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const navigationObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visibleEntry) return;

      navLinks.forEach((link) => {
        link.classList.toggle("is-current", link.getAttribute("href") === `#${visibleEntry.target.id}`);
      });
    },
    { rootMargin: "-35% 0px -55%", threshold: [0, 0.1, 0.25] }
  );

  sections.forEach((section) => navigationObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
