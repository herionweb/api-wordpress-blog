export function Menu() {
const $menu = document.createElement("nav");
  $menu.classList.add("menu");
  $menu.innerHTML = `
    <a href="#/">Home</a>
    <span> - </span>
    <a href="#/search">Busqueda</a>
    <span> - </span>
    <a href="#/contacto">Contactame</a>
    <span> - </span>
    <a href="https://developer.wordpress.org/rest-api/" target="_blank" rel="noopener">API Wordpress</a>
  `;
  return $menu;
}