const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

function File({ size = 0, ctime = 0, birthtime = 0 }, { inputDir, fileName }) {
  this.id = fileName;
  this.size = size;
  this.modified = ctime;
  this.created = birthtime;

  this.path = `${inputDir}/${fileName}`;
  this.isFile = true;
}

function Directory(path) {
  this.name = '';
  this.path = path;
  this.files = [];
  this.length = 0;

  const dirArray = path.split('/');
  this.name = dirArray[dirArray.length - 1];
}

// TODO: refactor to pure functions
const readDir = inputDir => {
  const dir = new Directory(inputDir);
  return fs
    .readdirAsync(inputDir)
    .map(fileName =>
      fs.statAsync(`${inputDir}/${fileName}`).then(stat => {
        if (stat.isFile()) {
          return new File(stat, { fileName, inputDir });
        }
        if (stat.isDirectory()) {
          return readDir(`${inputDir}/${fileName}`).then(directory => {
            // eslint-disable-next-line no-param-reassign
            directory.path = `${inputDir}/${fileName}`;
            // eslint-disable-next-line no-param-reassign
            directory.id = fileName;
            // eslint-disable-next-line no-param-reassign
            directory.isFile = false;

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
