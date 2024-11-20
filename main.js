const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'contraseñas.json');

const dir = path.dirname(filePath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

ipcMain.handle('get-passwords', () => {
    return loadPasswords();
});

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false // Desactiva nodeIntegration por seguridad
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    mainWindow.maximize();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});