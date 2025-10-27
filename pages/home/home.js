import { signal, computed, bindText, bindHTML, on, onDelegate, $, effect } from '../../core/nano-ui.js';
import { storage } from '../../core/storage.js';
import { createTodoItem } from '../../components/todo-item.js';
import { createFilters } from '../../components/todo-filters.js';

export const homePage = {
  html: './pages/home/home.html',

  init(container) {
    // Cargar datos desde localStorage
    const savedTodos = storage.get('todos', []);
    const todos = signal(savedTodos);
    const filter = signal('all');

    // Guardar automáticamente cuando cambian los todos
    effect(() => {
      storage.set('todos', todos.value);
    });

    // Computados
    const filteredTodos = computed(() => {
      const f = filter.value;
      const all = todos.value;
      if (f === 'active') return all.filter(t => !t.completed);
      if (f === 'completed') return all.filter(t => t.completed);
      return all;
    });

    const activeCount = computed(() =>
      todos.value.filter(t => !t.completed).length
    );

    const statsText = computed(() => {
      const count = activeCount.value;
      const total = todos.value.length;

      if (total === 0) {
        return '¡No hay tareas! Agrega una nueva tarea para comenzar 🎉';
      }

      if (count === 0) {
        return `¡Felicidades! Completaste todas tus ${total} ${total === 1 ? 'tarea' : 'tareas'} 🎊`;
      }
      
      return `${count} de ${total} ${total === 1 ? 'tarea pendiente' : 'tareas pendientes'}`;
    });

    // Renderizado
    const renderList = computed(() => {
      const items = filteredTodos.value;
      if (items.length === 0) {
        return `
          <div class="empty-state">
            <div class="icon">📭</div>
            <p>No hay tareas ${filter.value === 'all' ? '' : filter.value === 'active' ? 'activas' : 'completadas'}</p>
          </div>
        `;
      }
      return items.map(todo => createTodoItem(todo)).join('');
    });

    bindText('#stats', statsText);
    bindHTML('#todo-list', renderList);

    // Componente de filtros
    createFilters('#todo-filters', filter);

    // Eventos
    on('#add-todo', 'click', () => {
      const input = $('#new-todo');
      const title = input.value.trim();

      if (title) {
        todos.value = [...todos.value, {
          id: Date.now(),
          title,
          completed: false,
          createdAt: new Date().toISOString()
        }];
        input.value = '';
        input.focus();
      }
    });

    on('#new-todo', 'keyup', e => {
      if (e.key === 'Enter') $('#add-todo').click();
    });

    // Event delegation
    onDelegate('#todo-list', 'click', '.toggle', (e, el) => {
      const id = +el.dataset.id;
      todos.value = todos.value.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
    });

    onDelegate('#todo-list', 'click', '.delete-btn', (e, el) => {
      const id = +el.dataset.id;
      if (confirm('¿Eliminar esta tarea?')) {
        todos.value = todos.value.filter(t => t.id !== id);
      }
    });

    onDelegate('#todo-list', 'dblclick', '.todo-item', (e, el) => {
      const id = +el.dataset.id;

      if (isNaN(id)) {
        console.warn('ID inválido en doble clic:', el);
        return;
      }

      // 🔍 Buscar la tarea por ID
      const todo = todos.value.find(t => t.id === id);

      // ❌ Si no existe o ya está completada, no permitir edición
      if (!todo || todo.completed) {
        alert('No se pueden editar tareas completadas.');
        return;
      }

      const newTitle = prompt('Editar tarea:', todo.title);
      if (newTitle !== null && newTitle.trim() !== '') {
        todos.value = todos.value.map(t =>
          t.id === id ? { ...t, title: newTitle.trim() } : t
        );
      }
    });

    // Focus inicial
    setTimeout(() => $('#new-todo')?.focus(), 100);

    // Cleanup
    return () => {
      console.log('Limpiando home page...');
    };
  }
};
