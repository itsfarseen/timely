const path = require('path');
const fs = require('fs');

function initialize() {
  fs.mkdirSync(getDataDir(), {recursive: true});
  fs.mkdirSync(getBoardsDir(), {recursive: true});
}

function getDataDir() {
  return "./data";
}

function getBoardsDir() {
  return path.join(getDataDir(), "boards")
}

function loadTasks() {
  let boardsDir = getBoardsDir();
  let files = fs.readdirSync(boardsDir);

  console.log(files);
}

function loadTask(taskFile) {
    let contents = fs.readFileSync(taskFile, {encoding:'utf8', flag: 'r'})
}

module.exports = {
  initialize,
  getDataDir,
  getBoardsDir,
  loadTasks
}
