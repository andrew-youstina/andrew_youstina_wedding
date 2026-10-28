// CUSTOMIZE YOUR MAP LINKS HERE:
const CHURCH_MAP_URL = "https://maps.app.goo.gl/bKgd3b7zEdSf4jvUA"; // Paste the Google Maps link for St. George & St. Abraam Church between the quotes.
const HALL_MAP_URL = "https://maps.app.goo.gl/fnUjwDs8rVpj7ux9A";   // Paste the Google Maps link for Almasa Hall between the quotes.

const churchMap = document.getElementById("churchMap");
const hallMap = document.getElementById("hallMap");

function setMapLink(element, url) {
  if (url && url.trim()) {
    element.href = url.trim();
    element.target = "_blank";
  } else {
    element.href = "https://www.google.com/maps";
    element.addEventListener("click", (event) => {
      event.preventDefault();
    });
  }
}
setMapLink(churchMap, CHURCH_MAP_URL);
setMapLink(hallMap, HALL_MAP_URL);

const envelope = document.getElementById("envelope");
const openInvite = document.getElementById("openInvite");
const envelopeScreen = document.getElementById("envelopeScreen");
const invitation = document.getElementById("invitation");
openInvite.addEventListener("click", () => {
  envelope.classList.add("open");
  window.setTimeout(() => {
    envelopeScreen.classList.add("hidden");
    invitation.classList.remove("hidden");
    window.scrollTo({top: 0, behavior: "smooth"});
  }, 1000);
  const music = document.getElementById("backgroundMusic");

music.play().catch((error) => {
    console.log("Music playback was blocked:", error);
});
});

// إضافة علامات التنصيص حول التاريخ
const weddingDate = new Date("2026-11-07T15:00:00+03:00").getTime(); 

function updateCountdown() { 
    let diff = weddingDate - Date.now(); 

    if (diff <= 0) { 
        // إضافة علامات تنصيص حول أسماء الـ IDs ونصوص الأصفار
        document.getElementById("days").textContent = "00"; 
        document.getElementById("hours").textContent = "00"; 
        document.getElementById("minutes").textContent = "00"; 
        document.getElementById("seconds").textContent = "00"; 
        return; 
    } 

    const d = Math.floor(diff / 86400000); 
    const h = Math.floor((diff % 86400000) / 3600000); 
    const m = Math.floor((diff % 3600000) / 60000); 
    const s = Math.floor((diff % 60000) / 1000); 

    // إضافة علامات تنصيص حول أسماء الـ IDs
    document.getElementById("days").textContent = String(d).padStart(2, "0"); 
    document.getElementById("hours").textContent = String(h).padStart(2, "0"); 
    document.getElementById("minutes").textContent = String(m).padStart(2, "0"); 
    document.getElementById("seconds").textContent = String(s).padStart(2, "0"); 
}

// تأكد من تشغيل الدالة كل ثانية لتحديث العداد
setInterval(updateCountdown, 1000);

updateCountdown();
setInterval(updateCountdown, 1000);

const audio = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicLabel = document.getElementById("musicLabel");
musicButton.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicButton.classList.add("playing");
      musicLabel.textContent = "PAUSE MUSIC";
      musicButton.setAttribute("aria-label", "Pause background music");
    } catch (e) {
      alert("Add your music file as audio/music.mp3, then try again.");
    }
  } else {
    audio.pause();
    musicButton.classList.remove("playing");
    musicLabel.textContent = "PLAY MUSIC";
    musicButton.setAttribute("aria-label", "Play background music");
  }
});
