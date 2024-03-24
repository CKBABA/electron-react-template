import { ipcMain } from "electron";
import useScreenRecorder from "../method/ffmpegRecorder";
import { handleDesktopCapturer } from '../method/desktopRecorder'

export const handleIPCMethod = function () {
    const { startFfmpegRecording, stopRecording, downloadVideo } = useScreenRecorder()
    ipcMain.on("start-ffmpeg-record", (event, arg) => {
        startFfmpegRecording();
    });
    ipcMain.on("end-ffmpeg-record", (event, arg) => {
        stopRecording();
    });
    ipcMain.on("download-ffmpeg-record", (event, arg) => {
        downloadVideo();
    });
    ipcMain.handle("start-desktopCapturer", handleDesktopCapturer)
}