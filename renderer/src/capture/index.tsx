import React, { useRef, useEffect } from "react";
import { Button } from "antd";
import useDesktopCapturer from "@/hooks/useDesktopCapturer.hook";

const myWindow = window as Window & typeof globalThis;

const Capture = () => {
  const {
    getStream,
    stopRecord,
    startRecord,
    downloadRecord,
    stream,
    sources,
    isRecording,
  } = useDesktopCapturer();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <>
      {/* <Button type="primary" onClick={this.handleCaptureScreen}>截图</Button> */}
      <Button type="primary" onClick={startRecord}>
        开始
      </Button>
      <Button type="primary" onClick={stopRecord}>
        结束
      </Button>
      <Button type="primary" onClick={downloadRecord}>
        下载
      </Button>
      <span>{isRecording ? "正在录制" : "点击录制"}</span>
      <ul>
        {sources.map((el, index) => {
          return (
            <li
              key={index}
              onClick={() => getStream(index)}
              className="pointer"
            >
              {el.name}
            </li>
          );
        })}
      </ul>
      <video
        id="video"
        width="1280"
        height="720"
        ref={videoRef}
        autoPlay
        controls
      ></video>
    </>
  );
};

export default Capture;
