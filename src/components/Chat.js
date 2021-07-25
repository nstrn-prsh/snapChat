import { Avatar } from "@material-ui/core";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import ReactTimeago from "react-timeago";
import "./chat.css";

function Chat({ id, profilePic, username, timestamp, imageUrl, read }) {
     return (
          <div className='chat'>
               <Avatar className='chat__avatar' src={profilePic} />
               <div className='chat__info'>
                    <h4>{username}</h4>
                    <p>
                         tap to view -
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
