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
