// ---------------------- IMPORT FIREBASE ----------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";

// ---------------------- CONFIG ----------------------
const firebaseConfig = {
  apiKey: "AIzaSyBD990zggrFpi5Z2DwAOLShTjJUDN8ydBo",
  authDomain: "smart-dustbin-150307.firebaseapp.com",
  databaseURL: "https://smart-dustbin-150307-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-dustbin-150307",
  storageBucket: "smart-dustbin-150307.firebasedatabase.app",
  messagingSenderId: "470186830441",
  appId: "1:470186830441:web:9355f4e1c10e498b26d0f8"
};

// ---------------------- INITIALIZE ----------------------
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ---------------------- REFERENCES ----------------------
const fullnessRef = ref(database, '/dustbin/fullness');
const servoRef = ref(database, '/dustbin/servo');

// ---------------------- DOM ELEMENTS ----------------------
const fullnessText = document.getElementById('fullness-text');
const fill = document.getElementById('fill');
const statusDiv = document.getElementById('status');
const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');

// ---------------------- UPDATE CIRCLE ----------------------
function updateCircle(percent) {
  fullnessText.innerText = percent + '%';
  fill.style.transform = rotate(${(percent / 100) * 180}deg);
}

// ---------------------- REAL-TIME FULLNESS ----------------------
onValue(fullnessRef, snapshot => {
  const percent = snapshot.val() || 0;
  updateCircle(percent);

  if (percent >= 80) statusDiv.innerText = '🚨 FULL';
  else if (percent <= 20) statusDiv.innerText = '✅ CLEANED';
  else statusDiv.innerText = '🟢 OK';
});

// ---------------------- BUTTONS ----------------------
openBtn.addEventListener('click', () => set(servoRef, 'OPEN'));
closeBtn.addEventListener('click', () => set(servoRef, 'CLOSE'));
