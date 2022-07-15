
import { auth,signInWithGooglePopup,createUserDocumentFromAuth, signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './authentication.styles.scss'

const Authentication = ()=>{

    // useEffect(async () =>{
    //     const response = await getRedirectResult(auth);
    //     // console.log(response);
    // },[]);

   
    // const logGoogleRedirectUser = async () =>{
    //     const {user} = await signInWithGoogleRedirect();
    //     console.log(user);

    // };
   
    return(
    <div className="authentication-container">

        <SignInForm/>

        {/* <button onClick={logGoogleuser}>Sign in With Google Popup</button>     */}
        {/* <button onClick={signInWithGoogleRedirect}>Sign in With Google Redirect</button>     */}

        <SignUpForm/>
</div>

);
}
export default Authentication;