const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const year = document.querySelector("[data-year]");
const topLinks = document.querySelectorAll('a[href="#top"]');

const scrollToCurrentHash = () => {
  const hash = window.location.hash;

  if (hash === "#top") {
    window.scrollTo(0, 0);
    return;
  }

  if (hash) {
    const target = document.getElementById(hash.slice(1));
    const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;

    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 22;
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;

      root.style.scrollBehavior = "auto";
      window.scrollTo(0, Math.max(0, top));
      root.style.scrollBehavior = previousScrollBehavior;
    }
  }
};

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    }
  });
}

topLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    nav?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation");
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", "#top");
  });
});

requestAnimationFrame(scrollToCurrentHash);

window.addEventListener("load", () => {
  scrollToCurrentHash();
  setTimeout(scrollToCurrentHash, 250);
});
