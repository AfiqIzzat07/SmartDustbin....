const fullnessText = document.getElementById('fullness-text');
const fill = document.getElementById('fill');
const statusDiv = document.getElementById('status');

const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');

const servoRef = database.ref('/dustbin/servo');
const fullnessRef = database.ref('/dustbin/fullness');

// Animate circle
function updateCircle(percent) {
  fullnessText.innerText = percent + '%';
  fill.style.transform = rotate(${(percent / 100) * 180}deg);
}

// Update fullness in real-time
fullnessRef.on('value', snapshot => {
  const percent = snapshot.val() || 0;
  updateCircle(percent);

  if (percent >= 80) {
    statusDiv.innerText = '🚨 FULL';
  } else if (percent <= 20) {
    statusDiv.innerText = '✅ CLEANED';
  } else {
    statusDiv.innerText = '🟢 OK';
  }
});

// Buttons
openBtn.addEventListener('click', () => {
  servoRef.set('OPEN');
});

closeBtn.addEventListener('click', () => {
  servoRef.set('CLOSE');
});

// Offline support
window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
});
