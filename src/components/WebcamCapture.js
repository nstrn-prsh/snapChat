import { useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
     // 250, 400
     width: 360,
     height: 640,
     facingMode: "user",
};

function WebcamCapture() {
     const webcamRef = useRef(null);

     return (
          <div className='webcamCapture'>
               <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat='image/jpeg'
                    videoConstraints={videoConstraints}
                    height={videoConstraints.height}
                    width={videoConstraints.width}
               />
          </div>
     );
}

export default WebcamCapture;

