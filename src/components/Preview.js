import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCameraImage } from "../features/cameraSlice";
import { useHistory } from "react-router-dom";

function Preview() {
     const cameraImage = useSelector(selectCameraImage);
     console.log(`cameraImage: ${cameraImage}`);
     const history = useHistory();

     // age axi nagerefte boodim (state ax ha khali bood) az safhe preview be safhe asli montaghel beshim
     useEffect(() => {
          if (!cameraImage) {
               history.replace("/");
          }
     }, [cameraImage, history]);

     return (
          <div className='preview'>
               <h1>this is your camera image</h1>
               <img src={cameraImage} alt='image_preview' />
          </div>
     );
}

export default Preview;
