import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetCameraImage, selectCameraImage } from "../features/cameraSlice";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import CloseIcon from "@material-ui/icons/Close";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";
import "./preview.css";
import { db, storage } from "../utilise/firebase";
import firebase from "firebase";

function Preview() {
     const cameraImage = useSelector(selectCameraImage);
     const dispatch = useDispatch();

     const history = useHistory();

     // age axi nagerefte boodim (state ax ha khali bood) az safhe preview be safhe asli montaghel beshim
     useEffect(() => {
          if (!cameraImage) {
               history.replace("/");
          }
     }, [cameraImage, history]);

     const closePreview = () => {
          dispatch(resetCameraImage());
     };

     // FIREBASE
     const sendPost = () => {
          // har axi ke migirim bayad id makhsoose khodesho dashte bashe
          const id = uuid();

          // post haro toye storage firebase save mikonim :)
          const uploadTask = storage
               .ref(`posts/${id}`)
               .putString(cameraImage, "data-url");

          // firebase document
          uploadTask.on(
               "state-changed",
               null,
               (error) => {
                    console.log(error);
               },
               // complete function
               () => {
                    storage
                         .ref("posts")
                         .child(id)
                         .getDownloadURL()
                         .then((url) => {
                              db.collection("posts").add({
                                   imageUrl: url,
                                   username: "Nas",
                                   read: false,
                                   // profile pic
                                   timestamp:
                                        firebase.firestore.FieldValue.serverTimestamp(),
                              });
                              // vaghti send kardim mire to address chats
                              history.replace("/chats");
                         }); //end of then
               }
          );
     };

     return (
          <div className='preview'>
               <CloseIcon onClick={closePreview} className='preview__close' />

               <div className='preview__toolbarRight'>
                    <TextFieldsIcon />
                    <CreateIcon />
                    <NoteIcon />
                    <MusicNoteIcon />
                    <AttachFileIcon />
                    <CropIcon />
                    <TimerIcon />
               </div>

               <img src={cameraImage} alt='image_preview' />

               <div className='preview__footer' onClick={sendPost}>
                    <h2>send now</h2>
                    <SendIcon size='small' className='preview__sendIcon' />
               </div>
          </div>
     );
}

export default Preview;
