document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('./project-links.json');
    if (!res.ok) throw new Error('Failed to load project-links.json');
    const links = await res.json();

    document.querySelectorAll('[data-project]').forEach(el => {
      const key = el.dataset.project;
      const url = links[key];
      if (!url) return;

      el.style.cursor = 'pointer';
      el.setAttribute('role', 'link');
      el.setAttribute('tabindex', '0');

      el.addEventListener('click', (e) => {
        // If the user clicked an inner anchor (github / external), let it behave normally
        if (e.target.closest('a')) return;
        window.open(url, '_blank', 'noopener');
      });

      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          window.open(url, '_blank', 'noopener');
          e.preventDefault();
        }
      });
    });
  } catch (err) {
    console.error('Error loading project links', err);
  }
});
