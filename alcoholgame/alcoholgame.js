var ballx = 300;
var bally = 300;
var ballSize = 60;
var score = 0;
var gameState = "L1";

// переменные для картинок
var enemyImg;
var cursorImg;

// скорость врага
var enemySpeed = 2;

// с какого уровня враг начинает преследовать
var chaseMode = false;

function preload() {
  enemyImg = loadImage("enemy.png");
  cursorImg = loadImage("cursor.png");
}

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER);
  textSize(20);
  imageMode(CENTER);
  noCursor(); // скрываем обычный курсор
}

function draw() {
  if (gameState == "L1") {
    background(0, 255, 200);
    levelOne();
  } else if (gameState == "L2") {
    background(0, 255, 144);
    levelTwo();
  } else if (gameState == "L3") {
    background(0, 214, 121);
    levelThree();
  } else if (gameState == "L4") {
    background(0, 181, 102);
    levelFour();
  } else if (gameState == "L5") {
    background(0, 130, 73);
    levelFive();
  } else if (gameState == "WIN") {
    background(0, 89, 50);
    text("You win!", width / 2, height / 2);
  } else if (gameState == "LOSE") {
    background(120, 0, 0);
    text("You lose!", width / 2, height / 2);
  }

  fill(0);
  text("Score: " + score, width / 2, 40);

 
  image(cursorImg, mouseX, mouseY, 100, 100);
}

function levelOne() {
  text("Level 1", width / 2, height - 20);
  collectEnemy();

  // на 1 уровне враг стоит на месте
  drawEnemy();
}

function levelTwo() {
  text("Level 2", width / 2, height - 20);
  collectEnemy();

  // враг убегает
  runAwayFromCursor();
  drawEnemy();
}

function levelThree() {
  text("Level 3", width / 2, height - 20);
  collectEnemy();

  // враг убегает быстрее
  runAwayFromCursor();
  drawEnemy();
}

function levelFour() {
  text("Level 4", width / 2, height - 20);
  chaseCursor();
  checkLose();
  drawEnemy();
}

function levelFive() {
  text("Level 5", width / 2, height - 20);
  chaseCursorFast();
  checkLose();
  drawEnemy();
}

function collectEnemy() {
  var distToBall = dist(ballx, bally, mouseX, mouseY);

  if (distToBall < ballSize / 2) {
    ballx = random(ballSize / 2, width - ballSize / 2);
    bally = random(ballSize / 2, height - ballSize / 2);
    score = score + 1;
  }

  if (score > 5 && gameState == "L1") {
    gameState = "L2";
  }

  if (score > 10 && gameState == "L2") {
    gameState = "L3";
  }

  if (score > 15 && gameState == "L3") {
    gameState = "L4";
  }

  if (score > 20 && gameState == "L4") {
    gameState = "L5";
  }

  if (score > 30 && gameState == "L5") {
    gameState = "WIN";
  }
}

function runAwayFromCursor() {
  var dx = mouseX - ballx;
  var dy = mouseY - bally;
  var d = dist(ballx, bally, mouseX, mouseY);

  if (d > 0) {
    ballx -= (dx / d) * 2;
    bally -= (dy / d) * 2;
  }

  keepEnemyInside();
}

function chaseCursor() {
  var dx = mouseX - ballx;
  var dy = mouseY - bally;
  var d = dist(ballx, bally, mouseX, mouseY);

  if (d > 0) {
    ballx += (dx / d) * 2.5;
    bally += (dy / d) * 2.5;
  }

  keepEnemyInside();
}

function chaseCursorFast() {
  var dx = mouseX - ballx;
  var dy = mouseY - bally;
  var d = dist(ballx, bally, mouseX, mouseY);

  if (d > 0) {
    ballx += (dx / d) * 4;
    bally += (dy / d) * 4;
  }

  keepEnemyInside();
}

function checkLose() {
  var d = dist(ballx, bally, mouseX, mouseY);

  if (d < ballSize / 2) {
    gameState = "LOSE";
  }
}

function keepEnemyInside() {
  ballx = constrain(ballx, ballSize / 2, width - ballSize / 2);
  bally = constrain(bally, ballSize / 2, height - ballSize / 2);
}

function drawEnemy() {
  // если картинка загрузилась рисуем её
  if (enemyImg) {
    image(enemyImg, ballx, bally, 200, 200);
  } else {
    ellipse(ballx, bally, ballSize);
  }
}
