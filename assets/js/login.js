// import api call class
import Api from "./query.js";

let loginForm = document.querySelector("#form");
let userinput = document.querySelector("#username");

// function that submits user's username and fetches repo list

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  //   create a new instance of the Api class
  let userData = new Api();
  try {
    userData.fetchApi().then((user) => {
      if (user.login && user.login === userinput.value) {
        localStorage.setItem("user", user.login);
        window.location = "profile.html";
      } else if (userinput.value < 1) {
        alert("Input field cannot be empty");
      } else {
        window.location = "error.html";
      }
    });
  } catch (err) {
    document.write(err);
  }
});
