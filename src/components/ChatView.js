import "./chatView.css";
import { selectSelectedImage } from "./../features/appSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function ChatView() {
     const selectedImage = useSelector(selectSelectedImage);
     const history = useHistory();

     useEffect(() => {
          if (!selectedImage) exit();
     }, [selectedImage]);

     const exit = () => {
          history.replace("/chats");
     };

     return (
          <div className='chatView'>
               <img src={selectedImage} onClick={exit} alt='chat-view' />
               <div className='chatView__timer'>
                    <CountdownCircleTimer
                         isPlaying
                         duration={10}
                         strokeWidth={5}
                         size={50}
                         colors={[
                              ["#004777", 0.331],
                              ["#f7b801", 0.331],
                              ["#a30000", 0.331],
                         ]}
                    >
                         {({ remainingTime }) => {
                              if (remainingTime === 0) exit();
                         }}
                    </CountdownCircleTimer>
               </div>
          </div>
     );
}

export default ChatView;
