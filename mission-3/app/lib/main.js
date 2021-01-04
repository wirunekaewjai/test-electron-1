"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
function createWindow() {
    var mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadFile(path.join(__dirname, '../pages/page-1.html'));
    var childWindow;
    electron_1.ipcMain.on('request-answer', function (ev, id) {
        if (!childWindow || childWindow.isDestroyed()) {
            childWindow = new electron_1.BrowserWindow({
                show: true,
                width: 640,
                height: 480,
                webPreferences: {
                    nodeIntegration: true
                }
            });
            childWindow.on('ready-to-show', function () {
                childWindow.webContents.send('request-answer', id);
            });
            childWindow.loadFile(path.join(__dirname, '../pages/page-2.html'));
        }
        else {
            childWindow.webContents.send('request-answer', id);
            childWindow.focus();
        }
    });
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map