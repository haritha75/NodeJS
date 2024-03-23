// in asynchorus function if you have lot of callback hell then it is difficult to understand so to control callback hell use anonymous function it does have name of the function.
// asynchrous
console.log("Before");
getUser(1, getRepositories);
console.log("After");

function getRepositories(user) {
  getRepositories(user.githubUserName, getCommits);
}

function getCommits(repos) {
  getCommits(repos, displayCommits);
}
function displayCommits(commits) {
  console.log(commits);
}

// synchrous

// console.log("Before");
// const user = getUser(1);
// const repos = getRepositories(user.githubUserName);
// const commits = getCommits(repos[0]);
// console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("reading a user from a database....");
    callback({ id: id, githubUserName: "Haritha" });
  }, 2000);
}
function getRepositories(userName, callback) {
  setTimeout(() => {
    console.log("Calling Github API...");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log("Calling Github API...");
    callback(["Commit"]);
  }, 2000);
}
