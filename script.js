
/* =========================================
   QUEETEEART CONCEPT
   Website interactions and contact handling
========================================= */

// Replace this with your WhatsApp number.
// Use country code and digits only, without +, spaces or dashes.
// Example format for a Nigerian number: 2348012345678
const WHATSAPP_NUMBER = "2349034027239";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const contactForm = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  const serviceSelect = document.getElementById("project-service");
  const floatingWhatsApp = document.getElementById("floating-whatsapp");
  const currentYear = document.getElementById("current-year");

  // Automatic copyright year
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation"
      );

      navLinks.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // Service cards preselect the relevant service in the inquiry form
  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      const requestedService = link.dataset.service;

      if (!serviceSelect) return;

      const matchingOption = Array.from(serviceSelect.options).find(
        (option) => option.value === requestedService ||
          option.textContent.trim() === requestedService
      );

      if (matchingOption) {
        serviceSelect.value = matchingOption.value;
      } else if (
        requestedService === "Graphic Design" ||
        requestedService === "Printing and Production" ||
        requestedService === "Branding and Identity" ||
        requestedService === "Web Development and Digital Services" ||
        requestedService === "Interior and Exterior Design"
      ) {
        serviceSelect.value = requestedService;
      }
    });
  });

  // Configure the floating WhatsApp contact link
  if (floatingWhatsApp) {
    if (
      WHATSAPP_NUMBER &&
      /^\d{8,15}$/.test(WHATSAPP_NUMBER)
    ) {
      floatingWhatsApp.href =
        `https://wa.me/${WHATSAPP_NUMBER}`;
      floatingWhatsApp.target = "_blank";
      floatingWhatsApp.rel = "noopener noreferrer";
    } else {
      floatingWhatsApp.href = "#contact";
    }
  }

  // Prepare a project inquiry for WhatsApp
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      if (
        !WHATSAPP_NUMBER ||
        !/^\d{8,15}$/.test(WHATSAPP_NUMBER)
      ) {
        if (feedback) {
          feedback.textContent =
            "Please configure your WhatsApp number in script.js before using this form.";
        }
        return;
      }

      const formData = new FormData(contactForm);

      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const service = String(formData.get("service") || "").trim();
      const details = String(formData.get("details") || "").trim();

      const message = [
        "Hello QueeTeeArt Concept!",
        "",
        "I would like to make a project inquiry.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Service: ${service}`,
        "",
        "Project details:",
        details,
        "",
        "Please let me know the next steps and quotation."
      ].join("\n");

      const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      if (feedback) {
        feedback.textContent =
          "Opening WhatsApp. Please review your message and send it to submit your inquiry.";
      }

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }
});

