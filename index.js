import React from 'react';
import { render } from 'react-dom';

import { doc, getFirestore } from 'firebase/firestore';
import {
  FirebaseAppProvider,
  FirestoreProvider,
  useFirestoreDocData,
  useFirestore,
  useFirebaseApp
} from 'reactfire';

import './style.css';

/**
 * Add your own Firebase config to watch the burrito status
 * update in real time!
 *
 * Once you add your config, go to the Firestore tab of the
 * Firebase console and create a collection called
 * "tryreactfire", and create a document inside that
 * collection called "burrito" with key "yummy"
 * and value "good" or "bad"
 */
const firebaseConfig = {
  apiKey: 'AIzaSyBg3u1sJlyJwQCE95oSDH_mtLABS-is8ZM',
  authDomain: 'rxfire-525a3.firebaseapp.com',
  databaseURL: 'https://rxfire-525a3.firebaseio.com',
  projectId: 'rxfire-525a3',
  storageBucket: 'rxfire-525a3.appspot.com',
  messagingSenderId: '844180061847',
  appId: '1:844180061847:web:12bb3f40c4174fb7'
};

function BurritoTaste() {
  // easily access the Firestore library
  const burritoRef = doc(useFirestore(), 'tryreactfire', 'burrito');

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(burritoRef);

  // easily check the loading status
  if (status === 'loading') {
    return <p>Fetching burrito flavor...</p>;
  }

  return <p>The burrito is {data.yummy ? 'good' : 'bad'}!</p>;
}

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <h1>🌯</h1>
      <BurritoTaste />
    </FirestoreProvider>
  );
}

render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>,
  document.getElementById('root')
);
