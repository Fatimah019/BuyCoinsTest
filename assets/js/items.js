// documents
export const items = {
  githubUrl: "https://api.github.com/graphql",
  user: JSON.parse(localStorage.getItem("user")),
  displayName: document.getElementById("fullname"),
  userName: document.getElementsByClassName("username"),
  userBio: document.getElementsByClassName("userbio"),
  profilePic: document.getElementsByClassName("prof-img"),
  repoCount: document.getElementsByClassName("repo-count"),
  projCount: document.getElementsByClassName("project-count"),
  reposContainer: document.querySelector("#repos"),
  navMenu: document.querySelector(".header-nav"),
  navBar: document.querySelector(".nav-bar"),
  monthArray: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novermber",
    "December",
  ],
  loginForm: document.querySelector("#form"),
  usernameInput: document.getElementById("githubusername"),
};