import fs from "fs";
import * as os from "os";
const userName = os.userInfo().username;
const DefaultDownloadMap = new Map([
  ["win32", "C:/Users"],
  ["linux", "/home"],
  ["darwin", "/Users"],
]);

export function handleDownload() {
  const blob = arguments[0];
  const name = arguments[1];
  console.log(arguments)
  console.log(name);
  const filePath =
  DefaultDownloadMap.get(os.platform()) + "/Downloads" + "/" + userName;
  fs.writeFile(filePath, blob, (err) => {});
}
