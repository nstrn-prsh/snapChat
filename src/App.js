import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebcamCapture from "./components/WebcamCapture";
import Preview from "./components/Preview";
import "./app.css";

function App() {
     return (
          <div className='app'>
               <Router>
                    <div className='app__body'>
                         <Switch>
                              <Route path='/Preview'>
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
