// useScreenRecorder.ts

import { exec, ChildProcessWithoutNullStreams } from 'child_process';
import ffmpegPath from 'ffmpeg-static';


const useScreenRecorder = () => {
    let recording = false
    const  videoData: Buffer = null
    let ffmpegProcess: ChildProcessWithoutNullStreams = null
    const startFfmpegRecording = () => {
        if (recording) return;
        console.log(ffmpegPath)
        const command = `${ffmpegPath} -f x11grab -s 1920x1080 -framerate 25 -i :0.0 E:/output.mp4`;
        // const ffmpeg = exec(command, { encoding: 'buffer' });
        const ffmpeg = exec(command);
        ffmpegProcess = ffmpeg
        console.log(ffmpeg)

        // ffmpeg.stdout?.on('data', (data: Buffer) => {
        //     console.error('FFmpeg error:', data.toString());
        //     videoData ? Buffer.concat([videoData, data]) : data
        // });

        ffmpeg.on('exit', (code, signal) => {
            console.log('FFmpeg process exited with code:', code, 'signal:', signal);
            recording = false
            ffmpegProcess = null

        });

        recording = true
    };

    const stopRecording = () => {
        if (!ffmpegProcess) return;

        ffmpegProcess.kill('SIGINT');
    };

    const downloadVideo = () => {
        if (videoData) {
            console.log(videoData)
            const blob = new Blob([videoData], { type: 'video/mp4' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'recorded-video.mp4';
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
    };

    // useEffect(() => {
    //     return () => {
    //         if (recording) {
    //             stopRecording();
    //         }
    //     };
    // }, [recording, stopRecording]);

    return { recording, startFfmpegRecording, stopRecording, downloadVideo };
};

export default useScreenRecorder;
