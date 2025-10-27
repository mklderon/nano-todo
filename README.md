# **Nano ToDo**

---

## **📌 Descripción**
**Nano ToDo** es una aplicación de gestión de tareas construida con un **Nano-Signals mini-framework reactivo personalizado**, sin dependencias externas. Demuestra cómo crear aplicaciones web modernas utilizando **JavaScript vanilla**, **nano-signals para la reactividad**, **nano-router para el enrutamiento SPA**, y **persistencia en localStorage**.

---

## **✨ Características**
- **Reactividad**: Sistema de signals para actualizaciones automáticas del DOM.
- **Routing**: Navegación entre páginas sin recargar la página.
- **Persistencia**: Los datos se guardan automáticamente en `localStorage`.
- **Componentes**: Arquitectura modular y reutilizable.
- **Sin dependencias**: Solo JavaScript ES6+ y APIs nativas del navegador.

---

## **🏗️ Arquitectura**
```
nano-todo/
├── index.html
├── app.js
├── core/
│   ├── nano-router.js
│   ├── nano-signals.js
│   ├── nano-ui.js
│   └── storage.js
├── pages/
│   ├── home/
│   │   ├── home.html
│   │   └── home.js
│   ├── stats/
│   │   ├── stats.html
│   │   └── stats.js
│   └── about/
│       ├── about.html
│       └── about.js
└── components/
    ├── navbar.js
    ├── todo-filters.js
    └── todo-item.js
```

---

## **📦 Componentes Principales**

### **1. Core**
- **`nano-router.js`**: Enrutador minimalista para SPA.
- **`nano-signals.js`**: Sistema de reactividad basado en signals.
- **`nano-ui.js`**: Utilidades para manipulación reactiva del DOM.
- **`storage.js`**: Manejo de `localStorage` para persistencia de datos.

### **2. Páginas**
- **Home**: Lista de tareas, filtros y estadísticas básicas.
- **Stats**: Estadísticas detalladas y progreso de tareas.
- **About**: Información sobre la aplicación.

### **3. Componentes Reutilizables**
- **Navbar**: Barra de navegación.
- **TodoItem**: Elemento individual de una tarea.
- **TodoFilters**: Filtros para tareas (todas, activas, completadas).

---

## **🚀 Tecnologías Utilizadas**
- **JavaScript ES6+ Modules**
- **Sistema reactivo con Signals**
- **HTML5 & CSS3**
- **localStorage API**

---

## **📱 Funcionalidades**
- **Agregar tareas**: Escribe y añade nuevas tareas.
- **Marcar como completadas**: Haz clic en el checkbox para marcar una tarea.
- **Editar tareas**: Haz doble clic en una tarea para editarla.
- **Eliminar tareas**: Elimina tareas con el botón "Eliminar".
- **Filtrar tareas**: Filtra tareas por estado (todas, activas, completadas).
- **Estadísticas**: Visualiza el progreso y actividad reciente.

---

## **📂 Instalación y Uso**
1. **Clona el repositorio** o descarga los archivos.
2. **Abre `index.html`** en tu navegador.
3. **¡Listo!** La aplicación cargará automáticamente.

---

## **🎯 Ejemplo de Uso**
```javascript
// app.js
import { Router } from './core/nano-router.js';
import { homePage } from './pages/home/home.js';
import { statsPage } from './pages/stats/stats.js';
import { aboutPage } from './pages/about/about.js';
import { createNavbar } from './components/navbar.js';

// Crear navbar
createNavbar('#navbar');

// Inicializar router
const router = new Router('#app');

// Registrar rutas
router.register('/', homePage);
router.register('/stats', statsPage);
router.register('/about', aboutPage);

// Iniciar aplicación
router.init();
```

---

## **📊 Capturas de Pantalla**

<img width="827" height="647" alt="image" src="https://github.com/user-attachments/assets/34e597f4-81a9-4f8c-86ee-38a461de7ffa" />

<img width="823" height="749" alt="image" src="https://github.com/user-attachments/assets/61267ebe-74f2-4fcf-9d02-6ab6a46c939f" />

<img width="828" height="753" alt="image" src="https://github.com/user-attachments/assets/4cede8e2-121d-4eba-b21e-4faebfba1785" />


---

## **🔧 Posibles Mejoras**
- Añadir soporte para **arrastrar y soltar** tareas.
- Implementar **sincronización con backend**.
- Añadir **modo oscuro**.
- Mejorar la **accesibilidad**.

---

## **📄 Licencia**
Este proyecto es de código abierto y puede ser utilizado libremente.

---
**¡Disfruta organizando tus tareas con Nano ToDo!** 🎉
