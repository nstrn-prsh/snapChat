import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebcamCapture from "./components/WebcamCapture";
import Preview from "./components/Preview";
import Chats from "./components/Chats";
import ChatView from './components/ChatView';
import "./app.css";

function App() {
     return (
          <div className='app'>
               <Router>
                    <div className='app__body'>
                         <Switch>
                              <Route path='/chats/view'>
                                   <ChatView/>
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
               </Router>
          </div>
     );
}

export default App;
