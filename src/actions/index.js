import { auth, provider, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import db from "../firebase";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});
export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});
export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
});
export function signInApi() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(setUser(payload.user));
        console.log(payload.user.uid);
      })
      .catch((error) => alert(error.message));
  };
}
export function signOutApi() {
  return (dispatch) => {
    signOut(auth, provider)
      .then(() => {
        dispatch(setUser(null));
        localStorage.removeItem("token");
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function getUserAuth() {
  return (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser());
      }
    });
  };
}

export function postArticleAPI(payload) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    var downloadURL = "";
    const imageRef = ref(storage, `images/${payload.image.name}`);
    const collectionRef = collection(db, "posts");

    if (payload.image !== "") {
      uploadBytes(imageRef, payload.image)
        .then(async (snapshot) => {
          console.log("Image Uploaded");
          downloadURL = await getDownloadURL(imageRef).then((url) => {
            return url;
          });
          await addDoc(collectionRef, {
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg: downloadURL,
            comments: 0,
            description: payload.description,
          });
          dispatch(setLoading(false));
        })
        .catch((error) => console.log(error.code));
    } else if (payload.video) {
      await addDoc(collectionRef, {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: "",
        comments: 0,
        description: payload.description,
      });
      dispatch(setLoading(false));
    }
  };
}

export function getArticlesAPI() {
  return async (dispatch) => {
    let payload = [];
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("actor.date", "desc"));
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        payload.push({ ...doc.data(), id: doc.id });
      });
      dispatch(getArticles(payload));
    });
  };
}
