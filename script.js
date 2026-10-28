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

music.play()
  .then(() => {
    musicButton.classList.add("playing");
    musicLabel.textContent = "PAUSE MUSIC";
    musicButton.setAttribute("aria-label", "Pause background music");
  })
  .catch((error) => {
    console.log("Music playback was blocked:", error);
    musicButton.classList.remove("playing");
    musicLabel.textContent = "PLAY MUSIC";
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



// Romantic falling petals
const petalLayer = document.createElement("div");
petalLayer.className = "petal-layer";
petalLayer.setAttribute("aria-hidden", "true");
document.body.appendChild(petalLayer);

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!reducedMotion) {
  for (let i = 0; i < 14; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";

    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${12 + Math.random() * 12}s`;
    petal.style.animationDelay = `${-Math.random() * 20}s`;

    petalLayer.appendChild(petal);
  }
}

// Reveal invitation sections as visitors scroll
const revealTargets = document.querySelectorAll(
  ".photo-section, .countdown-section, .details-section, .closing-section"
);

if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((section) => {
    section.classList.add("reveal-on-scroll");
    revealObserver.observe(section);
  });
}


/* ==========================================
   WEDDING GUESTBOOK — SUPABASE CONNECTION
========================================== */

// STEP 1: Replace these two values with your Supabase project details.
const SUPABASE_URL = "https://vrvukhfjphqrijiwlgmz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_zpYrhTNGTjaVoW3I1Aj9Wg_8uSJFlds";

const guestbookForm = document.getElementById("guestbookForm");
const guestName = document.getElementById("guestName");
const guestMessage = document.getElementById("guestMessage");
const guestbookSubmit = document.getElementById("guestbookSubmit");
const guestbookStatus = document.getElementById("guestbookStatus");
const guestbookMessages = document.getElementById("guestbookMessages");
const guestbookLoading = document.getElementById("guestbookLoading");
const guestbookEmpty = document.getElementById("guestbookEmpty");
const messageCount = document.getElementById("messageCount");

const GUESTBOOK_TABLE = "guestbook_messages";
const MAX_VISIBLE_MESSAGES = 30;

function guestbookIsConfigured() {
  return (
    SUPABASE_URL.startsWith("https://") &&
    !SUPABASE_URL.includes("YOUR_SUPABASE") &&
    SUPABASE_ANON_KEY.length > 20 &&
    !SUPABASE_ANON_KEY.includes("YOUR_SUPABASE")
  );
}

function guestbookHeaders(extraHeaders = {}) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    ...extraHeaders
  };
}

// Keep the character counter updated.
guestMessage.addEventListener("input", () => {
  messageCount.textContent = String(guestMessage.value.length);
});

// Load only messages approved for public display.
async function loadGuestbookMessages() {
  guestbookLoading.classList.remove("hidden");
  guestbookEmpty.classList.add("hidden");
  guestbookMessages.replaceChildren();

  if (!guestbookIsConfigured()) {
    guestbookLoading.textContent =
      "The guestbook will be available soon.";
    return;
  }

  try {
    const url = new URL(
      `/rest/v1/${GUESTBOOK_TABLE}`,
      SUPABASE_URL
    );

    url.searchParams.set("select", "id,name,message,created_at");
    url.searchParams.set("approved", "eq.true");
    url.searchParams.set("order", "created_at.desc");
    url.searchParams.set("limit", String(MAX_VISIBLE_MESSAGES));

    const response = await fetch(url, {
      method: "GET",
      headers: guestbookHeaders()
    });

    if (!response.ok) {
      throw new Error("Could not load approved messages.");
    }

    const messages = await response.json();

    guestbookLoading.classList.add("hidden");

    if (!messages.length) {
      guestbookEmpty.classList.remove("hidden");
      return;
    }

    const fragment = document.createDocumentFragment();

    messages.forEach((message) => {
      const card = document.createElement("article");
      card.className = "guest-message";

      const quote = document.createElement("p");
      quote.textContent = message.message;

      const footer = document.createElement("footer");
      footer.textContent = `WITH LOVE, ${message.name}`;

      const date = document.createElement("time");
      const parsedDate = new Date(message.created_at);

      if (!Number.isNaN(parsedDate.getTime())) {
        date.dateTime = parsedDate.toISOString();
        date.textContent = parsedDate.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: "Africa/Cairo"
        });
      }

      footer.appendChild(date);
      card.append(quote, footer);
      fragment.appendChild(card);
    });

    guestbookMessages.appendChild(fragment);
  } catch (error) {
    guestbookLoading.textContent =
      "We couldn't load the wishes right now. Please try again later.";

    console.error("Guestbook loading error:", error);
  }
}

// Submit a new message for approval.
guestbookForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = guestName.value.trim();
  const message = guestMessage.value.trim();

  if (name.length < 2 || name.length > 50) {
    guestbookStatus.textContent =
      "Please enter a name between 2 and 50 characters.";
    return;
  }

  if (message.length < 3 || message.length > 500) {
    guestbookStatus.textContent =
      "Your wish must be between 3 and 500 characters.";
    return;
  }

  if (!guestbookIsConfigured()) {
    guestbookStatus.textContent =
      "The guestbook is not connected yet. Please try again later.";
    return;
  }

  guestbookSubmit.disabled = true;
  guestbookSubmit.querySelector("span:first-child").textContent =
    "Sending...";
  guestbookStatus.textContent = "";

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/${GUESTBOOK_TABLE}`,
      {
        method: "POST",
        headers: guestbookHeaders({
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        }),
        body: JSON.stringify({
          name,
          message,
          approved: false
        })
      }
    );

    if (!response.ok) {
      throw new Error("Message submission failed.");
    }

    guestbookForm.reset();
    messageCount.textContent = "0";

    guestbookStatus.textContent =
      "Thank you for your lovely wish! It will appear after approval. ♡";
  } catch (error) {
    guestbookStatus.textContent =
      "We couldn't send your wish. Please check your connection and try again.";

    console.error("Guestbook submission error:", error);
  } finally {
    guestbookSubmit.disabled = false;
    guestbookSubmit.querySelector("span:first-child").textContent =
      "Send Your Wishes";
  }
});

// Load the guestbook when the page is ready.
loadGuestbookMessages();