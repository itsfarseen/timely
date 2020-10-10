import path from 'path';
import fs from 'fs';

import utils from './utils.js';

function initialize() {
  fs.mkdirSync(getDataDir(), {recursive: true});
}

function getDataDir() {
  return "./data";
}

function getBoardsFile() {
  return path.join(getDataDir(), "boards.json")
}

function loadBoards() {
  let boardsFile = getBoardsFile();
  let boards = JSON.parse(fs.readFileSync(boardsFile, 'utf8'));
  return boards;
}

function saveBoards(boards) {
  let boardsFile = getBoardsFile();
  let boardsStr = JSON.stringify(boards);
  fs.writeFileSync(boardsFile, boardsStr);
}

export default {
  initialize,
  getDataDir,
  loadBoards,
  saveBoards
}
