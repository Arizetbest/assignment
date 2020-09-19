import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsIkH2_wQ2c6IzAkgy0oanPFlBdUmRFeQ",
  authDomain: "arize-38ace.firebaseapp.com",
  databaseURL: "https://arize-38ace.firebaseio.com",
  projectId: "arize-38ace",
  storageBucket: "arize-38ace.appspot.com",
  messagingSenderId: "1044452629955",
  appId: "1:1044452629955:web:18f693e92f0b7e82097176",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
