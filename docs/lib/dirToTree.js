const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const getPath = (fullDir, baseDir) => fullDir.replace(baseDir, '');

function File({ size = 0, ctime = 0, birthtime = 0 }, { workDir, baseDir, fileName }) {
  this.id = fileName;
  this.size = size;
  this.modified = ctime;
  this.created = birthtime;

  this.path = getPath(`${workDir}/${fileName}`, baseDir);
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
