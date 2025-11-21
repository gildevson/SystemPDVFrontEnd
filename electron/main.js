const { app, BrowserWindow } = require('electron');
const path = require('path');
const { startBackend } = require('./api-runner');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadURL('http://localhost:4200'); // Angular
}

app.whenReady().then(() => {
  startBackend(); // iniciar o backend .exe
  createWindow();
});
