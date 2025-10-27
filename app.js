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

// Exportar para uso global
window.router = router;