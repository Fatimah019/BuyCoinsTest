import { items } from "./query.js";

// chnage active link class name to active

items.links.forEach((el) => {
  el.addEventListener("click", function () {
    links.forEach((nav) => {
      nav.classList.remove("active");
      this.classList.add("active");
    });
  });
});
