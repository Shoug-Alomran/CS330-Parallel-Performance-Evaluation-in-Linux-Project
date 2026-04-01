(function () {
  const EMAIL = "inquiry@shoug-tech.com";
  const MAIN_WEBSITE = "https://shoug-tech.com/";
  const NAV_PREF_KEY = "cs330_nav_collapsed";
  const TOC_PREF_KEY = "cs330_toc_collapsed";

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

  function collapsibleViewport() {
    return window.matchMedia("(min-width: 60em)").matches;
  }

  function getPrimarySidebar() {
    return document.querySelector(".md-sidebar--primary[data-md-type='navigation']");
  }

  function getTocSidebar() {
    return document.querySelector(".md-sidebar--secondary[data-md-type='toc']");
  }

  function updateNavToggleButtonState() {
    const btn = document.querySelector("button.nav-collapse-toggle");
    const collapsed = document.body.classList.contains("nav-collapsed");
    if (!btn) return;
    btn.textContent = collapsed ? "Expand Nav" : "Collapse Nav";
    btn.setAttribute("aria-pressed", collapsed ? "true" : "false");
    btn.setAttribute("title", collapsed ? "Expand side navigation" : "Collapse side navigation");
  }

  function updateTocToggleButtonState() {
    const btn = document.querySelector("button.toc-collapse-toggle");
    const collapsed = document.body.classList.contains("toc-collapsed");
    if (!btn) return;
    btn.textContent = collapsed ? "Expand TOC" : "Collapse TOC";
    btn.setAttribute("aria-pressed", collapsed ? "true" : "false");
    btn.setAttribute("title", collapsed ? "Expand table of contents" : "Collapse table of contents");
  }

  function setNavCollapsed(collapsed) {
    const sidebar = getPrimarySidebar();
    if (!sidebar) return;

    if (collapsibleViewport() && collapsed) {
      sidebar.setAttribute("hidden", "");
      document.body.classList.add("nav-collapsed");
    } else {
      if (collapsibleViewport()) sidebar.removeAttribute("hidden");
      document.body.classList.remove("nav-collapsed");
    }

    try {
      localStorage.setItem(NAV_PREF_KEY, collapsed ? "1" : "0");
    } catch (e) { }
    updateNavToggleButtonState();
  }

  function setTocCollapsed(collapsed) {
    const sidebar = getTocSidebar();

    if (sidebar && collapsibleViewport() && collapsed) {
      sidebar.setAttribute("hidden", "");
      document.body.classList.add("toc-collapsed");
    } else {
      if (sidebar && collapsibleViewport()) sidebar.removeAttribute("hidden");
      document.body.classList.remove("toc-collapsed");
    }

    try {
      localStorage.setItem(TOC_PREF_KEY, collapsed ? "1" : "0");
    } catch (e) { }
    updateTocToggleButtonState();
  }

  function addNavCollapseToggle() {
    const headerInner = document.querySelector(".md-header__inner");
    if (!headerInner) return;
    if (headerInner.querySelector("button.nav-collapse-toggle")) return;

    const btn = document.createElement("button");
    btn.className = "nav-collapse-toggle";
    btn.type = "button";
    btn.setAttribute("aria-label", "Toggle side navigation");
    btn.addEventListener("click", function () {
      const collapsed = !document.body.classList.contains("nav-collapsed");
      setNavCollapsed(collapsed);
    });

    headerInner.appendChild(btn);
    updateNavToggleButtonState();
  }

  function addTocCollapseToggle() {
    const headerInner = document.querySelector(".md-header__inner");
    if (!headerInner) return;
    if (headerInner.querySelector("button.toc-collapse-toggle")) return;

    const btn = document.createElement("button");
    btn.className = "toc-collapse-toggle";
    btn.type = "button";
    btn.setAttribute("aria-label", "Toggle table of contents");
    btn.addEventListener("click", function () {
      const collapsed = !document.body.classList.contains("toc-collapsed");
      setTocCollapsed(collapsed);
    });

    headerInner.appendChild(btn);
    updateTocToggleButtonState();
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
          <div class="custom-footer__brand">CS330 Operating Systems Project</div>
          <div class="custom-footer__title">System Updates Channel</div>

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
            <a class="footer-link" href="${url("Project-Overview/overview/")}">Project Overview</a>
            <a class="footer-link" href="${url("Project-Overview/requirements/")}">Requirements</a>
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
            <a class="footer-link" href="${url("Phase-1/report/")}">Phase 1 Report</a>
            <a class="footer-link" href="${url("Phase-2/report/")}">Phase 2 Report</a>
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

  function replaceFooterGenerator() {
    const copyright = document.querySelector(".md-copyright");
    if (!copyright) return;

    const highlight = copyright.querySelector(".md-copyright__highlight");
    if (!highlight || !highlight.parentNode) return;

    while (highlight.nextSibling) {
      highlight.parentNode.removeChild(highlight.nextSibling);
    }

    const wrapper = document.createElement("div");
    wrapper.className = "md-copyright__madeby";

    const text = document.createTextNode("Made by ");
    const link = document.createElement("a");
    link.href = "https://blueprint.shoug-tech.com/";
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Blueprint";

    wrapper.appendChild(text);
    wrapper.appendChild(link);
    highlight.parentNode.appendChild(wrapper);
  }

  function run() {
    addHeaderCTA();
    addNavCollapseToggle();
    addTocCollapseToggle();
    addFooterBlock();
    replaceFooterGenerator();

    let collapsed = false;
    try {
      collapsed = localStorage.getItem(NAV_PREF_KEY) === "1";
    } catch (e) { }
    setNavCollapsed(collapsed);

    let tocCollapsed = false;
    try {
      tocCollapsed = localStorage.getItem(TOC_PREF_KEY) === "1";
    } catch (e) { }
    setTocCollapsed(tocCollapsed);
  }

  function handleResize() {
    const sidebar = getPrimarySidebar();
    const tocSidebar = getTocSidebar();
    if (!sidebar) return;
    if (!collapsibleViewport()) {
      sidebar.removeAttribute("hidden");
      if (tocSidebar) tocSidebar.removeAttribute("hidden");
      document.body.classList.remove("nav-collapsed");
      document.body.classList.remove("toc-collapsed");
      updateNavToggleButtonState();
      updateTocToggleButtonState();
      return;
    }
    let collapsed = false;
    try {
      collapsed = localStorage.getItem(NAV_PREF_KEY) === "1";
    } catch (e) { }
    setNavCollapsed(collapsed);

    let tocCollapsed = false;
    try {
      tocCollapsed = localStorage.getItem(TOC_PREF_KEY) === "1";
    } catch (e) { }
    setTocCollapsed(tocCollapsed);
  }

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
  window.addEventListener("resize", handleResize);
})();
