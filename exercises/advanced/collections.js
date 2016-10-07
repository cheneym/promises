/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */

Promise = require('bluebird');
fs = Promise.promisifyAll(require('fs'));
pluckFirstLine = require('../bare_minimum/promiseConstructor').pluckFirstLineFromFileAsync;


var combineFirstLineOfManyFiles = function(filePaths, writePath) {

  var promises = [];
  for (var i = 0; i < filePaths.length; i++ ){
    promises.push(pluckFirstLine(filePaths[i]));
  }
  
  return Promise.all(promises)
    .then(firstLines => firstLines.join('\n'))
    .then(text => fs.writeFileAsync(writePath, text));
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};