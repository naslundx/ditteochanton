function rot13(message) {
  return message.replace(/[a-z]/gi, (letter) =>
    String.fromCharCode(
      letter.charCodeAt(0) + (letter.toLowerCase() <= "m" ? 13 : -13),
    ),
  );
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const addFirework = () => {
  let div = document.createElement("div");
  div.classList.add("firework");
  div.style.left = `${getRndInteger(30, 70)}%`;
  document.querySelector("#wedding").appendChild(div);
  if (document.querySelector("main").scrollTop > 10) {
    div.classList.add("hidden");
  }
};

const deobfuscateMail = () => {
  document.querySelectorAll("a.mailto").forEach((el) => {
    const original = el.innerText;
    const rotated = rot13(original);

    el.innerText = rotated;
    el.href = `mailto:${rotated}`;
  });
};

const resizeMap = () => {
  const header = document.querySelector("header");
  const buffer = document.querySelector("div#buffer");

  buffer.style.height = header.clientHeight + "px";

  const mapContainer = document.getElementById("map");
  const mapIframe = document.querySelector("#map iframe");

  mapIframe.style.width = mapContainer.clientWidth + "px";
  mapIframe.style.height =
    mapContainer.clientHeight - buffer.clientHeight + "px";
};

//document.addEventListener("resize", (event) => resizeMap());
//setTimeout(resizeMap, 10);

document.addEventListener("DOMContentLoaded", () => {
  deobfuscateMail();
});

/* start */
// Sequence the animations
function animateSequence() {
  const d = document.getElementById("d");
  const amp = document.getElementById("amp");
  const a = document.getElementById("a");
  const date = document.getElementById("date");
  const INITIAL_DELAY = 100;
  const DELAY = 900;

  setTimeout(() => d.classList.add("slide-left"), INITIAL_DELAY);
  setTimeout(() => amp.classList.add("slide-top"), INITIAL_DELAY + DELAY);
  setTimeout(() => a.classList.add("slide-right"), INITIAL_DELAY + DELAY * 2);
  setTimeout(
    () => date.classList.add("slide-bottom"),
    INITIAL_DELAY + DELAY * 3,
  );

  // Start showing notes after all text has appeared
  setTimeout(startNotes, 3200);
}

function startNotes() {
  const notes = ["♪", "♫", "♬", "♩"];

  setInterval(() => {
    const main = document.querySelector("main");
    const scrollButton = document.querySelector(".scroll-down-btn");
    const notAtTop = main.scrollTop > 0;
    scrollButton.style.opacity = !notAtTop ? "100%" : "0";
    if (notAtTop) {
      return;
    }

    const note = document.createElement("div");
    note.classList.add("note");
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    note.style.left = Math.random() * (window.innerWidth - 30) + "px";
    note.style.bottom = "-30px";
    note.style.color = "#4d5c45";

    const drift = Math.random() * 200 - 100 + "px";
    const rotate = Math.random() * 60 - 30 + "deg";
    note.style.setProperty("--drift", drift);
    note.style.setProperty("--rotate", rotate);
    note.style.animationDuration = 4 + Math.random() * 5 + "s";

    document.body.appendChild(note);

    setTimeout(() => note.remove(), 8000);
  }, 1200);
}

window.onload = animateSequence;

/* Fade in */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // fade in only once
    }
  });
});

document
  .querySelectorAll(".fade-in-on-scroll")
  .forEach((el) => observer.observe(el));

setTimeout(
  () => document.querySelector(".fade-in").classList.add("visible"),
  8000,
);
