import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import firebase from "firebase";
import CloseIcon from "@material-ui/icons/Close";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";
import { db, storage } from "../utilise/firebase";
import { resetCameraImage, selectCameraImage } from "../features/cameraSlice";
import { selectUser } from "../features/appSlice";
import "./preview.css";

function Preview() {
     const cameraImage = useSelector(selectCameraImage);
     const user = useSelector(selectUser);
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
               .putString(cameraImage, "data_url");

          // firebase document
          uploadTask.on(
               "state_changed",
               null,
               (error) => {
                    console.log(`sendPost- uploadTask : ${error}`);
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
                                   username: user.username,
                                   read: false,
                                   profilePic:user.profilePic,
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
                    <SendIcon size='large' className='preview__sendIcon' />
               </div>
          </div>
     );
}

export default Preview;
