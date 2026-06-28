/*
 * Interactive member-profile feature.
 * Finds member cards on the Team page (matched against TEAM_PROFILES by
 * name), makes them clickable/keyboard-accessible, and opens a themed
 * detail panel reusing this site's existing surface/border/shadow tokens.
 */
(function () {
  var MODAL_ID = "member-profile-modal";
  var lastTrigger = null;
  var keydownHandler = null;

  var ICONS = {
    github:
      '<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M14.82 0H1.18C.53 0 0 .53 0 1.18v13.64C0 15.47.53 16 1.18 16h13.64c.65 0 1.18-.53 1.18-1.18V1.18C16 .53 15.47 0 14.82 0zM4.76 13.64H2.38V6.13h2.38v7.51zM3.57 5.1a1.38 1.38 0 1 1 0-2.76 1.38 1.38 0 0 1 0 2.76zm10.07 8.54h-2.38V9.99c0-.95-.34-1.6-1.19-1.6-.65 0-1.04.44-1.21.86-.06.15-.08.36-.08.58v3.81H6.4s.03-6.18 0-6.82h2.38v.97c.32-.49.88-1.18 2.15-1.18 1.57 0 2.71 1.02 2.71 3.22v3.81z"/></svg>',
    portfolio:
      '<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M6 1a1 1 0 0 0-1 1v1H2.5A1.5 1.5 0 0 0 1 4.5v2.59c.41.2.87.32 1.36.4C3.66 7.7 5.6 8 8 8s4.34-.3 5.64-.51c.49-.08.95-.2 1.36-.4V4.5A1.5 1.5 0 0 0 13.5 3H11V2a1 1 0 0 0-1-1H6zm0 1.5h4V3H6v-.5zM1 8.94v3.56A1.5 1.5 0 0 0 2.5 14h11a1.5 1.5 0 0 0 1.5-1.5V8.94c-.34.13-.7.24-1.07.32C12.5 9.49 10.45 9.5 8 9.5s-4.5-.01-5.93-.24A6.93 6.93 0 0 1 1 8.94z"/></svg>',
    email:
      '<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M1.5 3A1.5 1.5 0 0 0 0 4.5v7A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 14.5 3h-13zm0 1h13c.08 0 .15.01.22.03L8 9.18 1.28 4.03A.66.66 0 0 1 1.5 4zM1 5.02l6.65 5.17a.55.55 0 0 0 .7 0L15 5.02V11.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V5.02z"/></svg>'
  };

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, function (c) {
      return (
        { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        c
        ] || c
      );
    });
  }

  function placeholder(text) {
    return '<span class="member-profile__placeholder">' + escapeHtml(text) + "</span>";
  }

  function buildLinkRow(profile) {
    var links = profile.links || {};
    var entries = [
      { key: "github", label: "GitHub", href: links.github },
      { key: "linkedin", label: "LinkedIn", href: links.linkedin },
      { key: "portfolio", label: "Portfolio", href: links.portfolio },
      {
        key: "email",
        label: "Email",
        href: links.email ? "mailto:" + links.email : ""
      }
    ];

    var hasAny = entries.some(function (e) {
      return !!e.href;
    });

    if (!hasAny) {
      return placeholder("No public links provided yet.");
    }

    return entries
      .filter(function (e) {
        return !!e.href;
      })
      .map(function (e) {
        return (
          '<a class="member-profile__link" href="' +
          escapeHtml(e.href) +
          '" target="_blank" rel="noopener">' +
          ICONS[e.key] +
          "<span>" +
          e.label +
          "</span></a>"
        );
      })
      .join("");
  }

  function buildList(items, emptyText) {
    if (!items || !items.length) {
      return placeholder(emptyText);
    }
    return (
      '<ul class="member-profile__list">' +
      items
        .map(function (item) {
          return "<li>" + escapeHtml(item) + "</li>";
        })
        .join("") +
      "</ul>"
    );
  }

  function ensureModal() {
    var existing = document.getElementById(MODAL_ID);
    if (existing) return existing;

    var overlay = document.createElement("div");
    overlay.id = MODAL_ID;
    overlay.className = "member-profile";
    overlay.hidden = true;
    overlay.innerHTML =
      '<div class="member-profile__overlay" data-mp-close="overlay"></div>' +
      '<div class="member-profile__panel" role="dialog" aria-modal="true" tabindex="-1">' +
      '<button type="button" class="member-profile__close" data-mp-close="button" aria-label="Close profile">&times;</button>' +
      '<div class="member-profile__body"></div>' +
      "</div>";

    document.body.appendChild(overlay);

    overlay.addEventListener("click", function (event) {
      if (event.target && event.target.getAttribute("data-mp-close")) {
        closeModal();
      }
    });

    return overlay;
  }

  function renderProfile(profile) {
    var html =
      '<div class="member-profile__dots"><span></span><span></span><span></span></div>' +
      '<div class="member-profile__header">' +
      '<div class="member-profile__avatar" aria-hidden="true">' +
      escapeHtml(initials(profile.name)) +
      "</div>" +
      '<div class="member-profile__heading">' +
      '<h2 id="member-profile-name" class="member-profile__name">' +
      escapeHtml(profile.name) +
      "</h2>" +
      '<p class="member-profile__role">' +
      escapeHtml(profile.role || "Team Member") +
      "</p>" +
      "</div>" +
      "</div>" +
      '<dl class="member-profile__meta">' +
      "<div><dt>Department / Major</dt><dd>" +
      (profile.department ? escapeHtml(profile.department) : placeholder("Not specified")) +
      "</dd></div>" +
      "<div><dt>Affiliation</dt><dd>" +
      (profile.affiliation ? escapeHtml(profile.affiliation) : placeholder("Not specified")) +
      "</dd></div>" +
      "<div><dt>Student ID</dt><dd>" +
      (profile.studentId ? escapeHtml(profile.studentId) : placeholder("Not specified")) +
      "</dd></div>" +
      "</dl>" +
      '<section class="member-profile__section">' +
      "<h3>Biography</h3>" +
      "<p>" +
      (profile.bio ? escapeHtml(profile.bio) : placeholder("No biography added yet — edit team-profiles-data.js to add one.")) +
      "</p>" +
      "</section>" +
      '<section class="member-profile__section">' +
      "<h3>Project Contributions</h3>" +
      buildList(profile.contributions, "No contributions listed yet.") +
      "</section>" +
      '<section class="member-profile__section">' +
      "<h3>Responsibilities &amp; Deliverables</h3>" +
      buildList(profile.responsibilities, "No responsibilities listed yet.") +
      "</section>" +
      '<section class="member-profile__section">' +
      "<h3>Links</h3>" +
      '<div class="member-profile__links">' +
      buildLinkRow(profile) +
      "</div>" +
      "</section>";

    return html;
  }

  function initials(name) {
    return String(name || "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (part) {
        return part[0];
      })
      .join("")
      .toUpperCase();
  }

  function getFocusable(container) {
    return Array.prototype.slice.call(
      container.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function openModal(profile, triggerEl) {
    var overlay = ensureModal();
    var panel = overlay.querySelector(".member-profile__panel");
    var body = overlay.querySelector(".member-profile__body");

    body.innerHTML = renderProfile(profile);
    panel.setAttribute("aria-labelledby", "member-profile-name");

    lastTrigger = triggerEl || null;
    overlay.hidden = false;
    document.body.classList.add("member-profile-open");

    panel.focus();

    keydownHandler = function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key === "Tab") {
        var focusable = getFocusable(panel);
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", keydownHandler, true);
  }

  function closeModal() {
    var overlay = document.getElementById(MODAL_ID);
    if (!overlay || overlay.hidden) return;

    overlay.hidden = true;
    document.body.classList.remove("member-profile-open");

    if (keydownHandler) {
      document.removeEventListener("keydown", keydownHandler, true);
      keydownHandler = null;
    }

    if (lastTrigger && typeof lastTrigger.focus === "function") {
      lastTrigger.focus();
    }
    lastTrigger = null;
  }

  function cardName(li) {
    var strong = li.querySelector("strong");
    return strong ? strong.textContent : "";
  }

  function enhanceCards() {
    if (!window.TEAM_PROFILES) return;

    var cards = document.querySelectorAll(
      ".md-typeset .grid.cards > ul > li, .md-typeset .grid.cards > ol > li"
    );

    cards.forEach(function (li) {
      if (li.hasAttribute("data-mp-bound")) return;

      var name = cardName(li);
      var profile = name ? window.TEAM_PROFILES.get(name) : null;
      if (!profile) return;

      li.setAttribute("data-mp-bound", "true");
      li.classList.add("member-card--clickable");
      li.setAttribute("tabindex", "0");
      li.setAttribute("role", "button");
      li.setAttribute("aria-haspopup", "dialog");
      li.setAttribute("aria-label", "View profile of " + profile.name);

      li.addEventListener("click", function () {
        openModal(profile, li);
      });

      li.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openModal(profile, li);
        }
      });
    });
  }

  function run() {
    enhanceCards();
  }

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();
