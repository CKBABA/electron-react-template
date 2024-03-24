import { useState, useEffect } from 'react'

const useDesktopCapturer = () => {
    const [sources, setSources] = useState<MediaDeviceInfo[]>([]);
    const [stream, setStream] = useState<MediaStream>(null);
    const myWindow = window as Window & typeof globalThis
    const ipc = myWindow.ipc

    useEffect(() => {
        const fetchData = async () => {
            await getSources()
            // getStream(0)
        }
        fetchData()
    }, [])
    const getSources = async () => {
        const sources = await ipc.startDesktopCapturer()
        setSources(sources)
        console.log(sources)
    }
    const getStream = async (index) => {
        const source = sources[index]
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: source.id,
                    minWidth: 1280,
                    maxWidth: 1280,
                    minHeight: 720,
                    maxHeight: 720
                }
            }
        });
        setStream(stream)
    }
    return { sources, stream, getStream, getSources }
}

export default useDesktopCapturer