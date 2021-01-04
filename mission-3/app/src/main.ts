import { app, ipcMain, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, '../pages/page-1.html'));

  let childWindow: BrowserWindow;

  ipcMain.on('request-answer', (ev, id: string) => {
    if (!childWindow || childWindow.isDestroyed())
    {
      childWindow = new BrowserWindow({
        show: true,
        width: 640,
        height: 480,
        webPreferences: {
          nodeIntegration: true,
        },
      });

      childWindow.on('ready-to-show', () =>
      {
        childWindow.webContents.send('request-answer', id);
      });

      childWindow.loadFile(path.join(__dirname, '../pages/page-2.html'));
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