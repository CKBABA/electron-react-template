import { BrowserWindow } from "electron";
import { handleIPCCapture } from "../ipc/capture";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

type MainWindow = {
  createWindow: () => BrowserWindow;
  handleWindowIPC: (win: BrowserWindow) => void;
};

export function useMainWindow(): MainWindow {
  function createWindow(): BrowserWindow {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      height: 600,
      width: 800,
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    return mainWindow;
  }

  function handleWindowIPC(window: BrowserWindow): void {
    handleIPCCapture(window);
  }
  return {
    createWindow,
    handleWindowIPC,
  };
}
