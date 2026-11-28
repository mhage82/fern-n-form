(() => {
  const section = document.querySelector('#portfolio');
  if (!section) return;
  const filters = [...section.querySelectorAll('[data-portfolio-filter]')];
  const projects = [...section.querySelectorAll('[data-portfolio-project]')];
  filters.forEach(filter => filter.addEventListener('click', () => {
    const category = filter.dataset.portfolioFilter;
    filters.forEach(button => button.setAttribute('aria-pressed', String(button === filter)));
    projects.forEach(project => {
      project.hidden = category !== 'all' && !project.dataset.categories.split(' ').includes(category);
    });
  }));

  const viewer = section.querySelector('.portfolio-viewer');
  const image = viewer.querySelector('img');
  const caption = viewer.querySelector('p');
  section.querySelectorAll('[data-portfolio-image]').forEach(button => button.addEventListener('click', () => {
    image.src = button.dataset.portfolioImage;
    image.alt = button.dataset.imageAlt;
    caption.textContent = button.dataset.imageCaption;
    viewer.showModal();
  }));
  viewer.querySelector('button').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => {
    if (event.target === viewer) viewer.close();
  });
})();
