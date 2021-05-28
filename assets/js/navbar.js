import { items } from "./items.js";

// toggle nav bar
items.navBar.addEventListener("click", () => {
  items.navMenu.classList.toggle("mobile-nav");
});
