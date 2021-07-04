import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyC-EeBmUimFmn3OJoYR2ThAKt26sAL2mnU",
  authDomain: "crwn-clothing-db-11ec8.firebaseapp.com",
  projectId: "crwn-clothing-db-11ec8",
  storageBucket: "crwn-clothing-db-11ec8.appspot.com",
  messagingSenderId: "181527111055",
  appId: "1:181527111055:web:35cd821c3a3bd86b78d7fa",
  measurementId: "G-W08V0QCHV1"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch(err) {
      console.log(`error creating user: ${err}`);
    }
  }

  return userRef;
}



firebase.initializeApp(config);

export const addCollectionsAndDocuments = async (collectionKey, objectToAdd) => {
  let collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectToAdd.forEach(obj => {
    const documentRef = collectionRef.doc();
    batch.set(documentRef, obj);
  })

  return await batch.commit();
}

export const convertSnapshotsCollectionToMap = collection => {
  const transformedCollection = collection.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      id: doc.id,
      routeName: encodeURI(title.toLowerCase()),
      title,
      items
    }
  })

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}


export const getCurrentUser = () => new Promise((resolve, reject) => {
  const unsubscribe = auth.onAuthStateChanged(userAuth => {
    unsubscribe();
    resolve(userAuth);
  }, reject)
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;