(() => {
  document.querySelectorAll('.project-gallery').forEach(gallery => {
    const choices = [...gallery.querySelectorAll('.project-choice')];
    const feature = gallery.querySelector('.project-feature');
    const viewer = gallery.querySelector('.planting-viewer');
    if (viewer) {
      feature.querySelector('.project-open').addEventListener('click', () => {
        const selected = choices.find(choice => choice.getAttribute('aria-pressed') === 'true');
        if (!selected) return;
        const image = viewer.querySelector('img');
        image.src = selected.dataset.image || selected.dataset.preview;
        image.alt = selected.dataset.alt;
        viewer.querySelector('p').textContent = selected.dataset.caption + (selected.dataset.captionDetail ? '\n' + selected.dataset.captionDetail : '');
        viewer.showModal();
      });
      const zoom = viewer.querySelector('.planting-viewer-zoom');
      if (zoom) {
        zoom.addEventListener('click', () => {
          const active = viewer.toggleAttribute('data-zoomed');
          zoom.setAttribute('aria-pressed', String(active));
          zoom.textContent = active ? 'Zoom out' : 'Zoom in';
        });
        viewer.addEventListener('close', () => {
          viewer.removeAttribute('data-zoomed');
          zoom.setAttribute('aria-pressed', 'false');
          zoom.textContent = 'Zoom in';
          viewer.scrollTop = viewer.scrollLeft = 0;
        });
      }
      viewer.addEventListener('click', event => {
        if (event.target === viewer) viewer.close();
      });
    }
    const strip = gallery.querySelector('#planting-thumbnails');
    if (strip) {
      const previous = gallery.querySelector('[data-scroll-previous]');
      const next = gallery.querySelector('[data-scroll-next]');
      const updateArrows = () => {
        previous.disabled = strip.scrollLeft <= 1;
        next.disabled = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 1;
      };
      previous.addEventListener('click', () => strip.scrollBy({left: -98, behavior: 'smooth'}));
      next.addEventListener('click', () => strip.scrollBy({left: 98, behavior: 'smooth'}));
      strip.addEventListener('scroll', updateArrows, {passive: true});
      window.addEventListener('resize', updateArrows);
      updateArrows();
    }
    choices.forEach(button => button.addEventListener('click', () => {
      feature.querySelector('img').src = button.dataset.preview;
      feature.querySelector('img').alt = button.dataset.alt;
      const caption = feature.querySelector('figcaption');
      caption.textContent = button.dataset.caption;
      if (button.dataset.captionDetail) {
        const title = document.createElement('strong');
        const detail = document.createElement('em');
        title.textContent = button.dataset.caption;
        detail.textContent = button.dataset.captionDetail;
        caption.replaceChildren(title, document.createElement('br'), detail);
      }
      choices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
    }));
  });
})();
