import {initializeApp} from 'firebase/app';
import{getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,signInWithEmailAndPassword ,createUserWithEmailAndPassword} from 'firebase/auth'; 
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCu7uv-NIoe7R79I5RY7bxgUEl7tincuRs",
    authDomain: "crwn-clothing-db-bb559.firebaseapp.com",
    projectId: "crwn-clothing-db-bb559",
    storageBucket: "crwn-clothing-db-bb559.appspot.com",
    messagingSenderId: "670702139976",
    appId: "1:670702139976:web:87ec4f70418969abc7367d"
  };
  
  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);
  
  const googleprovider = new GoogleAuthProvider();
  googleprovider.setCustomParameters({
    prompt : "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,googleprovider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleprovider);


  export const db = getFirestore();

  export const createUserDocumentFromAuth = async(
    userAuth,
    additionalInformation={}
    ) =>{
    if (!userAuth) return ;
    
        const userDocRef = doc(db,'users',userAuth.uid);
        console.log(userDocRef);

        const userSnapshot = await getDoc(userDocRef);
        console.log(userSnapshot);
        console.log(userSnapshot.exists());

        if(!userSnapshot.exists()){
            const{ displayName,email} = userAuth;
            const createdAt = new Date();

            try{
                await setDoc(userDocRef,
                    {
                        displayName,
                        email,
                        createdAt,
                        ...additionalInformation
                    });
                } catch(error){
                    console.log('error creating the user',error.message);
                }

        }

        return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email,password) => {

    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);
  }
  export const SignInAuthUserWithEmailAndPassword = async (email,password) => {

    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password);
  }