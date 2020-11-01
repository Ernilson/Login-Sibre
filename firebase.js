import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyDYxokvPQ56W1GcJHA59Ln4Ci3TMhqB2BU",
    authDomain: "project-sibre.firebaseapp.com",
    databaseURL: "https://project-sibre.firebaseio.com",
    projectId: "project-sibre",
    storageBucket: "project-sibre.appspot.com",
    messagingSenderId: "491199925713",
    appId: "1:491199925713:web:223ff87885520ce8c824f0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig) 
    // firebase.analytics();   
   

  export default firebase;
  