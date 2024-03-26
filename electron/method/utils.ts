import fs from "fs";
import * as os from "os";
import { Buffer } from 'buffer'

const userName = os.userInfo().username;
const DefaultDownloadMap = new Map([
  ["win32", "C:/Users"],
  ["linux", "/home"],
  ["darwin", "/Users"],
]);

export function handleDownload(fileName, arrayBuffer) {
  const filePath = `${DefaultDownloadMap.get(os.platform())}/${userName}/Downloads/${fileName}`
  fs.writeFile(filePath, Buffer.from(arrayBuffer), (err) => {
    if (err) {
      console.error('Error saving file:', err);
    } else {
      console.log('File saved successfully:', filePath);
    }
  });
}
