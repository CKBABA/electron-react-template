import React, { useRef, useEffect } from "react";
import { Button } from "antd";
import useDesktopCapturer from "@/hooks/useDesktopCapturer.hook";

const myWindow = window as Window & typeof globalThis

const Capture = () => {
    const { getStream, stream, sources } = useDesktopCapturer()
    const videoRef = useRef(null)


    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream
        }
    }, [stream])

    return (
        <>
            {/* <Button type="primary" onClick={this.handleCaptureScreen}>截图</Button> */}
            {/* <Button type="primary" onClick={handleReceiveDesktop}>开始</Button> */}
            {/* <Button type="primary" onClick={myWindow.record.endFfmpegRecord}>结束</Button>
            <Button type="primary" onClick={myWindow.record.downloadFfmpegRecord}>下载</Button> */}
            <ul>
                {
                    sources.map((el, index) => {
                        return <li key={index} onClick={() => getStream(index)} className="pointer">{el.name}</li>
                    })
                }
            </ul>
            <video id="video" width="1280" height="720" ref={videoRef} autoPlay controls></video>
        </>
    );
}

export default Capture;
