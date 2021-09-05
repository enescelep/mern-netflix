import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCGkSoC1wFiiYxlUXnADNDExLRGvK6TFh4",
  authDomain: "mern-netflix-e9b78.firebaseapp.com",
  projectId: "mern-netflix-e9b78",
  storageBucket: "mern-netflix-e9b78.appspot.com",
  messagingSenderId: "557276442352",
  appId: "1:557276442352:web:c2088d3ed909145c255c35",
  measurementId: "G-MZ977XM5DV"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
