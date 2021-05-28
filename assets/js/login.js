// // import api call class
import Api from "./query.js";
import { items } from "./items.js";

// login function

items.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let newApiCall = new Api();
  try {
    newApiCall
      .getApi()
      .then((data) => {
        if (items.usernameInput.value < 1) {
          alert("Input field cannot be empty");
        } else if (data.user === null || !data.user) {
          window.location = "error.html";
        } else {
          window.location = "profile.html";
          localStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    return err;
  }
});
