import GITHUB_API_KEY from "./apikey.js";
import { items } from "./items.js";

// Api call class
export default class Api {
  getApi() {
    const userInputValue = items.usernameInput.value;
    const query = `
    query {
      user(login: "${userInputValue}") {
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

    // header options
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        "Access-Control-Request-Headers": "X-Custom-Header",
        Authorization: "bearer " + GITHUB_API_KEY,
      },
      body: JSON.stringify({ query }),
    };

    // fetch data
    return fetch(items.githubUrl, options)
      .then((res) => res.json())
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }
}
