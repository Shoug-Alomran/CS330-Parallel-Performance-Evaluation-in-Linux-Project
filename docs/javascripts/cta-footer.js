(function () {
  const EMAIL = "inquiry@shoug-tech.com";
  const MAIN_WEBSITE = "https://shoug-tech.com/";

  function getBase() {
    try {
      if (typeof __md_get === "function") {
        return __md_get("__base") || "";
      }
    } catch (e) { }
    return "";
  }

  function url(path) {
    const base = getBase();
    return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
  }

  function addHeaderCTA() {
    const headerInner = document.querySelector(".md-header__inner");
    if (!headerInner) return;
    if (headerInner.querySelector("a.header-cta")) return;

    const cta = document.createElement("a");
    cta.className = "header-cta";
    cta.href = `mailto:${EMAIL}`;
    cta.textContent = "Contact Us";
    cta.setAttribute("aria-label", "Contact Us");

    headerInner.appendChild(cta);
  }

  function addFooterBlock() {
    const footer = document.querySelector(".md-footer");
    if (!footer) return;
    if (footer.querySelector(".custom-footer")) return;

    const meta = footer.querySelector(".md-footer-meta");
    const block = document.createElement("section");
    block.className = "custom-footer";

    block.innerHTML = `
      <div class="custom-footer__inner">
        <div class="custom-footer__left">
          <div class="custom-footer__brand">CS 330</div>
          <div class="custom-footer__title">Get updates in your inbox</div>

          <form class="custom-footer__form" action="mailto:${EMAIL}" method="get">
            <input class="custom-footer__input" type="email" name="email" placeholder="Email address" autocomplete="email">
            <button class="custom-footer__button" type="submit">Subscribe</button>
          </form>

          <div class="custom-footer__note">
            By entering your email, you agree to be contacted regarding this course project.
          </div>
        </div>

        <div class="custom-footer__right">
          <div class="footer-col">
            <div class="footer-col__title">About</div>
            <a class="footer-link" href="${url("Project%20Overview/overview/")}">Project Overview</a>
          </div>

          <div class="footer-col">
            <div class="footer-col__title">Policies</div>
            <a class="footer-link" href="${url("privacy-notice/")}">Privacy Notice</a>
            <a class="footer-link" href="${url("academic-disclaimer/")}">Academic Disclaimer</a>
          </div>

          <div class="footer-col">
            <div class="footer-col__title">Contact</div>
            <a class="footer-link" href="mailto:${EMAIL}">${EMAIL}</a>
          </div>

          <div class="footer-col">
            <div class="footer-col__title">Reports</div>
            <a class="footer-link" href="${url("Phase%201/report.pdf")}">Phase 1 PDF</a>
            <a class="footer-link" href="${url("Phase%202/report.pdf")}">Phase 2 PDF</a>
          </div>

          <div class="footer-col">
            <div class="footer-col__title">Website</div>
            <a class="footer-link" href="${MAIN_WEBSITE}" target="_blank" rel="noopener">
              shoug-tech.com
            </a>
          </div>
        </div>
      </div>
    `;

    if (meta) footer.insertBefore(block, meta);
    else footer.prepend(block);
  }

  function run() {
    addHeaderCTA();
    addFooterBlock();
  }

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();