
const gallery = document.getElementById("memory-gallery");
const categories = document.querySelectorAll(".memory-category");

function openMemoryCollection(categoryKey) {
    const collection = memoryCollections[categoryKey];

    if (!collection || !gallery) return;

    gallery.replaceChildren();

    // Collection heading
    const heading = document.createElement("div");
    heading.className = "gallery-header";

    const title = document.createElement("h3");
    title.textContent = collection.title;

    const caption = document.createElement("p");
    caption.textContent = collection.caption;

    const closeButton = document.createElement("button");
    closeButton.className = "gallery-close";
    closeButton.textContent = "← BACK TO COLLECTIONS";
    closeButton.addEventListener("click", closeMemoryCollection);

    heading.append(title, caption, closeButton);
    gallery.appendChild(heading);

    // Build the photo collection automatically
    const photoTrack = document.createElement("div");
    photoTrack.className = "memory-photo-track";

   for (let i = 1; i <= collection.count; i++) {
    const filename = `${collection.prefix}-${String(i).padStart(2, "0")}.jpg`;

    const imagePath =
        `assets/photos/memories/${collection.folder}/${filename}`;

    const frame = document.createElement("div");
    frame.className = "polaroid";

    const inner = document.createElement("div");
    inner.className = "polaroid-inner";

    const front = document.createElement("div");
    front.className = "polaroid-front";

    const imageFrame = document.createElement("div");
    imageFrame.className = "polaroid-photo";

    const image = document.createElement("img");
    image.src = imagePath;
    image.alt = `Memory ${i}`;
    image.loading = "lazy";

    const note = document.createElement("p");
    note.textContent = "";

    imageFrame.appendChild(image);
    front.append(imageFrame, note);

    const back = document.createElement("div");
    back.className = "polaroid-back";

    const message = document.createElement("p");
    message.textContent =
        collection.messages?.[i - 1] || "Your little message goes here ♡";

    back.appendChild(message);

    inner.append(front, back);
    frame.appendChild(inner);

    frame.addEventListener("click", () => {
        if (!frame.classList.contains("is-lifted")) {
            frame.classList.add("is-lifted");
        } else if (!frame.classList.contains("is-flipped")) {
            frame.classList.add("is-flipped");
        } else {
            frame.classList.remove("is-flipped", "is-lifted");
        }
    });

    photoTrack.appendChild(frame);
}
    gallery.appendChild(photoTrack);

    gallery.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}
function closeMemoryCollection() {
    gallery.replaceChildren();

    const instruction = document.createElement("p");
    instruction.className = "gallery-instruction";
    instruction.textContent =
        "SELECT A COLLECTION TO OPEN ITS MEMORIES ♡";

    gallery.appendChild(instruction);
}

categories.forEach((category) => {
    category.addEventListener("click", () => {
        openMemoryCollection(category.dataset.category);
    });
});
// SEALED LETTER INTERACTION

const letterOverlay = document.getElementById("letter-overlay");
const letterKicker = document.getElementById("letter-kicker");
const letterTitle = document.getElementById("letter-title");
const letterContent = document.getElementById("letter-content");
const letterClose = document.querySelector(".letter-close");

const envelopes = document.querySelectorAll(".desk-envelope");

envelopes.forEach((envelope) => {
    envelope.addEventListener("click", () => {
        const letter = letters[envelope.dataset.letter];

        if (!letter) return;

        letterKicker.textContent = letter.kicker;
        letterTitle.textContent = letter.title;
        letterContent.textContent = letter.message;

        letterOverlay.classList.add("is-open");
        letterOverlay.setAttribute("aria-hidden", "false");
    });
});

function closeLetter() {
    letterOverlay.classList.remove("is-open");
    letterOverlay.setAttribute("aria-hidden", "true");
}

letterClose.addEventListener("click", closeLetter);

letterOverlay.addEventListener("click", (event) => {
    if (event.target === letterOverlay) {
        closeLetter();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLetter();
    }
});
// HER SKY — ANIMATED STARS

const skyCanvas = document.getElementById("constellation-canvas");

if (skyCanvas) {
    const ctx = skyCanvas.getContext("2d");

    let stars = [];
    const skyStartTime = performance.now();
    // SPECIAL STARS — LITTLE MESSAGES
const starMessages = [
    "the day everything changed",
    "a little light of her own",
    "made of softer things",
    "one in a universe",
    "my favourite constellation",
    "the world got brighter",
    "Miss Boss Lady ♡",
    "always worth finding",
    "a thousand little reasons",
    "the prettiest coincidence",
    "31 October, forever"
];
    const ozifaConstellation = [
    [0.22, 0.35],
    [0.31, 0.24],
    [0.40, 0.31],
    [0.48, 0.20],
    [0.57, 0.29],
    [0.65, 0.39],
    [0.76, 0.32],
    [0.68, 0.54],
    [0.54, 0.58],
    [0.42, 0.49],
    [0.32, 0.62]
];
    let animationFrame;

    function createStars() {
        const width = skyCanvas.clientWidth;
        const height = skyCanvas.clientHeight;

        skyCanvas.width = width * window.devicePixelRatio;
        skyCanvas.height = height * window.devicePixelRatio;

        ctx.setTransform(
            window.devicePixelRatio, 0, 0,
            window.devicePixelRatio, 0, 0
        );

        stars = Array.from({ length: 110 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.4,
            opacity: Math.random(),
           speed: Math.random() * 0.008 + 0.002,
phase: Math.random() * Math.PI * 2,
driftX: (Math.random() - 0.5) * 0.12,
driftY: (Math.random() - 0.5) * 0.12

        }));
    }

    function drawSky() {
        const width = skyCanvas.clientWidth;
        const height = skyCanvas.clientHeight;

        ctx.clearRect(0, 0, width, height);

        stars.forEach((star) => {
            star.phase += star.speed;
            star.x += star.driftX;
            if (star.x < 0) star.x = width;
if (star.x > width) star.x = 0;
if (star.y < 0) star.y = height;
if (star.y > height) star.y = 0;
star.y += star.driftY;

            const glow =
                0.25 + (Math.sin(star.phase) + 1) * 0.35;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

            ctx.fillStyle = `rgba(235, 224, 255, ${glow})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = "#b9caff";
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        // HER CONSTELLATION — GATHERING LIGHT



// HER CONSTELLATION — SLOWLY FORMING

const constellationPoints = ozifaConstellation.map(([x, y]) => ({
    x: x * width,
    y: y * height
}));

const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [4, 5], [5, 6], [5, 7], [7, 8],
    [8, 9], [9, 10], [10, 0]
];

const elapsed = (performance.now() - skyStartTime) / 1000;
const formation = Math.min(elapsed / 22, 1);

// Gradually draw each connecting line
connections.forEach(([a, b], i) => {
    const progress = Math.max(
        0,
        Math.min(1, formation * connections.length - i)
    );

    if (progress <= 0) return;

    const start = constellationPoints[a];
    const end = constellationPoints[b];

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(
        start.x + (end.x - start.x) * progress,
        start.y + (end.y - start.y) * progress
    );

   ctx.strokeStyle = `rgba(218, 203, 255, ${progress * 0.8})`;
ctx.shadowBlur = 10;
ctx.shadowColor = "#c6a8ff";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.shadowBlur = 0;
});

// Gradually reveal the constellation stars
// SPECIAL STARS — LITTLE MESSAGES
// DRAW INVISIBLE CLICK AREAS AROUND CONSTELLATION STARS
constellationPoints.forEach((point, i) => {
    const glow = Math.max(
        0,
        Math.min(1, formation * connections.length - i)
    );

    if (glow <= 0) return;

    ctx.beginPath();
    ctx.arc(point.x, point.y, 3 + glow * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 241, 214, ${glow})`;
    ctx.shadowBlur = 16;
    ctx.shadowColor = "#d9c5ff";
    ctx.fill();
    ctx.shadowBlur = 0;
});
ctx.strokeStyle = "rgba(218, 203, 255, 0.55)";
ctx.lineWidth = 1;
ctx.stroke();

// Draw the constellation stars
constellationPoints.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#fff1d6";
    ctx.shadowBlur = 16;
    ctx.shadowColor = "#d9c5ff";
    ctx.fill();
    ctx.shadowBlur = 0;
});

        animationFrame = requestAnimationFrame(drawSky);
    }

    createStars();
    drawSky();

    window.addEventListener("resize", createStars);
    // INTERACTIVE CONSTELLATION STARS

const starMessage = document.getElementById("star-message");
const starMessageText = document.getElementById("star-message-text");
const starMessageClose = document.querySelector(".star-message-close");

function handleSkyClick(event) {
    const rect = skyCanvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const width = skyCanvas.clientWidth;
    const height = skyCanvas.clientHeight;

    const points = ozifaConstellation.map(([x, y]) => ({
        x: x * width,
        y: y * height
    }));

    points.forEach((point, i) => {
        const distance = Math.hypot(mouseX - point.x, mouseY - point.y);

        if (distance < 22) {
            starMessageText.textContent = starMessages[i];
            starMessage.classList.add("is-visible");
        }
    });
}

skyCanvas.addEventListener("click", handleSkyClick);

starMessageClose.addEventListener("click", () => {
    starMessage.classList.remove("is-visible");
});
}
// SPECIAL CORNER — SCROLL REVEAL

const specialLetter = document.querySelector(".special-letter");

if (specialLetter) {
    const specialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                specialLetter.classList.add("is-visible");
                specialObserver.unobserve(specialLetter);
            }
        });
    }, {
        threshold: 0.25
    });

    specialObserver.observe(specialLetter);
}
// SNOOPY — RANDOM CAMEOS

const snoopy = document.getElementById("snoopy-cameo");
const snoopyImage = document.getElementById("snoopy-image");
const snoopyNote = document.getElementById("snoopy-note");

const snoopyImages = [
    "snoopy-01.png",
    "snoopy-02.png",
    "snoopy-03.png",
    "snoopy-04.png",
    "snoopy-05.png",
    "snoopy-06.png",
    "snoopy-07.png",
    "snoopy-08.png"
];

const snoopyMessages = [
    "She's pretty. just saying.",
    "Miss boss lady deserves a snack.",
    "Snoopy approves of this relationship.",
    "go give your man some attention.",
    "just checking on my favourite human.",
    "you two are kinda cute. unfortunately.",
    "friendly reminder: she's Ahsab's favourite person.",
    "alright, i'll leave you two alone."
];

function snoopyVisit() {
    const randomImage = Math.floor(Math.random() * snoopyImages.length);
    const randomMessage = Math.floor(Math.random() * snoopyMessages.length);

    snoopyImage.src =
        `assets/photos/snoopy/${snoopyImages[randomImage]}`;

    snoopyNote.textContent = snoopyMessages[randomMessage];

    const entersFromRight = Math.random() < 0.5;

snoopy.classList.remove("is-walking", "from-right");

snoopy.style.left = entersFromRight ? "auto" : "-220px";
snoopy.style.right = entersFromRight ? "-220px" : "auto";

void snoopy.offsetWidth;

if (entersFromRight) {
    snoopy.classList.add("from-right");
}

snoopy.classList.add("is-walking");

    setTimeout(() => {
        snoopy.classList.remove("is-walking");
    }, 12000);
}

// First appearance after 15 seconds
setTimeout(snoopyVisit, 15000);

// Return after a random cooldown
setInterval(() => {
    if (!snoopy.classList.contains("is-walking")) {
        snoopyVisit();
    }
}, 45000);