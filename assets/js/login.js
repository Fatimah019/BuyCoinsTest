// import api key
import { options } from "./query.js"; //import query config

const githubUrl = "https://api.github.com/graphql"; // github api root endpoint

let loginForm = document.querySelector("#form");
let user = document.querySelector("#username");

loginForm.addEventListener("submit", submitForm);

// function that submits user's username and fetches repo list
function submitForm(event) {
  event.preventDefault();
  fetch(githubUrl, options)
    .then((res) => res.json())
    .then((res) => {
      if (res.data.viewer.login && res.data.viewer.login === user.value) {
        localStorage.setItem("user", res.data.viewer.login);
        window.location = "profile.html";
      } else if (user.value < 1) {
        alert("input field cannot be empty");
      } else {
        window.location = "error.html";
      }
    });
}
