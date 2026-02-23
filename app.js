import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBD990zggrFpi5Z2DwAOLShTjJUDN8ydBo",
  databaseURL: "https://smart-dustbin-150307-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

onValue(ref(db,"dustbin/fullness"), snap=>{
  const v = snap.val()||0;
  document.getElementById("fill").style.width = v+"%";
  document.getElementById("percent").innerText = v+"%";
});

window.openBin = ()=> set(ref(db,"dustbin/servo"),"OPEN");
window.closeBin = ()=> set(ref(db,"dustbin/servo"),"CLOSE");

window.addEventListener("offline",()=>document.getElementById("offline").hidden=false);
window.addEventListener("online",()=>document.getElementById("offline").hidden=true);
