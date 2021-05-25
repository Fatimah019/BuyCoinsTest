// github api root endpoint
const githubUrl = "https://api.github.com/graphql";
const accessToken = "d1a799d0c112e07ed968fd902ffc7064be43388c"; //my generated token

//nav bar
const navMenu = document.querySelector(".header-nav");
const navBar = document.querySelector(".nav-bar");
// toggle nav bar
navBar.addEventListener("click", () => {
  navMenu.classList.toggle("mobile-nav");
});

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

let displayName = document.getElementById("fullname");
let userName = document.getElementsByClassName("username");
let userBio = document.getElementsByClassName("userbio");
let profilePic = document.getElementsByClassName("prof-img");
let repoCount = document.getElementsByClassName("repo-count");
let projCount = document.getElementsByClassName("project-count");

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
    Authorization: "bearer " + accessToken,
  },
  body: JSON.stringify({ query }),
};

// login function
let loginPage = document.getElementById("login-page");
let userProfilePage = document.getElementById("user-profile-page");
let errorPage = document.getElementById("error-page");

let loginForm = document.querySelector("#form");

let user = document.querySelector("#username");
loginForm.addEventListener("submit", fetchGithubUserData);

// hide user profile and error pages on page load
userProfilePage.style.display = "none";
errorPage.style.display = "none";

function fetchGithubUserData(event) {
  event.preventDefault();
  loginPage.style.display = "none";
  userProfilePage.style.display = "block";
  // fetch
  fetch(githubUrl, options)
    .then((res) => res.json())
    .then((res) => {
      if (res.data.viewer.login && res.data.viewer.login === user.value) {
        // console.log(res.data);

        let userinfo = res.data.viewer;
        // display user's full name
        displayName.innerHTML = userinfo.name;
        // display username
        for (const user_name of userName) {
          user_name.innerHTML = userinfo.login;
        }
        // display bio
        for (const user_bio of userBio) {
          user_bio.innerHTML = userinfo.bio;
        }
        // display profile pic
        for (const user_prof_pic of profilePic) {
          user_prof_pic.src = userinfo.avatarUrl;
        }
        // repo count
        for (const repoC of repoCount) {
          repoC.innerHTML =
            userinfo.repositories.totalCount === ""
              ? 0
              : userinfo.repositories.totalCount;
        }
        // project count
        for (const projC of projCount) {
          projC.innerHTML =
            userinfo.projects.totalCount === 0
              ? ""
              : userinfo.projects.totalCount;
        }

        // display repos
        let repos = userinfo.repositories.nodes;
        let reposContainer = document.querySelector("#repos");

        reposContainer.innerHTML =
          "<ul>" +
          repos
            .map(function (repo) {
              // date format
              let monthArray = [
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
              ];
              let updatedDate = repo.updatedAt;
              let date = new Date(updatedDate);
              let getMonth = monthArray[date.getMonth()];

              return `
            <li >
              <div>
                <p>
                  <a href=${repo.url} class="repo-name">${repo.name}</a>
                </p>
                <div>
                ${
                  repo.description === null
                    ? ""
                    : `  <p class="repo-desc">${repo.description}</p>`
                }
                <div class="repo-info">
                  <span class="programmingLang-color"
                  style="background-color: ${
                    repo.primaryLanguage.color
                  }"></span>  ${repo.primaryLanguage.name}
                  ${
                    repo.stargazerCount < 1
                      ? " "
                      : `
                    <svg aria-label="star" class="octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                    ${repo.stargazerCount}
                    `
                  }

                  ${
                    repo.forkCount < 1
                      ? " "
                      : `
                    <svg aria-label="fork" class="octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
                    ${repo.forkCount}
                    `
                  }

                  Updated on ${getMonth} ${date.getDate()}, ${date.getFullYear()}
                </div>

              </div>

              </div>

              <button class="star-btn">
              ${`
                <svg aria-label="star" class="octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>

                ${
                  repo.stargazerCount < 1
                    ? `<span>Star</span>`
                    : `<span>Unstar</span>`
                }
                `}
              </button>
            </li>
            `;
            })
            .join("") +
          "</ul>";
      } else {
        userProfilePage.style.display = "none";
        errorPage.style.display = "block";
      }
    });
}
