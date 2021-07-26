import { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { setCameraImage } from "../features/cameraSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./webcamCapture.css";

const videoConstraints = {
     width: 360,
     height: 640,
     facingMode: "user",
};

function WebcamCapture() {
     //  const [image, setImage] = useState(null)
     const dispatch = useDispatch();
     const webcamRef = useRef(null);
     const history = useHistory();

     //  az useCallback estefade mikonim ke ta vaghti ke reference webcamRef avaz nashode , tabe hamoon natije ghablio bargardoone
     const capture = useCallback(() => {
          const imageSrc = webcamRef.current.getScreenshot();
          dispatch(setCameraImage(imageSrc));
          // vaghti ke ax capture shod, dg camera neshon nade va preview ax ro neshon bede
          history.push("/preview");
          //   setImage(imageSrc)
          //   console.log(imageSrc);
     }, [webcamRef, dispatch,history]);

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
