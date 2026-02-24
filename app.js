// app.js
import { db } from "./firebase-config.js";
import { ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

/* ===== DOM ===== */
const circle = document.getElementById("circle");
const percentText = document.getElementById("percent");

/* ===== FULLNESS LISTENER ===== */
onValue(ref(db, "dustbin/fullness"), (snapshot) => {
  const value = snapshot.val();

  if (value === null) return;

  percentText.textContent = value + "%";
  circle.style.background =
    value >= 80 ? "#ff3b3b" : value <= 20 ? "#00ff9c" : "#ffaa00";
});

/* ===== SERVO BUTTONS ===== */
window.openBin = () => {
  set(ref(db, "dustbin/servo"), "OPEN");
};

window.closeBin = () => {
  set(ref(db, "dustbin/servo"), "CLOSE");
};
