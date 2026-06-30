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

const ensureCitationButtons = () => {
  publications.forEach((publication) => {
    const details = publication.querySelector("div");
    const doiLink = details?.querySelector('a[href*="doi.org"]');
    if (!details || !doiLink || details.querySelector(".copy-citation-button")) return;

    let actions = details.querySelector(".publication-actions");
    if (!actions) {
      actions = document.createElement("div");
      actions.className = "publication-actions";
      doiLink.insertAdjacentElement("beforebegin", actions);
      actions.appendChild(doiLink);
    }

    const button = document.createElement("button");
    button.className = "copy-citation-button";
    button.type = "button";
    button.textContent = "Copy citation";
    button.setAttribute("aria-label", `Copy citation for ${publication.querySelector("h3")?.textContent.trim() || "publication"}`);
    actions.appendChild(button);
  });
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

document.querySelectorAll("[data-project-filter]").forEach((link) => {
  link.addEventListener("click", () => {
    const requestedFilter = link.dataset.projectFilter;
    const targetButton = filterButtons.find((button) => button.dataset.filter === requestedFilter);
    targetButton?.click();
  });
});

ensureCitationButtons();
applyPublicationFilters();

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
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
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
        const isCurrent = link.getAttribute("href") === `#${visibleEntry.target.id}`;
        link.classList.toggle("is-current", isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-35% 0px -55%", threshold: [0, 0.1, 0.25] }
  );

  sections.forEach((section) => navigationObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
