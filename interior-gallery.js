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
        viewer.querySelector('p').textContent = selected.dataset.caption;
        viewer.showModal();
      });
      const zoom = viewer.querySelector('.planting-viewer-zoom');
      if (zoom) {
        const resetZoom = () => {
          viewer.removeAttribute('data-zoomed');
          zoom.setAttribute('aria-pressed', 'false');
          zoom.textContent = 'Zoom in';
          viewer.scrollTop = 0;
          viewer.scrollLeft = 0;
        };
        zoom.addEventListener('click', () => {
          const active = viewer.toggleAttribute('data-zoomed');
          zoom.setAttribute('aria-pressed', String(active));
          zoom.textContent = active ? 'Zoom out' : 'Zoom in';
        });
        viewer.addEventListener('close', resetZoom);
      }
      viewer.addEventListener('click', event => {
        if (event.target === viewer) viewer.close();
      });
    }
    choices.forEach(button => button.addEventListener('click', () => {
      feature.querySelector('img').src = button.dataset.preview;
      feature.querySelector('img').alt = button.dataset.alt;
      feature.querySelector('figcaption').textContent = button.dataset.caption;
      choices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
    }));
  });
})();
