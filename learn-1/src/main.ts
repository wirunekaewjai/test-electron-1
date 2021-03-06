import 'module-alias/register';
import 'source-map-support/register';

import { app, ipcMain, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 960,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload/index.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, '../app.html'));
  mainWindow.webContents.openDevTools();
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

ipcMain.on('navigate', (ev, page: string, props?: any) => {
  ev.reply('navigate', page, props);
});