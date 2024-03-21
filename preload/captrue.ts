import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("capture", {
  captureScreen: () => {
    ipcRenderer.send("capture-screen");
  },
});
