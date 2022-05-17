/*
Tile Map **

Input Player

Keyboard Input

Collision Detection

Input Enemies

Enemy Collision

Enemy AI

Keep Score
*/

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let playerDir = "";

class Wall {
  constructor({ position }) {
    this.position = position;
    this.width = 50;
    this.height = 50;
  }
  drawMap() {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, 50, 50);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }
}

class Pellet {
  constructor({ position }, color) {
    this.position = position;
    this.color = color;
    this.size = 6;
    this.value = 0;
  }
  drawPellets() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }
}

class Player {
  constructor({ position, speed }) {
    this.position = position;
    this.speed = speed;
    this.size = 15;
  }
  drawPlayer() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
  }
  move() {
    this.drawPlayer();
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

canvas.width = map.length * 50;
canvas.height = map[0].length * 50;

const walls = [];
const pellets = [];

const player = new Player({
  position: {
    x: 75,
    y: 75,
  },
  speed: {
    x: 0,
    y: 0,
  },
});

for (i = 0; i < map.length; i++) {
  for (j = 0; j < map[i].length; j++) {
    if (map[i][j] === 1)
      walls.push(
        new Wall({
          position: {
            x: 50 * i,
            y: 50 * j,
          },
        })
      );
  }
}

walls.forEach((wall) => {
  wall.drawMap();
});

for (i = 0; i < map.length; i++) {
  for (j = 0; j < map[i].length; j++) {
    if (map[i][j] === 0)
      pellets.push(
        new Pellet({
          position: {
            x: 50 * i + 25,
            y: 50 * j + 25,
          },
        })
      );
  }
}

// pellets.forEach((pellet) => {
//   pellet.drawPellets("blue");
// });

player.drawPlayer();

document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

function keyDown(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
    player.speed.x = 50;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
    player.speed.x = -50;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
    player.speed.y = -50;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
    player.speed.y = 50;
  }
}

function keyUp(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
    player.speed.x = 0;
    // player.move();
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
    player.speed.x = 0;
    // player.move();
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
    player.speed.y = 0;
    // player.move();
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
    player.speed.y = 0;
    // player.move();
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  walls.forEach((wall) => {
    wall.drawMap();
    pellets.forEach((pellet) => {
      if (
        player.position.x === pellet.position.x &&
        player.position.y === pellet.position.y
      ) {
        pellet.value = 1;
      } else if (pellet.value === 0) {
        pellet.drawPellets();
      }
    });
    if (
      player.position.x + player.size >= wall.position.x &&
      player.position.x - player.size <= wall.position.x + wall.width &&
      player.position.y + player.size >= wall.position.y &&
      player.position.y - player.size <= wall.position.y + wall.height
    ) {
      if (rightPressed === true) {
        player.speed.x = -50;
      } else if (leftPressed === true) {
        player.speed.x = 50;
      } else if (upPressed === true) {
        player.speed.y = 50;
      } else if (downPressed === true) {
        player.speed.y = -50;
      }
    }
  });
  player.move();
  player.speed.x = 0;
  player.speed.y = 0;
}
animate();
