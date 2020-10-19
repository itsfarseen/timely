const { app, BrowserWindow } = require('electron')
const process = require('process')

let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    backgroundColor: '#fff'
  })

  win.setAutoHideMenuBar(true)

  // and load the index.html of the app.

  if (process.env.NODE_ENV === 'dev') {
    win.loadURL('http://localhost:8081/')
  } else {
    win.loadFile(`${__dirname}/../dist/index.html`)
    console.log(__dirname)
  }

  win.webContents.openDevTools()
  const installExtension = require('electron-devtools-installer')
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err))
}

app.on('ready', createWindow)
