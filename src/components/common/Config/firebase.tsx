import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  /* Inciter Food Service */
  // apiKey: "AIzaSyBfUDwLU4KqK2ShmXAaVbUBMFpYZ4PpIWU",
  // authDomain: "inciter-food-service.firebaseapp.com",
  // databaseURL: "https://food-app-2102c-default-rtdb.firebaseio.com",
  // projectId: "inciter-food-service",
  // storageBucket: "inciter-food-service.appspot.com",
  // messagingSenderId: "262989786150",
  // appId: "1:262989786150:web:db9522a2ff300772bd4ae7",
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
