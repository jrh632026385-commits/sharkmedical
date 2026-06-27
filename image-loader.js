(function () {
  const PLACEHOLDER =
    'data:image/svg+xml,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="4" height="3"><rect width="4" height="3" fill="#0b1422"/></svg>'
    );

  function promote(img) {
    const src = img.getAttribute('data-src');
    if (!src || img.dataset.lazyLoaded === '1') return;
    img.dataset.lazyLoaded = '1';
    img.src = src;
  }

  function observeLazyImages(root) {
    const scope = root || document;
    const imgs = [...scope.querySelectorAll('img[data-src]')];
    if (!imgs.length) return;

    if (!('IntersectionObserver' in window)) {
      imgs.forEach(promote);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            promote(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '180px 0px', threshold: 0.01 }
    );

    imgs.forEach((img) => {
      if (!img.getAttribute('src')) img.src = PLACEHOLDER;
      io.observe(img);
    });
  }

  window.sharkLazyLoadImages = observeLazyImages;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => observeLazyImages(document));
  } else {
    observeLazyImages(document);
  }
})();
