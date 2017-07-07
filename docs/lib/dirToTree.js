const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const md5 = require('md5');

const promiseFromCommand = require('./promiseFromCommand');

function File(name) {
  this.name = name;
  this.size = 0;
}

function Directory(path) {
  this.name = '';
  this.path = path;
  this.files = [];
  this.length = 0;

  const dirArray = path.split('/');
  this.name = dirArray[dirArray.length - 1];
}

const authorRegexp = /Author: (.+?) <(.+?)>/g;

const readDir = inputDir => {
  const dir = new Directory(inputDir);
  return fs
    .readdirAsync(inputDir)
    .map(fileName =>
      fs.statAsync(`${inputDir}/${fileName}`).then(stat => {
        if (stat.isFile()) {
          const file = new File(fileName);
          file.size = stat.size;
          file.modified = stat.ctime;
          file.created = stat.birthtime;
          file.path = `${inputDir.split('/docs/content')[1]}/${fileName}`;

          return promiseFromCommand(
            [`git --no-pager log --summary -p -- ${inputDir}/${fileName}`].join(' && ')
          )
            .then(result => {
              const contributors = result.match(authorRegexp) || [];
              return contributors
                .map(string => {
                  const [, name, email] = string.match(/Author: (.+?) <(.+?)>/);
                  const hash = md5(email);

                  return { name, hash, email };
                })
                .reduce((acc, { name, hash, email }, index, list) => {
                  if (index < list.length - 1) {
                    acc[hash] = { name, email };
                    return acc;
                  }
                  return Object.keys(acc).map(key => ({
                    hash: key,
                    name: acc[key].name,
                    email: acc[key].email,
                    // TODO: add github accountname
                  }));
                }, {});
            })
            .catch(error => {
              console.log(error);
              return {};
            })
            .then(contributors => {
              file.contributors = contributors;
              return file;
            });
        }
        if (stat.isDirectory()) {
          return readDir(`${inputDir}/${fileName}`).then(directory => {
            directory.path = `${inputDir.split('/docs/content')[1]}/${fileName}`;

            return directory;
          });
        }
        return undefined;
      })
    )
    .map(files => {
      dir.length += 1;
      dir.files.push(files);
      return undefined;
    })
    .then(() => dir);
};

module.exports = readDir;
