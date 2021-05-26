// chnage active link class name to active
const activeLink = document.querySelector(".sub-header").querySelectorAll("a");

activeLink.forEach((el) => {
  el.addEventListener("click", function () {
    activeLink.forEach((nav) => {
      nav.classList.remove("active");
      this.classList.add("active");
    });
  });
});
