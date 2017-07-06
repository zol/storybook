const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

const tree = require('../../lib/dirToTree');

/* 
 * This script detects markdown-files in /content
 * and generates a sitemap.js in /lib
 * each file is enriched with file statistics
 * and contributors (based on git blame)
 */
module.exports = appFolder =>
  tree(path.join(appFolder, 'content'))
    .then(data => {
      let result;
      let message = '';
      try {
        result = JSON.stringify(data.files, null, 2);
      } catch (error) {
        message = `/* ${message} */`;
        result = JSON.stringify([], null, 2);
      }
      return fs.writeFileAsync(
        path.join(appFolder, 'lib', 'sitemap.js'),
        `module.exports = ${result}; ${message}`
      );
    })
    .catch(error => {
      console.log(error);
    });
