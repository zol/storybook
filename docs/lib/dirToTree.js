const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const exec = require('child_process').exec;

function promiseFromChildProcess(child) {
  return new Promise((resolve, reject) => {
    const stdout = [];
    const stderr = [];
    child.stdout.on('data', data => {
      stdout.push(JSON.stringify(data));
    });
    child.stderr.on('data', data => {
      stderr.push(data.toString());
    });

    child.addListener('error', () => reject(stderr.join('.')));
    child.addListener('exit', () => resolve(stdout.join('.')));
  });
}

function File(name) {
  this.name = name;
  this.size = 0;
  this.hidden = false;

  if (name.substr(0, 1) === '.') {
    this.hidden = true;
  }
}

function Directory(path) {
  this.name = '';
  this.path = path;
  this.files = [];
  this.length = 0;
  this.hidden = false;

  const dirArray = path.split('/');
  this.name = dirArray[dirArray.length - 1];

  if (this.name.substr(0, 1) === '.') {
    this.hidden = true;
  }
}

const authorRegexp = /author (.+?)\\nauthor-mail (.+?)\\n/g;

const readDir = inputDir => {
  const dir = new Directory(inputDir);
  return fs
    .readdirAsync(inputDir)
    .map(fileName =>
      fs.statAsync(`${inputDir}/${fileName}`).then(stat => {
        if (stat.isFile()) {
          const file = new File(fileName);
          file.size = stat.size;
          file.ctime = stat.ctime;
          file.birthtime = stat.birthtime;

          const child = exec(`git blame -etp ${inputDir}/${fileName}`, {});

          return promiseFromChildProcess(child)
            .then(
              result => {
                // console.log(fileName, `promise complete: ${result}`);
                const edits = result.match(authorRegexp) || [];
                return edits.map(string => {
                  const [, name, email] = string.match(/author (.+?)\\nauthor-mail (.+?)\\n/);
                  return { name, email };
                });
              },
              err => []
              // console.log(`promise rejected: ${err}`);
            )
            .then(contributors => {
              file.contributors = contributors.reduce((acc, { name, email }) => {
                acc[name] = email;
                return acc;
              }, {});
              return file;
            });
        }
        if (stat.isDirectory()) {
          return readDir(`${inputDir}/${fileName}`).then(directory => directory);
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
