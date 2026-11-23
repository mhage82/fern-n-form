(() => {
  const viewer = document.querySelector('.interior-viewer');
  if (!viewer || typeof viewer.showModal !== 'function') return;
  const stage = viewer.querySelector('.interior-viewer-stage');
  const image = viewer.querySelector('.interior-viewer-image');
  const caption = viewer.querySelector('#interior-viewer-caption');
  const previous = viewer.querySelector('[data-viewer-prev]');
  const next = viewer.querySelector('[data-viewer-next]');
  const pointers = new Map();
  let scale = 1, x = 0, y = 0, gesture = null, opener = null, activeGallery = null, activeIndex = 0;
  const itemsOf = gallery => [...gallery.querySelectorAll('.project-choice, .project-item')];

  function render() { image.style.transform = `translate(${x}px, ${y}px) scale(${scale})`; }
  function reset() { scale = 1; x = 0; y = 0; render(); }
  function zoom(factor) { scale = Math.max(1, Math.min(5, scale * factor)); if (scale === 1) { x = 0; y = 0; } render(); }
  function select(gallery, index) {
    const items = itemsOf(gallery);
    const item = items[index];
    const feature = gallery.querySelector('.project-feature');
    feature.querySelector('img').src = item.dataset.preview;
    feature.querySelector('img').alt = item.dataset.alt;
    feature.querySelector('figcaption').textContent = item.dataset.caption;
    feature.querySelector('.project-open').setAttribute('aria-label', `Enlarge ${item.dataset.caption}`);
    items.forEach((choice, i) => { if (choice.matches('button')) choice.setAttribute('aria-pressed', String(i === index)); });
    gallery.dataset.selected = String(index);
  }
  function showViewer(index) {
    const items = itemsOf(activeGallery);
    activeIndex = (index + items.length) % items.length;
    const item = items[activeIndex];
    select(activeGallery, activeIndex);
    image.src = item.dataset.image;
    image.alt = item.dataset.alt;
    caption.textContent = item.dataset.caption;
    previous.disabled = next.disabled = items.length < 2;
    reset();
  }
  function startGesture() {
    const points = [...pointers.values()];
    if (points.length === 1) gesture = { x: points[0].x, y: points[0].y, originX: x, originY: y };
    else if (points.length >= 2) {
      const [a, b] = points;
      gesture = { distance: Math.hypot(b.x - a.x, b.y - a.y), midX: (a.x + b.x) / 2, midY: (a.y + b.y) / 2, scale, originX: x, originY: y };
    } else gesture = null;
  }
  document.querySelectorAll('.project-gallery').forEach(gallery => {
    gallery.querySelectorAll('.project-choice').forEach((button, index) => button.addEventListener('click', () => select(gallery, index)));
    gallery.querySelector('.project-open').addEventListener('click', event => {
      opener = event.currentTarget;
      activeGallery = gallery;
      showViewer(Number(gallery.dataset.selected || 0));
      viewer.showModal();
      viewer.querySelector('[data-viewer-close]').focus();
    });
  });
  viewer.querySelector('[data-viewer-close]').addEventListener('click', () => viewer.close());
  previous.addEventListener('click', () => showViewer(activeIndex - 1));
  next.addEventListener('click', () => showViewer(activeIndex + 1));
  viewer.querySelector('[data-viewer-zoom-in]').addEventListener('click', () => zoom(1.35));
  viewer.querySelector('[data-viewer-zoom-out]').addEventListener('click', () => zoom(1 / 1.35));
  viewer.querySelector('[data-viewer-reset]').addEventListener('click', reset);
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && !previous.disabled) { event.preventDefault(); showViewer(activeIndex - 1); }
    else if (event.key === 'ArrowRight' && !next.disabled) { event.preventDefault(); showViewer(activeIndex + 1); }
    else if (event.key === '+' || event.key === '=') { event.preventDefault(); zoom(1.35); }
    else if (event.key === '-') { event.preventDefault(); zoom(1 / 1.35); }
  });
  viewer.addEventListener('close', () => { pointers.clear(); gesture = null; if (opener) opener.focus(); });
  stage.addEventListener('pointerdown', event => { if (event.pointerType === 'mouse' && event.button !== 0) return; stage.setPointerCapture(event.pointerId); pointers.set(event.pointerId, { x: event.clientX, y: event.clientY }); startGesture(); });
  stage.addEventListener('pointermove', event => {
    if (!pointers.has(event.pointerId) || !gesture) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const points = [...pointers.values()];
    if (points.length === 1 && scale > 1) { x = gesture.originX + points[0].x - gesture.x; y = gesture.originY + points[0].y - gesture.y; }
    else if (points.length >= 2 && gesture.distance) {
      const [a, b] = points;
      scale = Math.max(1, Math.min(5, gesture.scale * Math.hypot(b.x - a.x, b.y - a.y) / gesture.distance));
      x = gesture.originX + (a.x + b.x) / 2 - gesture.midX;
      y = gesture.originY + (a.y + b.y) / 2 - gesture.midY;
      if (scale === 1) { x = 0; y = 0; }
    }
    render();
  });
  function endPointer(event) { pointers.delete(event.pointerId); startGesture(); }
  stage.addEventListener('pointerup', endPointer);
  stage.addEventListener('pointercancel', endPointer);
  stage.addEventListener('wheel', event => { event.preventDefault(); zoom(event.deltaY < 0 ? 1.15 : 1 / 1.15); }, { passive: false });
})();
