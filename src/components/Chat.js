import { Avatar } from "@material-ui/core";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import ReactTimeago from "react-timeago";
import "./chat.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectImage } from "../features/appSlice";
import { db } from "../utilise/firebase";

function Chat({ id, profilePic, username, timestamp, imageUrl, read }) {
     const dispatch = useDispatch();
     const history = useHistory();

     const open = () => {
          // if (!read) {
               dispatch(selectImage(imageUrl));
               db.collection("posts")
                    .doc(id)
                    .set({ read: true }, { merge: true });
               history.push("/chats/view");
          // }
     };

     return (
          <div className='chat' onClick={open}>
               <Avatar className='chat__avatar' src={profilePic} />
               {/* middle section */}
               <div className='chat__info'>
                    <h4>{username}</h4>
                    <p>
                         {!read && "tap to view - "}
                         <ReactTimeago
                              date={new Date(timestamp?.toDate()).toUTCString()}
                         />
                    </p>
               </div>

               {!read && <StopRoundedIcon className='chat__readIcon' />}
          </div>
     );
}

export default Chat;
