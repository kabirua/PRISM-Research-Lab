/* Shared rendering: change content in data.js, rather than editing each page. */
(() => {
  'use strict';
  const data = window.LAB_DATA;
  const page = document.body.dataset.page || 'home';
  const el = (tag, cls, value) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (value !== undefined) node.textContent = value;
    return node;
  };
  function safeUrl(value) {
    if (!value) return '';
    try {
      const url = new URL(value, location.href);
      return ['http:', 'https:', 'file:', 'mailto:'].includes(url.protocol) ? value : '';
    } catch { return ''; }
  }
  function imageBox(cls, item, fallback, alt) {
    const box = el('div', cls);
    const text = el('span', '', fallback || '');
    text.setAttribute('aria-hidden', 'true');
    box.append(text);
    if (safeUrl(item.image)) {
      const img = el('img');
      img.alt = alt || '';
      img.loading = 'lazy';
      img.addEventListener('error', () => { img.remove(); text.hidden = false; });
      text.hidden = true;
      img.src = item.image;
      box.append(img);
    }
    return box;
  }
function addLink(parent, item) {
  const links = Array.isArray(item.links)
    ? item.links
    : [{ url: item.url, linkText: item.linkText }];

  const container = el('div', 'profile-links');
  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';
  container.style.gap = '12px';

  links.forEach(link => {
    let url = safeUrl(link.url);
    if (!url) return;

    if (page !== 'home' && url.startsWith('#')) {
      url = 'index.html' + url;
    }

    const a = el('a', '', link.linkText || 'Learn more →');
    a.href = url;
    container.append(a);
  });

  if (container.childElementCount) parent.append(container);
}
  function card(item, type) {
    const article = el('article', type === 'research' ? 'publication' : type === 'areas' ? 'research-item' : 'card');
    if (type === 'news') {
      if (/^\d{4}-\d{2}-\d{2}$/.test(item.date || '')) {
        const time = el('time', '', new Date(item.date + 'T12:00:00Z').toLocaleDateString('en-US', { timeZone:'UTC', year:'numeric', month:'short', day:'numeric' }));
        time.dateTime = item.date; article.append(time);
      }
      article.className = 'news-entry';
      article.append(el('strong', '', item.title), el('p', '', item.description));
      addLink(article, item); return article;
    }
    let body = article;
    if (type === 'projects') {
      article.append(imageBox('card-art ' + (item.color || 'sky'), item, item.icon, item.title));
      body = el('div', 'card-body'); article.append(body);
    } else if (type === 'resources') {
      article.classList.add('resource-card');
      article.append(imageBox('icon', item, item.icon, ''));
    } else if (type === 'areas') {
      article.append(imageBox('research-icon', item, item.icon, ''));
    } else if (type === 'people') {
      article.classList.add('card-body');
      article.append(imageBox('person-avatar', item, item.initials, item.name));
    } else if (item.image) {
      article.append(imageBox('publication-image', item, '', item.title));
    }
    body.append(el('h3', '', item.name || item.title));
    if (type === 'people') body.append(el('div', 'person-role', item.role));
    body.append(el('p', '', item.description));
    if (type === 'people' && item.group === 'Alumni') {
      if (item.year) body.append(el('p', '', 'Year: ' + item.year));
      if (item.position) body.append(el('p', '', 'Current position: ' + item.position));
    }
    addLink(body, item);
    return article;
  }
  for (const key of ['news', 'areas', 'projects', 'resources', 'people', 'research']) {
    const target = document.getElementById(key + '-list');
    if (!target) continue;
    let items = [...(data[key] || [])];
    if (key === 'news') items.sort((a,b) => (b.date || '').localeCompare(a.date || ''));
    if (page === 'home') {
      if (key === 'people') items = items.filter(item => item.group !== 'Alumni');
      if (key !== 'areas') items = items.slice(0, data.limits[key] ?? 3);
    }
    if (key === 'people' && page === 'people') {
      const groups = [...new Set(['Principal Investigator', 'Current Students', 'Researchers & Collaborators', ...items.map(item => item.group || 'Researchers & Collaborators'), 'Alumni'])];
      for (const group of groups) {
        const section = el('div', 'people-group');
        const heading = el('h2', '', group);
        if (group === 'Alumni') heading.id = 'alumni';
        section.append(heading);
        const members = items.filter(item => (item.group || 'Researchers & Collaborators') === group);
        if (members.length) {
          const grid = el('div', 'grid grid-three');
          members.forEach(item => grid.append(card(item, key))); section.append(grid);
        } else section.append(el('p', 'empty-state', group === 'Alumni' ? 'Alumni profiles will be added here.' : 'Profiles will be added here.'));
        target.append(section);
      }
    } else {
      items.forEach(item => target.append(card(item, key)));
      if (!items.length) target.append(el('p', 'empty-state', 'Updates will be added here.'));
    }
  }
  const funders = document.getElementById('funder-list');
  if (funders) (data.funders || []).filter(item => item.enabled).forEach(item => {
    const box = el('div', 'funder');
    const a = el('a'); a.href = safeUrl(item.url) || '#';
    a.append(imageBox('', item, item.name, item.name));
    box.append(a);
    if (item.description) box.append(el('small', '', item.description));
    funders.append(box);
  });
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const menu = document.querySelector('.mobile-menu');
  document.querySelectorAll('.mobile-links a').forEach(a => a.addEventListener('click', () => { menu.open = false; }));
})();
