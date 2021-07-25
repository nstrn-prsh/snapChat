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
import { auth } from "./utilise/firebase"
import { useDispatch } from "react-redux";;

function App() {
     const user = useSelector(selectUser);
     const dispatch = useDispatch();

     useEffect(() => {
          auth.onAuthStateChanged((authUser) => {
               if (authUser) {
                    dispatch(
                         login({
                              username: authUser.user.displayName,
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
                         <div className='app__body'>
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
                    )}
               </Router>
          </div>
     );
}

export default App;
