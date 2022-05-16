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

const mapArr = [];

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
let playerDir = "";

document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

function keyDown(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
    playerDir = "right";
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
    playerDir = "left";
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
    playerDir = "up";
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
    playerDir = "down";
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
        // clearPlayer();
        drawPlayer();
      }
      x += 50;
    }
    x = 0;
    y += 50;
  }
  //   console.log(
  //   );
  if (rightPressed) {
    //   if (playerDir === 'right' &&
    // let corners =
    //   "mapArr[" +
    //   Math.floor(playerY / 50) +
    //   "][" +
    //   Math.floor((playerX - 25) / 50 + 1) +
    //   "]";
    if (
      playerDir === "right" &&
      map[Math.floor(playerY / 50)][Math.floor((playerX - 25) / 50) + 1] !== 1
    ) {
      //   (playerY + 25 && playerX + 26) <
      //   corners.x(playerY + 25 && playerX - 26) <
      //   corners.y
      // )
      //   console.log(corners);
      // checkCollision();
      // console.log(checkCollision());
      playerX += 10;
    }
  } else if (leftPressed) {
    if (
      playerDir === "left" &&
      map[Math.floor(playerY / 50)][Math.floor((playerX + 15) / 50) - 1] !== 1
    ) {
      playerX -= 10;
    }
  } else if (upPressed) {
    if (
      playerDir === "up" &&
      map[Math.floor((playerY + 15) / 50) - 1][Math.floor(playerX / 50)] !== 1
    ) {
      playerY -= 10;
    }
  } else if (downPressed) {
    if (
      playerDir === "down" &&
      map[Math.floor((playerY - 25) / 50) + 1][Math.floor(playerX / 50)] !== 1
    ) {
      playerY += 10;
    }
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
  ctx.beginPath();
  ctx.rect(playerX - 25, playerY - 25, tileSize, tileSize);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(playerX, playerY, 15, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

function makeMapArr() {
  for (i = 0; i < map.length; i++) {
    for (j = 0; j < map[i].length; j++) {
      if (map[i][j] == 1) {
        mapArr.push({ x: i * 50, y: j * 50 });
      }
    }
  }
}

makeMapArr();

// function moveX(e) {
//   let start = Date.now;
//   let timer = setInterval(function () {
//     let timePassed = Date.now() - start;
//     if (timePassed > 1000) {
//       clearInterval(timer);
//       return;
//     }
//     playerX += e;
//   });
// }

function checkCollision() {
  mapArr.forEach((map) => {
    // console.log(map);
    if (
      playerX < map.x + tileSize &&
      playerX + tileSize > map.x &&
      playerY < map.y + tileSize &&
      playerY + tileSize > map.y
    ) {
      return false;
    } else {
      return true;
    }
  });
}

checkCollision();

// function clearPlayer() {
//   ctx.beginPath();
//   ctx.rect(x, y, tileSize, tileSize);
//   ctx.fillStyle = "white";
//   ctx.fill();
//   ctx.closePath();
// }

setInterval(drawMap, 1000 / 40);
