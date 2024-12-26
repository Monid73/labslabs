var main_theme = new Audio("maintheme.mp3");
var coinsound = new Audio("coin.ogg");
var fallsound = new Audio("fall.ogg");
var stomp = new Audio("stomp.ogg");

let cloud = {
  speed: 5,
  y: 200,
  x: 0
};

let character = {
  x: 100,
  y: 645,
  speed: 5,
  canMove: true,
  isJumping: false,
  jumpSpeed: -15,
  gravity: 0.8,
  velocityY: 0
};

let enemy = {
  x: 400,
  y: 660,
  size: 50,
  speed: 3,
  alive: true
};

let coins = [
  { x: 150, y: 640, size: 20, collected: false },
  { x: 400, y: 640, size: 20, collected: false },
  { x: 650, y: 640, size: 20, collected: false }
];

let score = 0; //гребаный счетчик очков

function preload() {
  main_theme.volume = 0.5;
  main_theme.play();
  main_theme.loop();
  
}

function setup() {
  coinsound.volume = 0.2;
  fallsound.volume = 0.2;
  stomp.volume = 0.2;
  createCanvas(800, 800);

  
}

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
    circle(character.x - 10, character.y - 80, 45); //гребаная голова
    rect(character.x - 40, character.y - 60, 20, 60); //гребаная левая рука
    rect(character.x + 30, character.y - 60, 20, 60); //гребаная правая рука
  } else if (keyIsDown(68)) {
    circle(character.x + 10, character.y - 80, 45); //гребаная голова
    rect(character.x - 50, character.y - 60, 20, 60); //гребаная левая рука
    rect(character.x + 20, character.y - 60, 20, 60); //гребаная правая рука
  } else {
    circle(character.x, character.y - 80, 45); //гребаная голова
    rect(character.x - 50, character.y - 60, 20, 60); //гребаная левая рука
    rect(character.x + 30, character.y - 60, 20, 60); //гребаная правая рука
  }
  rect(character.x - 25, character.y - 60, 50, 80); //гребаная голова
  rect(character.x + 5, character.y + 15, 20, 27); // гребаная нога правая
  rect(character.x + 5, character.y + 30, 20, 27); // гребаная голень правая
  rect(character.x - 25, character.y + 15, 20, 27); // гребаная нога левая
  rect(character.x - 25, character.y + 30, 20, 27); // олень левая
}

function drawEnemy() 
{
  if (enemy.alive) {
    fill(0);
    rect(enemy.x, enemy.y - enemy.size + 40, enemy.size, enemy.size);
    enemy.x += enemy.speed;

    if (enemy.x <= 300 || enemy.x + enemy.size >= 800) {
      enemy.speed *= -1;
    }

    checkCollision();
  }
}

function drawCoins() {
  coins.forEach((coin) => 
  {
    if (!coin.collected) 
    {
      fill("#FFD700");
      ellipse(coin.x, coin.y, coin.size, coin.size);
    }
    
    else
    {
      fill("#FFD700");
      coin.x = int(random(300, 700));
      coin.y = int(random(500, 640));
      ellipse(coin.x, coin.y, coin.size, coin.size);
      coin.collected = false;
    }
  });
}

function checkCoinCollection() {
  coins.forEach((coin) => {
    if (
      !coin.collected &&
      character.x > coin.x - coin.size * 2 &&
      character.x < coin.x + coin.size * 2 &&
      character.y > coin.y - coin.size * 2 &&
      character.y < coin.y + coin.size * 4
    ) {
      coin.collected = true;
      coinsound.play();
      score += 1; // гребаное увеличение очков
      
    }
  });
}

function checkCollision() {
  if (enemy.alive) 
  {
    if (character.x + 25 > enemy.x && character.x - 25 < enemy.x + enemy.size && character.y + 5 >= enemy.y - enemy.size && character.y <= enemy.y) 
    {
      if (character.y + 5 < enemy.y - 10) 
      {
        if(character.x >= 500)
            {
              enemy.x = 350;
              score += 3;
              stomp.play();
            }
            
            else
            {
              enemy.x = 700;
              score += 3;
            }
        character.velocityY = -10;
      } 
      
      else 
      {
        character.x = 100;
        score = 0;
        fallsound.play();
      }
    }
  }
}



function draw() {
  
  background("#87CEEB");
  
  gameObjects.sceneryObjects.forEach((obj) => obj());
  
  cloud.x += cloud.speed;
  if (cloud.x > 800) {
    cloud.x = 0;
  }

  drawCharacter();
  drawEnemy();
  drawCoins();

  if (keyIsPressed && character.canMove) {
    Move();
  }
handleJump();
  checkCoinCollection(); // гребаная проверка сбора монет
if (character.x >= 220 && character.x <= 280 && character.y >= 645) {
    character.falling = true;
  }

  if (character.falling) {
    CanyonFall();
  }

  drawScore(); // гребаное отображение очков
}

function drawScore() {
  fill(0);
  textSize(24);
  text(`Score: ${score}`, 20, 30);
}

function Move() {
  if (keyIsDown(65) && character.x > 0) {
    character.x -= 8;
  }

  if (keyIsDown(68) && character.x < 800) {
    character.x += 8;
  }

  if (keyIsDown(32) && !character.isJumping) {
    character.isJumping = true;
    character.velocityY = character.jumpSpeed;
  }
}

function handleJump() {
  if (character.isJumping) {
    character.velocityY += character.gravity;
    character.y += character.velocityY;
    if (character.y >= 645) {
      character.y = 645;
      character.isJumping = false;
      character.velocityY = 0;
      
    }
  }
}

function CanyonFall() {
  character.y += 5;
  character.canMove = false;
  fallsound.play();

  if (character.y > 840) {
    character.canMove = true;
    character.x = 100;
    character.y = 645;
    character.falling = false;
  }
  
  score = 0;
}
