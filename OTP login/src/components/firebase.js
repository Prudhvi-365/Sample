import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoymh2z9dt9TTuFjV6SM1_AfVo9wg4pQU",
  authDomain: "resume-builder-6f66e.firebaseapp.com",
  projectId: "resume-builder-6f66e",
  storageBucket: "resume-builder-6f66e.appspot.com",
  messagingSenderId: "977245081187",
  appId: "1:977245081187:web:036f9117281d4ff770f256",
  measurementId: "G-X07WSD39MH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app, RecaptchaVerifier, signInWithPhoneNumber };
