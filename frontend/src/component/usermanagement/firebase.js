import firebase from 'firebase';

const firebaseConfig = {
 
    // Add your firebase credentials
    apiKey: "AIzaSyBAQHUCEQYdbHt-wLa5iN1Ha3pMG1AnVk4",
    authDomain: "fir-auth-c2b45.firebaseapp.com",
    projectId: "fir-auth-c2b45",
    storageBucket: "fir-auth-c2b45.appspot.com",
    messagingSenderId: "504758377293",
    appId: "1:504758377293:web:1a45712ca8b5b99699f504",
    measurementId: "G-CJZPP15SEQ"
};
 
firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();
export default { auth, firebase };