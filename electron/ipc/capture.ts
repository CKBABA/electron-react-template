import { app, dialog, ipcMain, BrowserWindow, desktopCapturer } from "electron";
import path from "path";
import fs from "fs";
/**
 * @name handleCaptureWeb
 * @param window
 * @description 截网页全屏
 */
async function handleCaptureWeb(window: BrowserWindow) {
  try {
    const capturePath = await dialog.showSaveDialog(window, {
      title: "Save Screenshot",
      defaultPath: path.join(app.getPath("pictures"), "screenshot.png"),
      filters: [{ name: "Images", extensions: ["png", "jpg", "jpeg"] }],
    });

    if (!capturePath.canceled) {
      const image = await window.webContents.capturePage();
      const buffer = image.toPNG(); // 可以根据需要修改成 toJPEG() 等

      fs.writeFileSync(capturePath.filePath, buffer);
    }
  } catch (error) {
    console.error("Error capturing and saving screenshot:", error);
  }
}
/**
//  * @name handleCaptureWeb
//  * @param  
//  * @description 截网页全屏
//  */
// async function handleCaptureWeb2() {
//   try {
//     const sources = await desktopCapturer.getSources({ types: ["screen"] });

//     const options = { types: ["png", "jpeg"], defaultPath: "screenshot.png" };
//     const { filePath } = await dialog.showSaveDialog(options);

//     if (!filePath) return;

//     const source = sources.find((source) => source.name === "Entire screen");

//     if (!source) {
//       throw new Error("Error capturing screen: Entire screen not found.");
//     }

//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: false,
//       video: {
//         mandatory: {
//           chromeMediaSource: "desktop",
//           chromeMediaSourceId: source.id,
//           minWidth: 1280,
//           maxWidth: 1920,
//           minHeight: 720,
//           maxHeight: 1080,
//         },
//       },
//     });

//     const mediaRecorder = new MediaRecorder(stream);
//     const chunks = [];

//     mediaRecorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         chunks.push(event.data);
//       }
//     };

//     mediaRecorder.onstop = async () => {
//       const blob = new Blob(chunks, { type: "video/webm; codecs=vp9" });
//       const buffer = Buffer.from(await blob.arrayBuffer());

//       const fs = require("fs");
//       fs.writeFile(filePath, buffer, () => {
//         console.log("Screenshot saved:", filePath);
//       });
//     };

//     mediaRecorder.start();
//     setTimeout(() => mediaRecorder.stop(), 3000); // 截取 3 秒钟的视频，也可以根据需求修改时长
//   } catch (error) {
//     console.error("Error capturing screen:", error);
//   }
// }

export function handleIPCCapture(window: BrowserWindow) {
  ipcMain.on("capture-screen", (event, arg) => {
    handleCaptureWeb(window);
  });

}
