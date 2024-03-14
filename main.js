const { app, BrowserWindow } = require("electron");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  win.loadFile("./dist/index.html");
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
});
