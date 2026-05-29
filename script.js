const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const year = document.querySelector("[data-year]");
const topLinks = document.querySelectorAll('a[href="#top"]');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

topLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    nav?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", "#top");
  });
});

window.addEventListener("load", () => {
  if (window.location.hash === "#top") {
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }
});
