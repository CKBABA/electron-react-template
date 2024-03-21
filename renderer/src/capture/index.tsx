import React from "react";
import { Button } from "antd";

const myWindow = window as Window & typeof globalThis

class Capture extends React.Component {
    handleCaptureScreen = () => {
        const capture = myWindow.capture
        capture.captureScreen();
    }
    render() {
        return (
            <>
                <Button type="primary" onClick={this.handleCaptureScreen}>截图</Button>
            </>
        );
    }

}
export default Capture;
