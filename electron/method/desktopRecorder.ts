import { desktopCapturer } from "electron";

export const handleDesktopCapturer = async () => {
    const sources = await desktopCapturer.getSources({ types: ["window", "screen"] })
    return sources
}