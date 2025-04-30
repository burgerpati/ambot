const player = document.getElementById("player");
const hearts = document.querySelectorAll(".heart");
const truckContainer = document.getElementById("truck-container");
const message = document.getElementById("message");
const introScreen = document.getElementById("intro-screen");

let positionX = 50;
let velocityY = 0;
let jumping = false;
let heartsCollected = 0;
const gravity = 1;
const groundLevel = 50;

const heartMessages = [
  "It’s not just a game...",
  "You were meant to find this.",
  "The journey is just beginning..."
];

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "d") {
    positionX += 10;
  }
  if (e.key === "ArrowLeft" || e.key === "a") {
    positionX -= 10;
  }
  if ((e.key === "ArrowUp" || e.key === "w") && !jumping) {
    velocityY = -20;
    jumping = true;
  }
  if (e.key === "Enter" && introScreen) {
    introScreen.style.display = "none";
  }
});

function update() {
  // Gravity
  velocityY += gravity;
  player.style.bottom = `${parseInt(player.style.bottom || "50") - velocityY}px`;

  // Ground collision
  if (parseInt(player.style.bottom) <= groundLevel) {
    player.style.bottom = `${groundLevel}px`;
    velocityY = 0;
    jumping = false;
  }

  // Horizontal move
  player.style.left = `${positionX}px`;

  // Heart collection
  hearts.forEach((heart, index) => {
    const heartX = parseInt(heart.style.left);
    const playerX = positionX;
    const playerY = parseInt(player.style.bottom);

    if (
      Math.abs(playerX - heartX) < 30 &&
      playerY < 100
    ) {
      heart.remove();
      heartsCollected++;
      showHeartMessage(index);
    }
  });

  // Check if all hearts collected
  if (heartsCollected === hearts.length) {
    showTruckAndMessage();
  }

  requestAnimationFrame(update);
}

function showHeartMessage(index) {
  message.textContent = heartMessages[index];
  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
  }, 2000);
}

function showTruckAndMessage() {
  truckContainer.style.width = "100%";
  truckContainer.style.opacity = 1;
  message.textContent = "The Love Truck has arrived!";
  message.style.display = "block";
}

update();
