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

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const tileSize = 50;
canvas.height = map.length * tileSize;
canvas.width = map[0].length * tileSize;
let x = 0;
let y = 0;
let playerX = 475;
let playerY = 75;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

function keyDown(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
  }
}

function keyUp(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
  }
}

function drawMap() {
  for (i = 0; i < map.length; i++) {
    for (j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        drawPath();
      } else if (map[i][j] === 1) {
        drawWall();
      } else if (map[i][j] === 2) {
        drawPlayer();
      }
      x += 50;
    }
    x = 0;
    y += 50;
  }
  if (rightPressed) {
    playerX += 7;
  } else if (leftPressed) {
    playerX -= 7;
  } else if (upPressed) {
    playerY -= 7;
  } else if (downPressed) {
    playerY += 7;
  }
}

function drawPath() {
  ctx.beginPath();
  ctx.rect(x, y, tileSize, tileSize);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function drawWall() {
  ctx.beginPath();
  ctx.rect(x, y, tileSize, tileSize);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function drawPlayer() {
  ctx.clearRect(playerX - 25, playerY - 25, tileSize, tileSize);
  ctx.beginPath();
  ctx.arc(playerX, playerY, 18, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

setInterval(drawMap, 1000 / 60);
