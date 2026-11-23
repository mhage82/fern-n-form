(() => {
  document.querySelectorAll('.project-gallery').forEach(gallery => {
    const choices = [...gallery.querySelectorAll('.project-choice')];
    const feature = gallery.querySelector('.project-feature');
    choices.forEach(button => button.addEventListener('click', () => {
      feature.querySelector('img').src = button.dataset.preview;
      feature.querySelector('img').alt = button.dataset.alt;
      feature.querySelector('figcaption').textContent = button.dataset.caption;
      choices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
    }));
  });
})();
