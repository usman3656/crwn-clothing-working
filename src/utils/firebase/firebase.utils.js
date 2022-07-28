import {initializeApp} from 'firebase/app';
import{getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,signInWithEmailAndPassword ,createUserWithEmailAndPassword,signOut,onAuthStateChanged} from 'firebase/auth'; 
import {getFirestore,doc,getDoc,setDoc,collection,writeBatch,query,getDocs} from 'firebase/firestore';

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

  export const addCollectionAndDocuments = async(collectionKey,objectsToAdd) =>{

    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc (collectionRef, object.title.toLowerCase())
      batch.set(docRef,object);

      
    });

    await batch.commit();
    console.log('done');
  }

  export const getCategoriesAndDocuments = async()=>{
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);
    
    const querySnapshot = await getDocs(q);
    const categoryMap=querySnapshot.docs.reduce((acc,docSnapshot)=>{
      const {title,items} = docSnapshot.data();
      acc[title.toLowerCase()]=items;
      return acc;
    },{})
    
    return categoryMap;

  }

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

  export const SignOutUser = async ()=> await signOut(auth);

  export const OnAuthStateChangedListener =(callback) => onAuthStateChanged(auth,callback);