// in asynchorus function if you have lot of callback hell then it is difficult to understand so to control callback hell use anonymous function it does have name of the function.
// asynchrous
// based on callback function
console.log("Before");
// getUser(1, (user) => {
//   getRepositories(user.githubUserName, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     });
//   });
// });

// same above one but here we are using promises instread of callback

// promises based appoach

const p = getUser(1); //it return s promise
p.then((user) => getRepositories(user.githubUserName))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log("Commits", commits))
  .catch((err) => console.log("error", err.message));

// async and await appaoch

async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.githubUserName);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (err) {
    console.log("Error", err);
  }
}
displayCommits();

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("reading a user from a database....");
      resolve({ id: id, githubUserName: "Haritha" });
    }, 2000);
  });
}
function getRepositories(userName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling Github API...");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}
function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling Github API...");
      resolve(["Commit"]);
    }, 2000);
  });
}
