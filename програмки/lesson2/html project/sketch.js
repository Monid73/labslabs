let x = 200;
let y = 550;
let speed = 5;
let jumpSpeed = -15;
let gravity = 0.8;
let velocityY = 0; 
let isJumping = false; 

function setup() {
  createCanvas(1200, 750);
}

function draw() {
    noStroke();
  background("#87CEEB"); // Небо
  
  fill ("#32CD32"); // Цвет травы
  rect (0, 600, 1200, 150); // Трава
  
  fill ("#FFFF00"); // Цвет солнца
  ellipse (100, 100, 100); // Солнце
  
  stroke("#FFFF00");
  strokeWeight(25);
  line (100, 110, 20, 20); //лево-верх
  line (100, 100, 100, 10); //верх
  line (100, 110, 180, 20); //право-верх
  line (100, 100, 200, 100); //право
  line (100, 100, 180, 180); //право-вниз
  line (100, 100, 100, 200); //вниз
  line (100, 100, 20, 180); //лево-вниз
  line (100, 100, 10, 100); //лево-вниз
  
  noStroke();
  fill ("#696969");
  rect (550, 150, 150, 450); //Вершина
  
  fill ("#808080");
  rect (450, 250, 150, 350); //Вершина
  rect (650, 250, 150, 350);
  
  fill ("#A9A9A9");
  rect (350, 350, 150, 250); //Вершина
  rect (750, 350, 150, 250);
  
  fill ("#C0C0C0");
  rect (250, 450, 150, 150); //Вершина
  rect (850, 450, 150, 150);
  
  noStroke();
  fill ("#8B4513");
  rect (1000, 450, 100, 200); //Дерево
  
  fill ("#006400");
  triangle (1050, 300, 950, 500, 1150, 500); // лист ниже
  fill ("#008000")
  triangle (1050, 300, 950, 400, 1150, 400); // лист выше
  
  fill("#FF7F50");
  triangle (770, 500, 720, 600, 820, 600); // Препятствие
    
  // Персонаж
  fill("red");
  rect(x - 15, y - 60, 40, 90); // Тело
  fill("black");
  ellipse(x + 5, y - 85, 40); // Голова


  // Управление
    if (keyIsDown(65)) { // Влево
    x -= 5;
    rect(x - 20, y + 35, 15, 50); // Левая нога
    rect(x + 10, y + 35, 15, 50); // Правая нога
    rect(x - 35, y - 55, 15, 50); // Левая рука
    rect(x + 30, y - 60, 15, 50); // Правая рука
  } else if (keyIsDown(68)) { // Вправо
    x += 5;
    rect(x - 15, y + 35, 15, 50); // Левая нога
    rect(x + 15, y + 35, 15, 50); // Правая нога
    rect(x - 35, y - 60, 15, 50); // Левая рука
    rect(x + 30, y - 55, 15, 50); // Правая рука
  } else {
    rect(x - 15, y + 35, 15, 50); // Левая нога
    rect(x + 10, y + 35, 15, 50); // Правая нога
    rect(x - 35, y - 60, 15, 50); // Левая рука
    rect(x + 30, y - 60, 15, 50); // Правая рука
  }

  // Прыжок
  if (isJumping) {
    velocityY += gravity; 
    y += velocityY;
    
    if (y >= 550) {
      y = 550;
      isJumping = false;
      velocityY = 0;
    }
  } else if (keyIsDown(87)) {
    isJumping = true;
    velocityY = jumpSpeed;
  }
}