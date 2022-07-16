import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxJaEKko-Z5v98KVQ7wJeq4-6E30bN5qg",
  authDomain: "linkedin-clone-a7374.firebaseapp.com",
  projectId: "linkedin-clone-a7374",
  storageBucket: "linkedin-clone-a7374.appspot.com",
  messagingSenderId: "302973584031",
  appId: "1:302973584031:web:4c591ed0df3978fb1358aa",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };
export default db;
