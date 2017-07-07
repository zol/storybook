const path = require('path');
const exec = require('child_process').exec;
const generateSitemap = require('./tasks/sitemap');

const appFolder = path.join(__dirname, '..');

const sitemapReady = generateSitemap(appFolder).then(() => console.log('🗺 ', 'Sitemap generated'));

/* 
 * This script runs the command 'next build' in node production mode
 * We pipe the output of the process directly into the output of this script's output
 */
Promise.all([sitemapReady]).then(() => {
  exec('NODE_END="production" next build').stdout.pipe(process.stdout);
});
