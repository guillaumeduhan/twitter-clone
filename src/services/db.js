import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
.initializeApp({
  apiKey: 'AIzaSyBQQloZi-smf4mMlx84DWI87As9303UJ_A',
  authDomain: 'twitter-clone-4d47c.firebaseapp.com',
  databaseURL: 'https://twitter-clone-4d47c.firebaseio.com',
  projectId: 'twitter-clone-4d47c',
  storageBucket: 'twitter-clone-4d47c.appspot.com',
  messagingSenderId: '836614726822',
  appId: '1:836614726822:web:6d290774d52bb5910a0067',
})
.firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })
