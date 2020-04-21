import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAjQZ0Cu6D0w-g5USoM80tl6CF11Cixiw8',
  authDomain: 'petracker-45420.firebaseapp.com',
  databaseURL: 'https://petracker-45420.firebaseio.com',
  projectId: 'petracker-45420',
  storageBucket: 'petracker-45420.appspot.com',
  messagingSenderId: '844836816501',
  appId: '1:844836816501:web:20900f9e0e233273809a3c',
  measurementId: 'G-B5JM94HTND',
};

const Firebase = firebase.initializeApp(firebaseConfig);
// ... before export default statement
export const db = firebase.firestore();

export default Firebase;
