import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


var config = {
    apiKey: "AIzaSyBf45-geCQ9oTJk_VCu2o0TFA94D3cfBOU",
    authDomain: "native-chat-5e977.firebaseapp.com",
    databaseURL: "https://native-chat-5e977.firebaseio.com",
    projectId: "native-chat-5e977",
    messagingSenderId: "827200911860",
    appId: "1:827200911860:web:c88e48ddfe323ad4"
};

firebase.initializeApp(config);

export default firebase;

// class Fire {

//   constructor() {
//     this.init();
//     this.observeAuth();
//   }

//   init = () => {
//     if (!firebase.apps.length) {
//       firebase.initializeApp({
//         apiKey: "AIzaSyBf45-geCQ9oTJk_VCu2o0TFA94D3cfBOU",
//         authDomain: "native-chat-5e977.firebaseapp.com",
//         databaseURL: "https://native-chat-5e977.firebaseio.com",
//         projectId: "native-chat-5e977",
//         storageBucket: "",
//         messagingSenderId: "827200911860",
//         appId: "1:827200911860:web:c88e48ddfe323ad4"
//       });
//     }
//   };

//   observeAuth = () =>
//     firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

//   onAuthStateChanged = user => {
//     if (!user) {
//       try {
//         firebase.auth().signInAnonymously();
//       } catch ({ message }) {
//         alert(message);
//       }
//     }
//   };

//   get uid() {
//     return (firebase.auth().currentUser || {}).uid;
//   }

//   get ref() {
//     return firebase.database().ref('messages');
//   }

//   parse = snapshot => {
//     const { timestamp: numberStamp, text, user } = snapshot.val();
//     const { key: _id } = snapshot;
//     const timestamp = new Date(numberStamp);
//     const message = {
//       _id,
//       timestamp,
//       text,
//       user,
//     };
//     return message;
//   };

//   on = callback =>
//     this.ref
//       .limitToLast(20)
//       .on('child_added', snapshot => callback(this.parse(snapshot)));

//   get timestamp() {
//     return firebase.database.ServerValue.TIMESTAMP;
//   }

//   // send the message to the Backend
//   send = messages => {
//     for (let i = 0; i < messages.length; i++) {
//       const { text, user } = messages[i];
//       const message = {
//         text,
//         user,
//         timestamp: this.timestamp,
//       };
//       this.append(message);
//     }
//   };

//   append = message => this.ref.push(message);

//   // close the connection to the Backend
//   off() {
//     this.ref.off();
//   }

// }

// Fire.shared = new Fire();
// export default Fire;
