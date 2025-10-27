import { on, $$ } from '../core/nano-ui.js';

export function createFilters(selector, filterSignal) {
  const container = document.querySelector(selector);

  const filters = [
    { value: 'all', label: 'Todas' },
    { value: 'active', label: 'Activas' },
    { value: 'completed', label: 'Completadas' }
  ];

  container.innerHTML = `
    <div class="filters">
      ${filters.map(f => `
        <button 
          class="filter-btn ${f.value === 'all' ? 'active' : ''}" 
          data-filter="${f.value}"
        >
          ${f.label}
        </button>
      `).join('')}
    </div>
  `;

  $$('.filter-btn').forEach(btn => {
    on(btn, 'click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterSignal.value = btn.dataset.filter;
    });
  });
}