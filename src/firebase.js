import firebase from "firebase";

const firebaseConfig = {
     apiKey: "AIzaSyDggaYaw1li0MD67aAGk0l3T-yFZ5dOmrg",
     authDomain: "snapchat-clone-6109b.firebaseapp.com",
     projectId: "snapchat-clone-6109b",
     storageBucket: "snapchat-clone-6109b.appspot.com",
     messagingSenderId: "902755924057",
     appId: "1:902755924057:web:80bdbff00abc04076d5948",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// database
const db = firebaseApp.firestore();
// authentication
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
// storage for uploading
const storage = firebaseApp.storage();

export { db, auth, provider, storage };
