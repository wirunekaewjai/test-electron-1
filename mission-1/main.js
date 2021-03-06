const { app, ipcMain, BrowserWindow } = require('electron');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('src/page-1.html');

  let childWindow;

  ipcMain.on('request-answer', (ev, id) => {
    if (!childWindow || childWindow.isDestroyed())
    {
      childWindow = new BrowserWindow({
        show: true,
        width: 640,
        height: 480,
        // parent: mainWindow,
        webPreferences: {
          nodeIntegration: true,
        },
      });

      childWindow.on('ready-to-show', () =>
      {
        childWindow.webContents.send('request-answer', id);
      });

      childWindow.loadFile('src/page-2.html');
    }
    else
    {
      childWindow.webContents.send('request-answer', id);
      childWindow.focus();
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
  {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});