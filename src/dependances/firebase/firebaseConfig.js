
  import firebase from 'firebase/app';
  import "firebase/auth";
  import "firebase/database";
  
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const app = firebase.initializeApp({
    apiKey: "AIzaSyCP0sDBk83SsP3jFdbdwrbxlRm-cxIB4w8",
    authDomain: "firespace-4ed8e.firebaseapp.com",
    databaseURL: "https://firespace-4ed8e-default-rtdb.firebaseio.com",
    projectId: "firespace-4ed8e",
    storageBucket: "firespace-4ed8e.appspot.com",
    messagingSenderId: "985652924802",
    appId: "1:985652924802:web:a291e45ceac2427d12ff9b"
  
  });




  export const auth = app.auth();
  export default app;