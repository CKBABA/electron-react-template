import './captrue'

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipc", {
    startDesktopCapturer: () => ipcRenderer.invoke('start-desktopCapturer')
})

contextBridge.exposeInMainWorld("record", {
    startFfmpegRecord: () => {
        ipcRenderer.send("start-ffmpeg-record");
    },
    endFfmpegRecord: () => {
        ipcRenderer.send("end-ffmpeg-record")
    },
    downloadFfmpegRecord: () => {
        ipcRenderer.send("download-ffmpeg-record")

    }
});
