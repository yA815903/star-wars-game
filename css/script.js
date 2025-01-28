const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// Game variables
const player = { x: canvas.width / 2, y: canvas.height - 60, width: 50, height: 50, speed: 7, dx: 0 };
const bullets = [];
const enemies = [];
let score = 0;
let gameOver = false;

// Functions to draw elements
function drawPlayer() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
  ctx.fillStyle = 'yellow';
  bullets.forEach((bullet, index) => {
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    bullet.y -= bullet.speed;

    if (bullet.y < 0) bullets.splice(index, 1); // Remove bullets off-screen
  });
}

function drawEnemies() {
  ctx.fillStyle = 'red';
  enemies.forEach((enemy, index) => {
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    enemy.y += enemy.speed;

    if (enemy.y > canvas.height) {
      enemies.splice(index, 1); // Remove enemies off-screen
      gameOver = true;
    }
  });
}

// Collision detection
function detectCollision() {
  bullets.forEach((bullet, bulletIndex) => {
    enemies.forEach((enemy, enemyIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        // Remove both bullet and enemy
        bullets.splice(bulletIndex, 1);
        enemies.splice(enemyIndex, 1);
        score += 10;
      }
    });
  });
}

// UI
function drawUI() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);

  if (gameOver) {
    ctx.fillStyle = 'red';
    ctx.font = '50px Arial';
    ctx.fillText('GAME OVER', canvas.width / 2 - 150, canvas.height / 2);
    cancelAnimationFrame(animationId);
  }
}

// Movement
function movePlayer() {
  player.x += player.dx;

  // Prevent the player from going off-screen
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

// Spawning enemies
function spawnEnemy() {
  const size = 40;
  const x = Math.random() * (canvas.width - size);
  const speed = Math.random() * 3 + 1;
  enemies.push({ x, y: 0, width: size, height: size, speed });
}

// Keyboard input
function handleKeyDown(e) {
  if (e.key === 'ArrowLeft' || e.key === 'a') player.dx = -player.speed;
  if (e.key === 'ArrowRight' || e.key === 'd') player.dx = player.speed;
  if (e.key === ' ') {
    bullets.push({
      x: player.x + player.width / 2 - 5,
      y: player.y,
      width: 10,
      height: 20,
      speed: 10,
    });
  }
}

function handleKeyUp(e) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'a' || e.key === 'd') {
    player.dx = 0;
  }
}

// Game loop
let animationId;
function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  drawBullets();
  drawEnemies();
  detectCollision();
  drawUI();

  movePlayer();

  animationId = requestAnimationFrame(update);
}

// Event listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Spawn enemies every 1.5 seconds
setInterval(spawnEnemy, 1500);

// Start the game
update();
