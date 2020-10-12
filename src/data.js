import path from 'path'
import fs from 'fs'

function initialize () {
  fs.mkdirSync(getDataDir(), { recursive: true })
  fs.mkdirSync(getScheduleDir(), { recursive: true })
}

function getDataDir () {
  return './data'
}

function getScheduleDir () {
  return path.join(getDataDir(), 'schedule')
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
  fs.renameSync(file, file + '.bak')
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
  fs.renameSync(file, file + '.bak')
  const str = JSON.stringify(data)
  fs.writeFileSync(file, str)
}

function getScheduleFile (week, year) {
  week = week.toString().padStart(2, '0')
  year = year.toString().padStart(4, '0')
  return path.join(getScheduleDir(), `${year}-${week}.json`)
}

function loadSchedule (week, year) {
  const file = getScheduleFile(week, year)
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'))
    return data
  } catch (err) {
    if (err.code !== 'ENOENT') throw err
    return []
  }
}

function saveSchedule (week, year, data) {
  const file = getScheduleFile(week, year)
  fs.renameSync(file, file + '.bak')
  const str = JSON.stringify(data)
  fs.writeFileSync(file, str)
}

export default {
  initialize,
  getDataDir,
  loadBoards,
  saveBoards,
  loadTimetable,
  saveTimetable,
  loadSchedule,
  saveSchedule
}
