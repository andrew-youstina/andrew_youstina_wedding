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



// WEDDING GUESTBOOK
// Replace these placeholders with your actual Supabase project URL and public key.
const SUPABASE_URL = "https://vrvukhfjphqrijiwlgmz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_zpYrhTNGTjaVoW3I1Aj9Wg_8uSJFlds";
const GUESTBOOK_TABLE = "guestbook_messages";
const MESSAGES_PER_SPREAD = 2;
const guestbookForm = document.getElementById("guestbookForm");
const guestName = document.getElementById("guestName");
const guestMessage = document.getElementById("guestMessage");
const guestWebsite = document.getElementById("guestWebsite");
const guestbookSubmit = document.getElementById("guestbookSubmit");
const guestbookStatus = document.getElementById("guestbookStatus");
const guestbookPages = document.getElementById("guestbookPages");
const guestbookLoading = document.getElementById("guestbookLoading");
const guestbookEmpty = document.getElementById("guestbookEmpty");
const guestbookPrev = document.getElementById("guestbookPrev");
const guestbookNext = document.getElementById("guestbookNext");
const guestbookPageLabel = document.getElementById("guestbookPageLabel");
const messageCount = document.getElementById("messageCount");
let guestbookAllMessages = [];
let guestbookPageIndex = 0;
function guestbookIsConfigured() {
  return (
    SUPABASE_URL.startsWith("https://") &&
    !SUPABASE_URL.includes("YOUR_SUPABASE") &&
    SUPABASE_ANON_KEY.length > 20 &&
    !SUPABASE_ANON_KEY.includes("YOUR_SUPABASE")
  );
}
function guestbookHeaders(extra = {}) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    ...extra
  };
}
function makeBookPage(message, pageNumber) {
  const page = document.createElement("article");
  page.className = `book-page ${
    pageNumber % 2 ? "book-page-left" : "book-page-right"
  }`;
  const number = document.createElement("p");
  number.className = "page-number";
  number.textContent = String(pageNumber);
  page.appendChild(number);
  if (!message) {
    const empty = document.createElement("p");
    empty.className = "book-empty-page";
    empty.textContent = "A page waiting\nfor a lovely wish.";
    page.appendChild(empty);
    return page;
  }
  const text = document.createElement("p");
  text.className = "book-message";
  text.textContent = message.message;
  const author = document.createElement("p");
  author.className = "book-author";
  author.appendChild(document.createTextNode(`With love, ${message.name}`));
  const date = document.createElement("time");
  date.className = "book-date";
  const parsed = new Date(message.created_at);
  if (!Number.isNaN(parsed.getTime())) {
    date.dateTime = parsed.toISOString();
    date.textContent = parsed.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Africa/Cairo"
    });
  }
  author.appendChild(date);
  page.append(text, author);
  return page;
}
function renderGuestbook() {
  const start = guestbookPageIndex * MESSAGES_PER_SPREAD;
  const current = guestbookAllMessages.slice(
    start,
    start + MESSAGES_PER_SPREAD
  );
  guestbookPages.replaceChildren(
    makeBookPage(current[0], start + 1),
    makeBookPage(current[1], start + 2)
  );
  const total = guestbookAllMessages.length;
  const first = total ? start + 1 : 0;
  const last = Math.min(start + MESSAGES_PER_SPREAD, total);
  guestbookPageLabel.textContent = total
    ? `Messages ${first}–${last} of ${total}`
    : "No messages yet";
  guestbookPrev.disabled = guestbookPageIndex <= 0;
  guestbookNext.disabled =
    start + MESSAGES_PER_SPREAD >= total;
}
async function loadguestMessages() {
  guestbookLoading.classList.remove("hidden");
  guestbookEmpty.classList.add("hidden");
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
    url.searchParams.set("limit", "200");
    const response = await fetch(url, {
      method: "GET",
      headers: guestbookHeaders()
    });
    if (!response.ok) {
      throw new Error(
        `Guestbook read failed (${response.status})`
      );
    }
    guestbookAllMessages = await response.json();
    guestbookPageIndex = 0;
    guestbookLoading.classList.add("hidden");
    guestbookEmpty.classList.toggle(
      "hidden",
      guestbookAllMessages.length > 0
    );
    renderGuestbook();
  } catch (error) {
    guestbookLoading.textContent =
      "We couldn't load the wishes right now. Please try again later.";
    console.error("Guestbook loading error:", error);
  }
}
if (guestMessage && messageCount) {
  guestMessage.addEventListener("input", () => {
    messageCount.textContent = String(
      guestMessage.value.length
    );
  });
}
if (guestbookPrev) {
  guestbookPrev.addEventListener("click", () => {
    if (guestbookPageIndex > 0) {
      guestbookPageIndex--;
      renderGuestbook();
    }
  });
}
if (guestbookNext) {
  guestbookNext.addEventListener("click", () => {
    if (
      (guestbookPageIndex + 1) * MESSAGES_PER_SPREAD <
      guestbookAllMessages.length
    ) {
      guestbookPageIndex++;
      renderGuestbook();
    }
  });
}
if (guestbookForm) {
  guestbookForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = guestName.value.trim();
    const message = guestMessage.value.trim();
    if (guestWebsite && guestWebsite.value.trim()) {
      return;
    }
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
            approved: true
          })
        }
      );
      if (!response.ok) {
        throw new Error(
          `Message submission failed (${response.status}): ${await response.text()}`
        );
      }
      guestbookForm.reset();
      if (messageCount) {
        messageCount.textContent = "0";
      }
      guestbookStatus.textContent =
        "Your wish is in the book! Thank you for being part of our story. ♡";
      await loadguestMessages();
      document.getElementById("guestbook").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } catch (error) {
      guestbookStatus.textContent =
        "We couldn't send your wish. Please try again in a moment.";
      console.error("Guestbook submission error:", error);
    } finally {
      guestbookSubmit.disabled = false;
      guestbookSubmit.querySelector("span:first-child").textContent =
        "Send Your Wishes";
    }
  });
  loadguestMessages();
}