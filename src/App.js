import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebcamCapture from "./components/WebcamCapture";
import Preview from "./components/Preview";
import Chats from "./components/Chats";
import ChatView from "./components/ChatView";
import { useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./components/Login";
import "./app.css";
import { useEffect } from "react";
import { auth } from "./utilise/firebase";
import { useDispatch } from "react-redux";
// import snapLogo from "./assets/pnghut_social-media-snapchat-silhouette.png";

function App() {
     const user = useSelector(selectUser);
     const dispatch = useDispatch();

     useEffect(() => {
          auth.onAuthStateChanged((authUser) => {
               if (authUser) {
                    dispatch(
                         login({
                              username: authUser.user.username,
                              profilePic: authUser.user.photoURL,
                              id: authUser.user.uid,
                         })
                    );
               } else {
                    dispatch(logout());
               }
          });
     }, []);

     return (
          <div className='app'>
               <Router>
                    {!user ? (
                         <Login />
                    ) : (
                         <>
                              {/* <img
                                   src={snapLogo}
                                   alt='upper-logo'
                                   className='app__logo'
                              /> */}
                              <div className='app__body'>
                                   <div className='body__bodyBG'>
                                        <Switch>
                                             <Route path='/chats/view'>
                                                  <ChatView />
                                             </Route>
                                             <Route path='/chats'>
                                                  <Chats />
                                             </Route>
                                             <Route path='/preview'>
                                                  <Preview />
                                             </Route>
                                             <Route path='/' exact>
                                                  <WebcamCapture />
                                             </Route>
                                        </Switch>
                                   </div>
                              </div>
                         </>
                    )}
               </Router>
          </div>
     );
}

export default App;
