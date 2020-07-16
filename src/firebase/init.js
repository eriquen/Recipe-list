  import firebase from 'firebase'
  import firestore from 'firebase/firestore'
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDJS7DlTTJ6SyxYxeDlsDXlqrAR0i-SStg",
    authDomain: "ingredient-book.firebaseapp.com",
    databaseURL: "https://ingredient-book.firebaseio.com",
    projectId: "ingredient-book",
    storageBucket: "ingredient-book.appspot.com",
    messagingSenderId: "294403171300",
    appId: "1:294403171300:web:1b01326828fa7d2d3e1df1",
    measurementId: "G-J3YPVC73GG"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp.firestore();