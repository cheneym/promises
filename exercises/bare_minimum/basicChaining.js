/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
Promise.promisifyAll(fs);
var requestAsync = Promise.promisify(require('request'));
var lib = require('./promisification');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  var r = fs.readFileAsync(readFilePath, 'utf8');
  return r.then(function(fileText) {
    return fileText.match(/.*(\n|\r)/)[0].slice(0, -1);
  }).then(function(user) {
    return lib.getGitHubProfileAsync(user);
  }).then(function(resp) {
    return fs.writeFileAsync(writeFilePath, JSON.stringify(resp), 'utf8');
  }); 
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
