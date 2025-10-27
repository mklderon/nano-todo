export const aboutPage = {
  html: './pages/about/about.html',

  init(container) {
    console.log('About page cargada');

    return () => {
      console.log('Limpiando about page...');
    };
  }
};
