const player = document.getElementById("player");
const hearts = document.querySelectorAll(".heart");
const message = document.getElementById("message");

let positionX = 50;
let velocityY = 0;
let jumping = false;

const gravity = 1;
const groundLevel = 50;

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
  hearts.forEach((heart) => {
    const heartX = parseInt(heart.style.left);
    const playerX = positionX;
    const playerY = parseInt(player.style.bottom);

    if (
      Math.abs(playerX - heartX) < 30 &&
      playerY < 100
    ) {
      heart.remove();
    }
  });

  // Check if all hearts collected
  if (document.querySelectorAll(".heart").length === 0) {
    message.style.display = "block";
  }

  requestAnimationFrame(update);
}

update();
