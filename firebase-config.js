// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

export const firebaseConfig = {
  apiKey: "AIzaSyBD990zggrFpi5Z2DwAOLShTjJUDN8ydBo",
  databaseURL: "https://smart-dustbin-150307-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
