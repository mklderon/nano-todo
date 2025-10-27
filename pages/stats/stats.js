import { signal, computed, bindText, bindHTML } from '../../core/nano-ui.js';
import { storage } from '../../core/storage.js';

export const statsPage = {
  html: './pages/stats/stats.html',

  init(container) {
    const todos = signal(storage.get('todos', []));

    // Computados
    const totalTasks = computed(() => todos.value.length);
    const completedTasks = computed(() =>
      todos.value.filter(t => t.completed).length
    );
    const activeTasks = computed(() =>
      todos.value.filter(t => !t.completed).length
    );
    const completionRate = computed(() => {
      const total = totalTasks.value;
      if (total === 0) return 0;
      return Math.round((completedTasks.value / total) * 100);
    });

    // Bind stats
    bindText('#total-tasks', totalTasks);
    bindText('#completed-tasks', completedTasks);
    bindText('#active-tasks', activeTasks);

    // Progress bar - SOLO width inline, el resto lo maneja CSS
    bindHTML('#progress', computed(() => {
      const rate = completionRate.value;
      // si rate === 100 aplicamos la clase 'full' para redondear ambos lados
      const fullClass = rate === 100 ? ' progress-fill full' : ' progress-fill';
      // el elemento .progress-percentage está fuera del fill para que siempre se vea centrado
      return `<div class="${fullClass.trim()}" style="width: ${rate}%"></div>
          <div class="progress-percentage">${rate}%</div>`;
    }));


    // Actividad reciente
    bindHTML('#recent-activity', computed(() => {
      const recent = todos.value.slice(-5).reverse();
      if (recent.length === 0) {
        return '<p style="text-align: center; color: #999;">No hay actividad reciente</p>';
      }

      return `
        <h2>Actividad Reciente</h2>
        <ul style="list-style: none; padding: 0;">
          ${recent.map(todo => `
            <li style="padding: 12px; background: #f9f9f9; margin-bottom: 8px; border-radius: 8px;">
              <strong>${todo.title}</strong>
              <span style="color: ${todo.completed ? '#4CAF50' : '#ff9800'}; margin-left: 8px;">
                ${todo.completed ? '✓ Completada' : '⏳ Pendiente'}
              </span>
            </li>
          `).join('')}
        </ul>
      `;
    }));

    return () => {
      console.log('Limpiando stats page...');
    };
  }
};
