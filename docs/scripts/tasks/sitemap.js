const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

const folderToTree = require('../../lib/dirToTree');
const md5 = require('md5');
const merge = require('deepmerge');
const prettier = require('prettier');

const promiseFromCommand = require('../../lib/promiseFromCommand');

const existingSitemap = require('../../lib/sitemap');

/* 
 * This script detects markdown-files in /content
 * and generates a sitemap.js in /lib
 * each file is enriched with file statistics
 * and contributors (based on git blame)
 */

const authorMatchString = 'Author: (.+?) <(.+?)>';
const allAuthorsRegexp = new RegExp(authorMatchString, 'g');
const authorRegexp = new RegExp(authorMatchString);

const mailmapLineSplitter = /([^<]*) <([^>]*)>[^#\n]*(?:#\s?(.*))?/;
const mailmapData = fs
  .readFileAsync(path.join(__dirname, '..', '..', '..', '.mailmap'), 'utf8')
  .then(raw =>
    raw
      .split('\n')
      .filter(i => i[0] && i[0].match(/[a-zA-Z0-9]/))
      .map(i => i.match(mailmapLineSplitter))
      .map(([, name, email, meta = '']) => ({
        name,
        email,
        meta: meta.split(',').reduce((acc, item) => {
          const [key, value] = item.split(':');
          return key && value ? Object.assign(acc, { [key.trim()]: value.trim() }) : acc;
        }, {}),
      }))
      .reduce(
        (acc, item = {}) =>
          Object.assign(acc, {
            [item.email]: {
              name: item.name || acc[item.email].name,
              email: item.email || acc[item.email].email,
              meta: Object.assign({}, item.meta, (acc[item.email] || {}).meta),
            },
          }),
        {}
      )
  );

const normalize = (list, acc = {}) =>
  list.reduce((localAcc, item) => {
    const localItem = Object.assign({}, item, { files: [] });
    if (item.files && item.files.length) {
      normalize(item.files, localAcc); // recursion
      const keys = item.files.map(i => i.path);
      localItem.files = keys;
    }
    // eslint-disable-next-line no-param-reassign
    localAcc[item.path] = localItem;
    return localAcc;
  }, acc);

const getContributors = item =>
  Promise.all([mailmapData, promiseFromCommand(`git --no-pager log --summary -p -- ${item.path}`)])
    .then(([mailmap, result]) =>
      (result.match(allAuthorsRegexp) || [])
        .map(string => {
          const [, name, email] = string.match(authorRegexp);
          const hash = md5(email);

          return { name, hash, email };
        })
        .reduce((acc, { name, hash, email }, index, list) => {
          acc[hash] = { name, email };
          if (index < list.length - 1) {
            return acc;
          }
          return Object.keys(acc).map(key =>
            Object.assign(
              {
                hash: key,
                name: acc[key].name,
                email: acc[key].email,
              },
              mailmap[acc[key].email]
            )
          );
        }, {})
    )
    .catch(error => {
      console.log(error);
      return {};
    })
    .then(contributors => Object.assign(item, { contributors }));

const run = appFolder =>
  folderToTree(path.join(appFolder, 'content'))
    .then(data => {
      const localData = normalize(data.files);

      return Promise.all(
        Object.keys(localData)
          .map(key => localData[key])
          .map(item => (item.isFile ? getContributors(item) : Promise.resolve(item)))
      );
    })
    .then(list => list.reduce((acc, item) => Object.assign(acc, { [item.path]: item }), {}))
    .then(data => merge(existingSitemap, data))
    .then(data => {
      let result;
      let message = '';
      try {
        result = `module.exports = ${JSON.stringify(data, null, 2)}`;
      } catch (error) {
        message = `/* ${error} */`;
        result = 'module.exports = []';
      }
      return fs.writeFileAsync(
        path.join(appFolder, 'lib', 'sitemap.js'),
        prettier.format([result, message].join('\n'), {
          printWidth: 100,
          tabWidth: 2,
          bracketSpacing: true,
          trailingComma: 'es5',
          singleQuote: true,
        })
      );
    })
    .catch(error => {
      console.log(error);
    });

run(path.join(__dirname, '..', '..'));

module.exports = run;

/* We can try to enricht this data with data from github:
 * https://developer.github.com/v4/explorer/

// This will query for 2 users based on email
query UserSearch($user1: String!, $user2: String!){ 
  user1: search( query: $user1, type: USER, first: 1) { 
    userCount,
    nodes {
      ... on User {
        name,
        email,
        id,
        login,
        avatarUrl,
        websiteUrl,
        url
      }
    }
  },
  user2: search( query: $user2, type: USER, first: 1) { 
    userCount,
    nodes {
      ... on User {
        name,
        email,
        id,
        login,
        avatarUrl,
        url,
        websiteUrl
      }
    }
  }
}

// variables:
{ 
  "user1": "ndelangen@me.com in:email",
  "user2": "regx@usul.su in:email"
}

 */
