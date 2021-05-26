// chnage active link class name to active
const links = document.querySelector(".sub-header").querySelectorAll("a");

links.forEach((el) => {
  el.addEventListener("click", function () {
    links.forEach((nav) => {
      nav.classList.remove("active");
      this.classList.add("active");
    });
  });
});
