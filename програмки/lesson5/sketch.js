let cloud = {
  speed: 5,
  y: 200,
  x: 0
};

let character = {
  x: 100,
  y: 700,
  speed: 5,
  canMove: true,
  isJumping: false,
  jumpSpeed: -15,
  gravity: 0.8,
  velocityY: 0
};

let gameObjects = {
  sceneryObjects: [
    function drawCloud() {
      noStroke();
      fill(255);
      circle(cloud.x, cloud.y, 50);
      circle(cloud.x - 20, cloud.y + 5, 40);
      circle(cloud.x + 20, cloud.y + 2, 45);
    },

    function drawMountain() {
      noStroke();
      fill("#696969");
      rect(500, 400, 100, 300);

      fill("#808080");
      rect(420, 450, 100, 300);
      rect(580, 450, 100, 300);

      fill("#A9A9A9");
      rect(340, 500, 100, 300);
      rect(660, 500, 100, 300);

      fill("#C0C0C0");
      rect(260, 550, 100, 300);
      rect(740, 550, 100, 300);
    },

    function drawGround() {
      fill("#32CD32");
      rect(0, 700, 800, 100);
    },

    function drawCanyon() {
      fill(0);
      square(200, 700, 100);
    }
  ]
};

function drawCharacter() {
  fill(250, 250, 0);
  if (keyIsDown(65)) {
    circle(character.x - 10, character.y - 80, 45); // Голова
    rect(character.x - 40, character.y - 60, 20, 60); // Левая рука
    rect(character.x + 30, character.y - 60, 20, 60); // Правая рука
  } else if (keyIsDown(68)) {
    circle(character.x + 10, character.y - 80, 45); // Голова
    rect(character.x - 50, character.y - 60, 20, 60); // Левая рука
    rect(character.x + 20, character.y - 60, 20, 60); // Правая рука
  } else {
    circle(character.x, character.y - 80, 45); // Голова
    rect(character.x - 50, character.y - 60, 20, 60); // Левая рука
    rect(character.x + 30, character.y - 60, 20, 60); // Правая рука
  }
  rect(character.x - 25, character.y - 60, 50, 80); // Тело
  rect(character.x + 5, character.y + 15, 20, 27); // Нога правая
  rect(character.x + 5, character.y + 30, 20, 27); // Голень правая
  rect(character.x - 25, character.y + 15, 20, 27); // Нога левая
  rect(character.x - 25, character.y + 30, 20, 27); // Голень левая
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background("#87CEEB");
  gameObjects.sceneryObjects.forEach((obj) => obj());

  // Обновление позиции облака
  cloud.x += cloud.speed;
  if (cloud.x > 800) {
    cloud.x = 0;
  }

  // Отрисовка персонажа
  drawCharacter();

  // Движение персонажа
  if (keyIsPressed && character.canMove) {
    Move();
  }

  // Прыжок
  handleJump();

  // Падение в каньон
  if (character.x >= 220 && character.x <= 280 && character.y >= 700) {
    character.falling = true;
  }

  if (character.falling) {
    CanyonFall();
  }
}

function Move() {
  if (keyIsDown(65) && character.x > 0) {
    character.x -= 8;
  }

  if (keyIsDown(68) && character.x < 800) {
    character.x += 8;
  }

  if (keyIsDown(87) && !character.isJumping) {
    character.isJumping = true;
    character.velocityY = character.jumpSpeed;
  }
}

function handleJump() {
  if (character.isJumping) {
    character.velocityY += character.gravity; // Применение гравитации
    character.y += character.velocityY;

    if (character.y >= 700) {
      character.y = 700; // Наземление персонажа
      character.isJumping = false;
      character.velocityY = 0;
    }
  }
}

function CanyonFall() {
  character.y += 5;
  character.canMove = false;

  if (character.y > 840) {
    character.canMove = true;
    character.x = 100;
    character.y = 700;
    character.falling = false;
  }
}
