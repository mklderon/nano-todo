export function createNavbar(selector) {
  const nav = document.querySelector(selector);

  nav.innerHTML = `
    <span class="logo">📝 Nano ToDo</span>
    <a href="/" class="active">Inicio</a>
    <a href="/stats">Estadísticas</a>
    <a href="/about">Acerca de</a>
  `;
}
