// import api key
import fetchGithubUserData from "./main.js";
import { options } from "./query.js";
const githubUrl = "https://api.github.com/graphql";

// import fetchGithubUserData from "./main.js";

let loginForm = document.querySelector("#form");
let user = document.querySelector("#username");

loginForm.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  fetch(githubUrl, options)
    .then((res) => res.json())
    .then((res) => {
      if (res.data.viewer.login && res.data.viewer.login === user.value) {
        window.location = "profile.html";
      } else {
        window.location = "error.html";
      }
    });
}
