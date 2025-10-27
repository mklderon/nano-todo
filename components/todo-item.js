export function createTodoItem(todo) {
  return `
    <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
      <input 
        type="checkbox" 
        class="toggle"
        data-id="${todo.id}"
        ${todo.completed ? 'checked' : ''}
      />
      <span>${todo.title}</span>
      <button class="delete-btn" data-id="${todo.id}">
        Eliminar
      </button>
    </li>
  `;
}