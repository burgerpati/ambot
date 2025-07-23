const msg = document.getElementById('message');
msg.addEventListener('click', () => {
  msg.textContent = 'LOADING...';
  msg.style.animation = 'none';
  setTimeout(() => {
    startGame();
  }, 2000);
});

function startGame() {
  document.getElementById('screen').innerHTML = '<div style="color:#0f0;font-family:Press Start 2P">🎮 GAME ON!</div>';
  // Kick off the game loop or redirect here
}
