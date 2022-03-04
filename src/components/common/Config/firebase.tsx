import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfUDwLU4KqK2ShmXAaVbUBMFpYZ4PpIWU",
  authDomain: "inciter-food-service.firebaseapp.com",
  // databaseURL: "https://food-app-2102c-default-rtdb.firebaseio.com",
  projectId: "inciter-food-service",
  storageBucket: "inciter-food-service.appspot.com",
  messagingSenderId: "262989786150",
  appId: "1:262989786150:web:db9522a2ff300772bd4ae7",
};
const app = firebase.initializeApp(firebaseConfig);
const fireStore = getFirestore(app);

export default fireStore;
