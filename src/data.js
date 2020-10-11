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
  const file = getBoardsFile()
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  return data
}

function saveBoards (data) {
  const file = getBoardsFile()
  const str = JSON.stringify(data)
  fs.writeFileSync(file, str)
}

function getTimetableFile () {
  return path.join(getDataDir(), 'timetable.json')
}

function loadTimetable () {
  const file = getTimetableFile()
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  return data
}

function saveTimetable (data) {
  const file = getTimetableFile()
  const str = JSON.stringify(data)
  fs.writeFileSync(file, str)
}

export default {
  initialize,
  getDataDir,
  loadBoards,
  saveBoards,
  loadTimetable,
  saveTimetable
}
