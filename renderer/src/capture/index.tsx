import React from "react";
import { Button } from "antd";

class Capture extends React.Component {
    handleCaptureScreen = () => {
        const capture = window.capture
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
