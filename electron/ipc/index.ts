import { ipcMain } from "electron";
import useScreenRecorder from "../method/ffmpegRecorder";
import { handleDesktopCapturer } from "../method/desktopRecorder";
import { handleDownload } from "../method/utils";

export const handleIPCMethod = function () {
  const { startFfmpegRecording, stopRecording, downloadVideo } =
    useScreenRecorder();
  ipcMain.on("download", (event, fileName, arrayBuffer) => {
    handleDownload(fileName, arrayBuffer);
  });
  ipcMain.on("start-ffmpeg-record", (event, arg) => {
    startFfmpegRecording();
  });
  ipcMain.on("end-ffmpeg-record", (event, arg) => {
    stopRecording();
  });
  ipcMain.on("download-ffmpeg-record", (event, arg) => {
    downloadVideo();
  });
  ipcMain.handle("start-desktopCapturer", handleDesktopCapturer);
};
