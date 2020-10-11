import path from 'path'
import fs from 'fs'

function initialize () {
  fs.mkdirSync(getDataDir(), { recursive: true })
}

function getDataDir () {
  return './data'
}

function getBoardsFile () {
  return path.join(getDataDir(), 'boards.json')
}

function loadBoards () {
  const boardsFile = getBoardsFile()
  const boards = JSON.parse(fs.readFileSync(boardsFile, 'utf8'))
  return boards
}

function saveBoards (boards) {
  const boardsFile = getBoardsFile()
  const boardsStr = JSON.stringify(boards)
  fs.writeFileSync(boardsFile, boardsStr)
}

export default {
  initialize,
  getDataDir,
  loadBoards,
  saveBoards
}
