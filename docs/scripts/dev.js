const fs = require('fs');
const path = require('path');
const tree = require('../lib/dirToTree');

/* 
 * This script detects markdown-files in /content
 * and generates a sitemap.js in /lib
 * each file is enriched with file statistics
 * and contributors (based on git blame)
 */
// TODO: watch-mode
tree(path.join(__dirname, 'content')).then(data => {
  const string = JSON.stringify(data.files, null, 2);
  fs.writeFile(path.join(__dirname, 'lib', 'sitemap.js'), `module.exports = ${string};`, err => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});

/* 
 * This script detects watches on markdown files and appends a white-space char at the end of the file
 *
 * This is a hack to enable HMR for makrdown files in NextJS,
 * because NextJS does not support server-side webpack.
 * Therefore babel most be used for transpiling markdown,
 * but the babel plugin inlines the markdown as string, loosing the file ref.
 */
const handler = fileLocation => {
  // TODO: find actual usage of markdown files
  const file = `${__dirname}/${fileLocation.replace('content', 'pages').replace('.md', '.js')}`;
  fs.appendFileSync(file, ' ');
};
require('chokidar')
  .watch('./content', { ignoreInitial: true })
  .on('add', handler)
  .on('change', handler);
