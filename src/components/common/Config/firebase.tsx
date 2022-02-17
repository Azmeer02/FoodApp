import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAO1DBJeVxlD-YYVxz9kmN1qV12AII9sDs",
  authDomain: "food-app-2102c.firebaseapp.com",
  databaseURL: "https://food-app-2102c-default-rtdb.firebaseio.com",
  projectId: "food-app-2102c",
  storageBucket: "food-app-2102c.appspot.com",
  messagingSenderId: "325978850915",
  appId: "1:325978850915:web:081da165147b21856e1a56",
};
const app = firebase.initializeApp(firebaseConfig);
const fireStore = getFirestore(app);

export default fireStore;
