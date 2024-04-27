import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdTRT_cVbG7wgkgX1PBdIklERGQiOu_nw",
  authDomain: "linktree-1c527.firebaseapp.com",
  projectId: "linktree-1c527",
  storageBucket: "linktree-1c527.appspot.com",
  messagingSenderId: "998443397810",
  appId: "1:998443397810:web:b13e2f92a85d916481cfab",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
