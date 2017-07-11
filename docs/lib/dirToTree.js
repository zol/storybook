const path = require('path');

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const getPath = (fullDir, baseDir) => fullDir.replace(baseDir, '');
const getIndex = directory =>
  (directory.files.find(f => f.route.match(/index$/)) || directory.files[0]).route;

function File({ size = 0, ctime = 0, birthtime = 0 }, { workDir, baseDir, fileName }) {
  const extention = path.extname(fileName);
  this.id = fileName;

  this.extention = extention;
  this.route = getPath(`${workDir}/${path.basename(fileName, extention)}`, baseDir);
  this.page = getPath(`${workDir}/${path.basename(fileName, extention)}`, baseDir);
  this.path = getPath(`${workDir}/${fileName}`, baseDir);
  this.isFile = true;
}

function Directory(workDir) {
  this.name = '';
  this.route = workDir;
  this.path = workDir;
  this.files = [];
  this.length = 0;

  const dirArray = workDir.split('/');
  this.name = dirArray[dirArray.length - 1];
}

// TODO: refactor to pure functions
// TODO: remove eslint-exceptions

/* Traverse a directory on filesystem and return a tree representing it
 * readDir is a recursive function (calling itself to resolve subdirectories) */
const readDir = (workDir, baseDir) => {
  const dir = new Directory(workDir);
  return fs
    .readdirAsync(workDir)
    .map(fileName =>
      fs.statAsync(`${workDir}/${fileName}`).then(stat => {
        if (stat.isFile()) {
          return new File(stat, { fileName, workDir, baseDir });
        }
        if (stat.isDirectory()) {
          return readDir(`${workDir}/${fileName}`, baseDir).then(directory => {
            // eslint-disable-next-line no-param-reassign
            directory.path = getPath(`${workDir}/${fileName}`, baseDir);
            // eslint-disable-next-line no-param-reassign
            directory.route = getPath(`${workDir}/${fileName}`, baseDir);
            // eslint-disable-next-line no-param-reassign
            directory.index = getIndex(directory);
            // eslint-disable-next-line no-param-reassign
            directory.page = getIndex(directory);
            // eslint-disable-next-line no-param-reassign
            directory.id = fileName;
            // eslint-disable-next-line no-param-reassign
            directory.isDirectory = true;

            return directory;
          });
        }
        return undefined;
      })
    )
    .map(files => {
      dir.files.push(files);
      return undefined;
    })
    .then(() => dir);
};

module.exports = readDir;
