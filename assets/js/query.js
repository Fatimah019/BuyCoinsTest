import GITHUB_API_KEY from "./apikey.js";
const githubUrl = "https://api.github.com/graphql";

// documents
export const items = {
  user: localStorage.getItem("user"),
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
};

// query(schema)
const query = `
  query {
          viewer {
      avatarUrl
      login
      name
      bio
      projects {
        totalCount
      }
      repositories(first: 20) {
          totalCount
          nodes {
              name
              forkCount
              stargazerCount
              updatedAt
              description
              isFork
              url
              primaryLanguage{
                color
                name
              }
            }
      }
    }
  }
  `;

const options = {
  method: "post",
  headers: {
    "Content-type": "application/json;charset=UTF-8",
    "Access-Control-Request-Headers": "X-Custom-Header",
    Authorization: "bearer " + GITHUB_API_KEY,
  },
  body: JSON.stringify({ query }),
};

// api call class
export default class Api {
  fetchApi() {
    return fetch(githubUrl, options)
      .then((res) => res.json())
      .then((res) => {
        return res.data.viewer;
      })
      .catch((err) => {
        return err;
      });
  }
}
