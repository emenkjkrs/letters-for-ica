
const openButton = document.getElementById("openLetter");
const envelope = document.getElementById("envelope");
const musicButton = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
const music = document.getElementById("backgroundMusic");
const readAgainButton = document.getElementById("readAgain");
const progressBar = document.getElementById("progressBar");

// Open the letter

/* Open the letter and play music */

openButton.addEventListener("click", async () => {
  console.log("Open my letter diklik");

  envelope.classList.add("open");
  openButton.textContent = "Let's read together ♡";
  openButton.disabled = true;

  console.log("Audio source:", music.currentSrc || "Belum ditemukan");

  try {
    music.muted = false;
    await music.play();

    musicLabel.textContent = "Music on";
    musicButton.setAttribute("aria-pressed", "true");

    console.log("Musik berhasil diputar");
  } catch (error) {
    musicLabel.textContent = "Music off";
    console.error("Gagal memutar musik:", error);
  }

  window.setTimeout(() => {
    document.getElementById("letter-1").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 650);
});


// Reveal letters when they enter the screen
const revealSections = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealSections.forEach((section) => {
    observer.observe(section);
  });
} else {
  revealSections.forEach((section) => {
    section.classList.add("visible");
  });
}

// Reading progress bar
function updateProgress() {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    scrollableHeight > 0
      ? (window.scrollY / scrollableHeight) * 100
      : 0;

  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

window.addEventListener("scroll", updateProgress, {
  passive: true
});

window.addEventListener("resize", updateProgress);
updateProgress();

// Optional background music
musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicLabel.textContent = "Music on";
      musicButton.setAttribute("aria-pressed", "true");
    } catch (error) {
      musicLabel.textContent = "Add music file";
      console.error("Music could not be played:", error);
    }
  } else {
    music.pause();
    musicLabel.textContent = "Music off";
    musicButton.setAttribute("aria-pressed", "false");
  }
});

// Return to the beginning
readAgainButton.addEventListener("click", () => {
  envelope.classList.remove("open");
  openButton.disabled = false;
  openButton.innerHTML = 'Open my letter <span>→</span>';

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
