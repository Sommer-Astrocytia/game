let score1 = 0;
let score2 = 0;
const max = 12;
let gameOver = false;

let lastScore1 = -1;
let lastScore2 = -1;

function drawStars() {
    if (gameOver || (score1 === lastScore1 && score2 === lastScore2)) return;

    lastScore1 = score1;
    lastScore2 = score2;

    const s1 = document.getElementById("stars1");
    const s2 = document.getElementById("stars2");
    const winner = document.getElementById("winner");

    winner.textContent = "";

    updateStars(s1, score1, "left");
    updateStars(s2, score2, "right");

    if (score1 === max && !gameOver) {
        winner.textContent = "LYKKE VINDER!";
        animateWinnerStars(s1);
        gameOver = true;
    }

    if (score2 === max && !gameOver) {
        winner.textContent = "SARA VINDER!";
        animateWinnerStars(s2);
        gameOver = true;
    }
}

function updateStars(container, score, side) {
    const existing = container.querySelectorAll(".star-wrapper");
    const diff = score - existing.length;

    if (diff > 0) {
        for (let i = existing.length; i < score; i++) {
            const wrapper = document.createElement("div");
            wrapper.classList.add("star-wrapper");
            wrapper.style[side] = `${i * 50}px`;
            wrapper.style.animation = "float 2s ease-in-out infinite";
            wrapper.style.animationDelay = `${i * 0.2}s`;
            wrapper.style.position = "absolute";

            const star = document.createElement("model-viewer");
            star.src = "gold_star.glb";
            star.setAttribute("disable-tap", "");
            star.setAttribute("interaction-prompt", "none");
            star.style.width = "50px";
            star.style.height = "50px";

            wrapper.appendChild(star);
            container.appendChild(wrapper);
        }
    } else if (diff < 0) {
        for (let i = 0; i < -diff; i++) {
            container.removeChild(container.lastChild);
        }
    }
}

function animateWinnerStars(container) {
    const wrappers = container.querySelectorAll(".star-wrapper");
    const pokal = document.querySelector(".pokal");
    const pokalRect = pokal.getBoundingClientRect();

    pokal.querySelector("model-viewer").style.transition = "transform 1s ease";
    pokal.querySelector("model-viewer").style.transform = "scale(2)";

    wrappers.forEach((el, i) => {
        const starRect = el.getBoundingClientRect();

        const deltaX = pokalRect.left + pokalRect.width / 2 - (starRect.left + starRect.width / 2);
        const deltaY = pokalRect.top + pokalRect.height / 2 - (starRect.top + starRect.height / 2);

        el.style.animation = "none";
        el.style.transition = `transform 1s cubic-bezier(0.25, -0.4, 0.5, 1.5) ${i * 0.1}s, opacity 1s ease ${i * 0.1}s`;
        el.style.transform = `translate(${deltaX}px, ${deltaY - 50}px) scale(0.3)`;
        el.style.opacity = "0";
    });
}

document.addEventListener("keydown", (e) => {
    if (gameOver) return;

    if (e.key === "a" && score1 < max) score1++;
    if (e.key === "x" && score1 > 0) score1--;
    if (e.key === "l" && score2 < max) score2++;
    if (e.key === "m" && score2 > 0) score2--;
    drawStars();
});

function resetGame() {
    score1 = 0;
    score2 = 0;
    lastScore1 = -1;
    lastScore2 = -1;
    gameOver = false;

    const winner = document.getElementById("winner");
    winner.textContent = "";

    const pokal = document.querySelector(".pokal model-viewer");
    pokal.style.transform = "scale(1)";
    pokal.style.transition = "none";

    const s1 = document.getElementById("stars1");
    const s2 = document.getElementById("stars2");
    s1.innerHTML = "";
    s2.innerHTML = "";

    drawStars();
}

drawStars();
