const fs = require('fs');
const path = require('path');

const fileWatch = require('chokidar');

const appFolder = path.join(__dirname, '..');
const contentFolder = path.join(appFolder, 'content');

/* 
 * This script detects markdown-files in /content
 * and generates a sitemap.js in /lib
 * each file is enriched with file statistics
 * and contributors (based on git blame)
 */
const generateSitemap = require('./tasks/sitemap');

const sitemapReady = generateSitemap(appFolder).then(() => console.log('🗺 ', 'Sitemap generated'));

/* 
 * This script detects watches on markdown files and appends a white-space char at the end of the file
 *
 * This is a hack to enable HMR for markdown files in NextJS,
 * because NextJS does not support server-side webpack.
 * Therefore babel most be used for transpiling markdown,
 * but the babel plugin inlines the markdown as string, loosing the file ref.
 */
const markdownChanged = fileLocation => {
  // TODO: find actual usage of markdown files
  const file = `${appFolder}/${fileLocation.replace('content', 'pages').replace('.md', '.js')}`;
  console.log('📄 ', 'Updated markdown: ', fileLocation);
  fs.appendFileSync(file, ' ');
};

const fileWatchReady = new Promise((resolve, reject) => {
  fileWatch
    .watch(contentFolder, { ignoreInitial: true })
    .on('add', fileLocation => {
      markdownChanged(fileLocation);
      generateSitemap();
    })
    .on('change', fileLocation => {
      markdownChanged(fileLocation);
    })
    .on('ready', resolve)
    .on('error', reject);
}).then(() => {
  console.log('🔭 ', 'Filewatcher ready');
});

/* 
 * This script invokes the next binary
 * Since it's a node module, we can just require it.
 * We wait for the sitemap and filewatch to complete
 */
Promise.all([fileWatchReady, sitemapReady]).then(() => {
  const next = path.resolve(`${appFolder}/node_modules/.bin/next`);
  require(next); // eslint-disable-line import/no-dynamic-require, global-require
});
