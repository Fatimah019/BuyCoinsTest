import GITHUB_API_KEY from "./apikey.js";
import fetchGithubUserData from "./main.js";
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

export { options };