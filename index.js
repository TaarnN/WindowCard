import { app, BrowserWindow, ipcMain } from "electron";
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, 
      contextIsolation: false,
    },
    resizable: false,
  });

  mainWindow.loadFile("index.html"); // Load your HTML file
  // Uncomment the line below to open DevTools.
  // mainWindow.webContents.openDevTools();
  ipcMain.on("close-window", () => {
    mainWindow.close();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
