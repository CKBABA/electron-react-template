import { useState, useEffect } from "react";

const useDesktopCapturer = () => {
  const [sources, setSources] = useState<MediaDeviceInfo[]>([]); // 获取到的所有源
  const [stream, setStream] = useState<MediaStream>(null); // 获取到的流
  const [isRecording, setIsRecording] = useState<boolean>(false); // 是否正在录制
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>(null); // 是否正在录制
  const [recordedChunks, setRecordedChunks] = useState<Array<T>>([]); // 是否正在录制

  //   let mediaRecorder: MediaRecorder = null; // 录制器
  //   let recordedChunks: Array<T> = []; // 存储录制的片段

  const myWindow = window as Window & typeof globalThis;
  const ipc = myWindow.ipc;

  useEffect(() => {
    const fetchData = async () => {
      await getSources();
      // getStream(0)
    };
    fetchData();
  }, []);
  const getSources = async () => {
    const sources = await ipc.startDesktopCapturer();
    setSources(sources);
  };
  const getStream = async (index = 0) => {
    const source = sources[index];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: source.id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720,
          },
        },
      });
      setStream(stream);
    } catch (err) {
      console.log(err);
      setStream(null);
    }
  };
  const startRecord = () => {
    const recorder = new MediaRecorder(stream)
    recorder.ondataavailable = handleDataAvailable;
    recorder.onstop = handleStop;
    recorder.start(1500);
    setIsRecording(true);
    setMediaRecorder(recorder);

  };
  const handleDataAvailable = (event) => {
    console.log(event);
    if (event.data.size > 0) {
      const recordedChunksTemp = [...recordedChunks, event.data];
      console.log(recordedChunks)
      setRecordedChunks(recordedChunksTemp);
    }
  };
  const handleStop = () => {
    setIsRecording(false);
  };
  const stopRecord = () => {
    console.log(mediaRecorder);
    mediaRecorder.stop();
  };
  const clearChunks = () => {
    setRecordedChunks([]);
  };
  const downloadRecord = () => {
    const blob = new Blob(recordedChunks, { type: "video/mp4" });
    const reader = new FileReader();
    reader.onload = function (event) {
      const arrayBuffer = event.target.result;
      ipc.download("video.mp4", arrayBuffer);
    };
    reader.readAsArrayBuffer(blob);
  };

  return {
    sources,
    stream,
    isRecording,
    getStream,
    getSources,
    startRecord,
    stopRecord,
    clearChunks,
    downloadRecord,
  };
};

export default useDesktopCapturer;
