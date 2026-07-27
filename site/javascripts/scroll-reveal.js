(function () {
  function init() {
    var targets = document.querySelectorAll(
      '.md-typeset .grid.cards > ul > li, ' +
      '.md-typeset .grid.cards > ol > li, ' +
      '.md-typeset > table, ' +
      '.md-typeset > blockquote, ' +
      '.md-typeset > .admonition'
    );

    targets.forEach(function (el) {
      el.classList.add('os-reveal');
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) {
        el.classList.add('os-reveal--visible');
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('os-reveal--visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach(function (el) {
      io.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  if (typeof document$ !== 'undefined' && document$.subscribe) {
    document$.subscribe(init);
  }
})();
