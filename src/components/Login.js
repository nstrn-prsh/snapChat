import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { auth, provider } from "../utilise/firebase";
import { login } from "../features/appSlice";
import snapLogo from "./../assets/pnghut_social-media-snapchat-silhouette.png";
import "./login.css";

function Login() {
     const dispatch = useDispatch();

     const signIn = () => {
          auth.signInWithPopup(provider)
               .then((result) => {
                    dispatch(
                         login({
                              username: result.user.username,
                              profilePic: result.user.photoURL,
                              id: result.user.uid,
                         })
                    );
               })
               .catch((error) => alert(error.message));
     };

     return (
          <div className='login'>
               <div className='login__container'>
                    <img src={snapLogo} alt='logo'/>
                    <Button variant='outlined' onClick={signIn}>
                         sign in
                    </Button>
               </div>
          </div>
     );
}

export default Login;
