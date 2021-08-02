const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#52734D',
    icon: `file://${__dirname}/dist/hibaku/assets/logo.png`,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, './dist/hibaku/index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// For Mac OS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
