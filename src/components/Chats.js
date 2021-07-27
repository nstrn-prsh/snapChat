import SearchIcon from "@material-ui/icons/Search";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@material-ui/core";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { resetCameraImage } from "../features/cameraSlice";
import { selectUser } from "../features/appSlice";
import { auth, db } from "../utilise/firebase";
import Chat from "./Chat";
import "./chats.css";

function Chats() {
     const [posts, setPosts] = useState([]);
     const [search, setSearch] = useState([]);

     const user = useSelector(selectUser);
     const dispatch = useDispatch();

     const history = useHistory();

     // harmoghe ke db avaz mishe post ha update mishan ke ma akharin taghiiraro bebinim
     useEffect(() => {
          db.collection("posts")
               .orderBy("timestamp", "desc")
               .onSnapshot((snapshot) =>
                    setPosts(
                         snapshot.docs.map((doc) => ({
                              id: doc.id,
                              data: doc.data(),
                         }))
                    )
               );
     }, []);

     const takeSnap = () => {
          dispatch(resetCameraImage());
          history.push("/");
     };

     const searchFriends = (event) => {
          const target = event.target.value
          setSearch(target);
          console.log(target)
          posts.forEach(el=>{
               const value = el.data.username
               if (value.toLowerCase().includes(target.toLowerCase())){
              console.log('hi');
               }else{
                    console.log('bye');
               }
     })
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
                         <SearchIcon className='chats__searchIcon' />
                         <input
                              type='text'
                              placeholder='friends'
                              value={search}
                              onChange={(e) => searchFriends(e)}
                         />
                    </div>
                    <ChatBubbleIcon className='chats_chatIcon' />
               </div>
               <div className='chats__posts'>
                    {posts.map(
                         ({
                              data: {
                                   profilePic,
                                   username,
                                   timestamp,
                                   imageUrl,
                                   read,
                                   id
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
