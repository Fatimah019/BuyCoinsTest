//nav bar
const navMenu = document.querySelector(".header-nav");
const navBar = document.querySelector(".nav-bar");
// toggle nav bar
navBar.addEventListener("click", () => {
  navMenu.classList.toggle("mobile-nav");
});
