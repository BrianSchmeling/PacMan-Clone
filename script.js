const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const scoreOnPage = document.querySelector("#score");
const start = document.querySelector("#start");
const reset = document.querySelector("#reset");
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let playerDir = "";
let score = 0;

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

class PowerPellets {
  constructor({ position }, value) {
    this.position = position;
    this.size = 8;
    this.value = 2;
  }
  drawPowerPellets() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "aquamarine";
    ctx.fill();
    ctx.closePath();
  }
}

class Player {
  constructor({ position, speed }) {
    this.position = position;
    this.speed = speed;
    this.size = 18;
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

class Ghost {
  constructor({ position, speed }) {
    this.position = position;
    this.speed = speed;
  }
  drawGhost(e) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 7, 0, Math.PI * 2);
    ctx.fillStyle = e;
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 11, 0, Math.PI * 2);
    ctx.strokeStyle = e;
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 15, 0, Math.PI * 2);
    ctx.strokeStyle = e;
    ctx.stroke();
    ctx.closePath();
  }
  move() {
    // this.drawGhost();
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

const powerPellet = new PowerPellets({
  position: {
    x: 325,
    y: 275,
  },
});

const firstGhost = new Ghost({
  position: {
    x: 75,
    y: 475,
  },
  speed: {
    x: 0,
    y: 0,
  },
});

const secondGhost = new Ghost({
  position: {
    x: 525,
    y: 75,
  },
  speed: {
    x: 0,
    y: 0,
  },
});

const thirdGhost = new Ghost({
  position: {
    x: 525,
    y: 475,
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

player.drawPlayer();
firstGhost.drawGhost("red");
secondGhost.drawGhost("green");
thirdGhost.drawGhost("pink");

document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);
start.addEventListener("click", startGame);
reset.addEventListener("click", resetGame);

function ghostFollowsOne(e) {
  if (e.position.x < 550) {
    if (
      map[Math.floor(e.position.x / 50) + 1][Math.floor(e.position.y / 50)] !==
      1
    ) {
      e.speed.x = 50;
    } else if (
      map[Math.floor(e.position.x / 50)][Math.floor(e.position.y / 50) - 1] !==
      1
    ) {
      e.speed.y = -50;
    } else if (
      map[Math.floor(e.position.x / 50) - 1][Math.floor(e.position.y / 50)] !==
      1
    ) {
      e.speed.x = -50;
    } else if (
      map[Math.floor(e.position.x / 50)][Math.floor(e.position.y / 50) + 1] !==
      1
    ) {
      e.speed.y = 50;
    }
  }
}
function ghostFollowsTwo(e) {
  if (e.position.x < 550) {
    if (
      map[Math.floor(e.position.x / 50) - 1][Math.floor(e.position.y / 50)] !==
      1
    ) {
      e.speed.x = -50;
    } else if (
      map[Math.floor(e.position.x / 50)][Math.floor(e.position.y / 50) + 1] !==
      1
    ) {
      e.speed.y = 50;
    } else if (
      map[Math.floor(e.position.x / 50) + 1][Math.floor(e.position.y / 50)] !==
      1
    ) {
      e.speed.x = 50;
    } else if (
      map[Math.floor(e.position.x / 50)][Math.floor(e.position.y / 50) - 1] !==
      1
    ) {
      e.speed.y = -50;
    }
  }
}
function ghostFollowsThree(e) {
  if (e.position.x < 550) {
    if (
      map[Math.floor(e.position.x / 50)][Math.floor(e.position.y / 50) - 1] !==
      1
    ) {
      e.speed.y = -50;
    } else if (
      map[Math.floor(e.position.x / 50) + 1][Math.floor(e.position.y / 50)] !==
      1
    ) {
      e.speed.x = 50;
    } else if (
      map[Math.floor(e.position.x / 50)][Math.floor(e.position.y / 50) + 1] !==
      1
    ) {
      e.speed.y = 50;
    } else if (
      map[Math.floor(e.position.x / 50) - 1][Math.floor(e.position.y / 50)] !==
      1
    ) {
      e.speed.x = -50;
    }
  }
}
function ghostFollowsFour(e) {
  if (e.position.x < 550) {
    if (
      map[Math.floor(e.position.x / 50)][Math.floor(e.position.y / 50) + 1] !==
      1
    ) {
      e.speed.y = 50;
    } else if (
      map[Math.floor(e.position.x / 50) - 1][Math.floor(e.position.y / 50)] !==
      1
    ) {
      e.speed.x = -50;
    } else if (
      map[Math.floor(e.position.x / 50)][Math.floor(e.position.y / 50) - 1] !==
      1
    ) {
      e.speed.y = -50;
    } else if (
      map[Math.floor(e.position.x / 50) + 1][Math.floor(e.position.y / 50)] !==
      1
    ) {
      e.speed.x = 50;
    }
  }
}
function keyDown(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
    player.speed.x = 50;
    ghostFollowsOne(firstGhost);
    ghostFollowsFour(secondGhost);
    ghostFollowsThree(thirdGhost);
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
    player.speed.x = -50;
    ghostFollowsTwo(firstGhost);
    ghostFollowsThree(secondGhost);
    ghostFollowsFour(thirdGhost);
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
    player.speed.y = -50;
    ghostFollowsThree(firstGhost);
    ghostFollowsOne(secondGhost);
    ghostFollowsTwo(thirdGhost);
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
    player.speed.y = 50;
    ghostFollowsFour(firstGhost);
    ghostFollowsTwo(secondGhost);
    ghostFollowsOne(thirdGhost);
  }
}

function loseSpeed() {
  player.speed.x = 0;
  player.speed.y = 0;
  firstGhost.speed.x = 0;
  firstGhost.speed.y = 0;
  secondGhost.speed.x = 0;
  secondGhost.speed.y = 0;
  thirdGhost.speed.x = 0;
  thirdGhost.speed.y = 0;
}

function keyUp(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
    loseSpeed();
    // player.position.x = player.position.x - 10; // These lines fix the wall jumping, but make it very difficult to pick up the pellets
    // player.move();
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
    loseSpeed();
    // player.position.x = player.position.x + 10;
    // player.move();
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
    loseSpeed();
    // player.position.y = player.position.y + 10;
    // player.move();
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
    loseSpeed();
    // player.position.y = player.position.y - 10;
    // player.move();
  }
}

function scoreKeeper() {
  score = 0;
  pellets.filter((pellet) => {
    if (pellet.value === 1) {
      score++;
    }
  });
  return score;
}

function startGame() {
  animate();
}

function resetGame() {
  window.location.reload();
}
let timer;

function animate() {
  const startAnim = requestAnimationFrame(animate);
  startAnim;
  // let quitAnimation = requestAnimationFrame(animate);
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
      player.position.x === powerPellet.position.x &&
      player.position.y === powerPellet.position.y
    ) {
      powerPellet.value = 1;
      timer = 750;
      powerPellet.position.x = 1000;
      powerPellet.position.y = 1000;
    } else if (powerPellet.value === 2) {
      powerPellet.drawPowerPellets();
    }

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
    if (
      (player.position.x === firstGhost.position.x &&
        player.position.y === firstGhost.position.y) ||
      (player.position.x === secondGhost.position.x &&
        player.position.y === secondGhost.position.y) ||
      (player.position.x === thirdGhost.position.x &&
        player.position.y === thirdGhost.position.y)
    )
      if (timer > 0) {
        if (
          player.position.x === firstGhost.position.x &&
          player.position.y === firstGhost.position.y
        ) {
          firstGhost.position.x = 5000;
          firstGhost.position.y = 5000;
        } else if (
          player.position.x === secondGhost.position.x &&
          player.position.y === secondGhost.position.y
        ) {
          secondGhost.position.x = 5000;
          secondGhost.position.y = 5000;
        } else if (
          player.position.x === thirdGhost.position.x &&
          player.position.y === thirdGhost.position.y
        ) {
          thirdGhost.position.x = 5000;
          thirdGhost.position.y = 5000;
        }
      } else {
        window.cancelAnimationFrame(startAnim);
        alert("You lose");
        player.position.x = -50;
        player.position.y = -50;
      }
    else if (score === 59) {
      window.cancelAnimationFrame(startAnim);
      alert("You win");
      score = 0;
    }
  });
  scoreKeeper();
  scoreOnPage.innerText = `Score: ${score}`;
  player.move();
  firstGhost.move();
  secondGhost.move();
  thirdGhost.move();
  loseSpeed();
  if (timer > 0) {
    timer--;
    firstGhost.drawGhost("dodgerblue");
    secondGhost.drawGhost("dodgerblue");
    thirdGhost.drawGhost("dodgerblue");
  } else {
    firstGhost.drawGhost("red");
    secondGhost.drawGhost("green");
    thirdGhost.drawGhost("pink");
  }
}
