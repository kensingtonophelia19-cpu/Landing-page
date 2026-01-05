document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('./project-links.json');
    if (!res.ok) throw new Error('Failed to load project-links.json');
    const links = await res.json();

    // Update external link buttons with live demo URLs from JSON
    document.querySelectorAll('[data-project]').forEach(el => {
      const key = el.dataset.project;
      const projectData = links[key];
      if (!projectData) return;

      // Find the external link button (second anchor in the card)
      const externalLink = el.querySelector('.project-actions a:last-child');
      if (externalLink && projectData.liveDemo) {
        externalLink.href = projectData.liveDemo;
        externalLink.style.display = 'inline-block';
      } else if (externalLink && !projectData.liveDemo) {
        // Hide external link if no live demo URL is provided
        externalLink.style.display = 'none';
      }

      // Update GitHub link if provided in JSON
      const githubLink = el.querySelector('.project-actions a:first-child');
      if (githubLink && projectData.github) {
        githubLink.href = projectData.github;
      }

      // Update title link to live demo if available
      const titleLink = el.querySelector('.project-title-link');
      if (titleLink && projectData.liveDemo) {
        titleLink.href = projectData.liveDemo;
      } else if (titleLink && !projectData.liveDemo) {
        titleLink.style.pointerEvents = 'none';
        titleLink.style.cursor = 'default';
      }
    });
  } catch (err) {
    console.error('Error loading project links', err);
  }
});