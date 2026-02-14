// ==== CONFIGURE ====
const BOT_TOKEN = "8456561690:AAGdyXXTWpM_9LKriH6sjsaAz5CSYpiuXF4";   // Replace with your Telegram bot token
const CHAT_ID = "1730059618";       // Replace with your Telegram chat id

// Send Telegram notification
function sendTelegramNotification(message){
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  })
  .then(res=>res.json())
  .then(data=>console.log("Telegram sent:", data))
  .catch(err=>console.log(err));
}

// UI Elements
const statusEl = document.getElementById("status");
document.getElementById("simulateFull").addEventListener("click", ()=>{
  statusEl.textContent = "Status: FULL 🚨";
  sendTelegramNotification("🚨 Block A Dustbin is FULL!");
});
document.getElementById("simulateNotFull").addEventListener("click", ()=>{
  statusEl.textContent = "Status: Not Full ✅";
  sendTelegramNotification("✅ Block A Dustbin is not full yet.");
});

// Optional: auto-simulate every 10 sec for testing
setInterval(()=>{
  const full = Math.random() > 0.7; // 30% chance full
  if(full){
    statusEl.textContent = "Status: FULL 🚨";
    sendTelegramNotification("🚨 Block A Dustbin is FULL!");
  } else {
    statusEl.textContent = "Status: Not Full ✅";
  }
}, 10000);
