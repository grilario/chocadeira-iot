import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyABPnnpNd4gAogs_YeCbsZAGD1qaozj2Uk",
  authDomain: "chocadeira-68d24.firebaseapp.com",
  databaseURL: "https://chocadeira-68d24-default-rtdb.firebaseio.com",
  projectId: "chocadeira-68d24",
  storageBucket: "chocadeira-68d24.appspot.com",
  messagingSenderId: "747075073134",
  appId: "1:747075073134:web:d2e4c5427b2b48a284e27f",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
