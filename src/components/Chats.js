import SearchIcon from "@material-ui/icons/Search";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@material-ui/core";
import { selectUser } from "../features/appSlice";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { auth, db } from "../utilise/firebase";
import Chat from "./Chat";
import "./chats.css";
import { resetCameraImage } from "../features/cameraSlice";

function Chats() {
     const [posts, setPosts] = useState([]);

     const user = useSelector(selectUser);
     const dispatch = useDispatch();

     const history = useHistory();

     // harmoghe ke db avaz mishe post ha update mishan ke ma akharin taghiiraro bebinim
     useEffect(() => {
          db.collection("posts")
               .orderBy("timestamp", "desc")
               .onSnapshot((snapshot) =>
                    setPosts(
                         snapshot.doc.map((docs) => ({
                              id: docs.id,
                              data: docs.data(),
                         }))
                    )
               );
     }, []);

     const takeSnap = ()=>{
          dispatch(resetCameraImage())
          history.push('/')
     }

     return (
          <div className='chats'>
               <div className='chats__header'>
                    <Avatar
                         className='chats__avatar'
                         src={user.profilePic}
                         onClick={() => auth.signOut()}
                    />
                    <div className='chats__search'>
                         <SearchIcon className="chats__searchIcon" />
                         <input type='text' placeholder='friends' />
                    </div>
                    <ChatBubbleIcon className='chats_chatIcon' />
               </div>
               <div className='chats__posts'>
                    {posts.map(
                         ({
                              id,
                              data: {
                                   profilePic,
                                   username,
                                   timestamp,
                                   imageUrl,
                                   read,
                              },
                         }) => (
                              <Chat
                                   key={id}
                                   id={id}
                                   profilePic={profilePic}
                                   username={username}
                                   timestamp={timestamp}
                                   imageUrl={imageUrl}
                                   read={read}
                              />
                         )
                    )}
               </div>

               <RadioButtonUncheckedIcon
               className='chats__takePicIcon'
               onClick={takeSnap}
               fontSize='large'
                />
          </div>
     );
}

export default Chats;
