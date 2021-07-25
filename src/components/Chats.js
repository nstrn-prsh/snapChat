import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { useState, useEffect } from "react";
import { db } from "../utilise/firebase";
import "./chats.css";
import Chat from "./Chat";

function Chats() {
     const [posts, setPosts] = useState([]);

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

     return (
          <div className='chats'>
               <div className='chats__header'>
                    <Avatar className='chats__avatar' />
                    <div className='chats__search'>
                         <SearchIcon />
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
          </div>
     );
}

export default Chats;
