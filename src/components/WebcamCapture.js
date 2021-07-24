import { useRef,useState } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useCallback } from "react";

const videoConstraints = {
     // 250, 400
     width: 360,
     height: 640,
     facingMode: "user",
};

function WebcamCapture() {
     const webcamRef = useRef(null);

    //  const [image, setImage] = useState(null)   

     //  az useCallback estefade mikonim ke ta vaghti ke reference webcamRef avaz nashode , tabe hamoon natije ghablio bargardoone
     const capture = useCallback(() => {
          const imageSrc = webcamRef.current.getScreenshot();
        //   setImage(imageSrc)
        //   console.log(imageSrc);
     }, [webcamRef]);

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

               <RadioButtonUncheckedIcon
                    className='webcamCapture__button'
                    onClick={capture}
                    fontSize='large'
               />

               {/* <img src={image} alt="captured_image" /> */}
          </div>
     );
}

export default WebcamCapture;
