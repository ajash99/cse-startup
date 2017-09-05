var leftX=10, leftY=200;
var rightX=670, rightY=200;
var ballX=350, ballY=250;
var ballSpeedY=5, ballSpeedX=5, speedConstant=3;
var leftPoints=0, rightPoints=0;
var bounces=0, recordBounces = 0;

function setup() {
  createCanvas(700,500);
  background(0);
  
  //Initial Ball Direction
  if(random() > .5)
    ballSpeedX = -(random(2)+speedConstant);
  else
    ballSpeedX = random(2)+speedConstant;
  if(random() > .5)
    ballSpeedY = random(2)+speedConstant;
  else
    ballSpeedY = -(random(2)+speedConstant);
}

function draw() {
  background(0);
  noStroke();
  
  //Points
  fill(255);
  textSize(50);
  text(leftPoints,0,40);
  text(rightPoints,670,40);
  text(bounces,340,250);
  textSize(20);
  text("Record Bounces: "+recordBounces,275,490);
  
  //Paddles
  fill(0,0,255);
  rect(leftX,leftY,10,80);
  rect(rightX,rightY,10,80);
  if(leftPoints < 5 && rightPoints < 5)
    paddleMovement();
  
  //Ball
  fill(255,20,147);
  ellipse(ballX,ballY,20,20);
  if(leftPoints < 5 && rightPoints < 5)
    ballMovement();
  
  win();
}

function paddleMovement() {
  //Left Paddle
  if(keyIsDown(87) && leftY > 0) {
    leftY -= 4;
  }
  if(keyIsDown(83) && leftY < 420) {
    leftY += 4;
  }
  
  //Right Paddle
  if(keyIsDown(UP_ARROW) && rightY > 0) {
    rightY -= 4;
  }
  if(keyIsDown(DOWN_ARROW) && rightY < 420) {
    rightY += 4; 
  }
}

function ballMovement() {
  //Right Scores
  if(ballX <= 0) { 
    rightPoints += 1;
    ballX=350; ballY=250;
    if(bounces > recordBounces)
      recordBounces = bounces;
    bounces = 0;
    if(random() > .5)
      ballSpeedX = -(random(2)+speedConstant);
    else
      ballSpeedX = random(2)+speedConstant;
    if(random() > .5)
      ballSpeedY = random(2)+speedConstant;
    else
      ballSpeedY = -(random(2)+speedConstant);
  }
  
  //Left Scores
  if(ballX >= width) { 
    leftPoints += 1;
    ballX=350; ballY=250;
    if(bounces > recordBounces)
      recordBounces = bounces;
    bounces = 0;
    if(random() > .5)
      ballSpeedX = -(random(2)+speedConstant);
    else
      ballSpeedX = random(2)+speedConstant;
    if(random() > .5)
      ballSpeedY = random(2)+speedConstant;
    else
      ballSpeedY = -(random(2)+speedConstant);
  }
  
  //Paddle rebounds
  if(ballX+10 > rightX && ballY+10 > rightY && ballY-10 < rightY+80) { //Right Front
    ballSpeedX = -(random(2)+speedConstant);
    bounces++;
  }
  if(ballY+10 > rightY && ballX-10 > rightX && ballX+10 < rightX+10) { //Right Top
    ballSpeedY = -(random(2)+speedConstant);
    bounces++;
  }
  if(ballY-10 < rightY+80 && ballX-10 > rightX && ballX+10 < rightX+10) { //Right Bottom
    ballSpeedY = random(2)+speedConstant;
    bounces++;
  }
  
  if(ballX-10 < leftX+10 && ballY+10 > leftY && ballY-10 < leftY+80) { //Left Front
    ballSpeedX = random(2)+speedConstant;
    bounces++;
  }
  if(ballY+10 > leftY && ballX-10 > leftX && ballX+10 < leftX+10) { //Left Top
    ballSpeedY = -(random(2)+speedConstant);
    bounces++;
  }
  if(ballY-10 < leftY+80 && ballX-10 > leftX && ballX+10 < leftX+10) { //Left Bottom
    ballSpeedY = random(2)+speedConstant;
    bounces++;
  }
  
  //Top and Bottom Wall Rebounds
  if(ballY+10 > height) { //Bottom
    ballSpeedY = -(random(2)+speedConstant);
  }
  if(ballY-10 < 0) { //Top
    ballSpeedY = random(2)+speedConstant;
  }
  
  //Movement
  ballX += ballSpeedX;
  ballY += ballSpeedY;
}

function win() {
  //LeftWin
  if(leftPoints >= 5) {
    fill(0);
    rect(0,0,width,height);
    fill(255);
    textSize(50);
    text("Left Player Wins!",150,220);
    textSize(20);
    text("Press ENTER to restart",220,280);
    
    //Record bounces
    text("Record Bounces: "+recordBounces,240,490);
    text("Press SHIFT to reset record",200,310);
    if(keyIsDown(SHIFT)) 
      recordBounces = 0;
    
    //Game reset
    if(keyIsDown(ENTER)) {
      leftPoints = 0; rightPoints = 0;
      bounces = 0;
      ballX=350; ballY=250;
    }
  }
  
  //RightWin
  if(rightPoints == 5) {
    fill(0);
    rect(0,0,width,height);
    fill(255);
    textSize(50);
    text("Right Player Wins!",150,220);
    textSize(20);
    text("Press ENTER to restart",220,280);
    
    //Record Bounces
    text("Record Bounces: "+recordBounces,240,490);
    text("Press SHIFT to reset record",200,310); 
    if(keyIsDown(SHIFT)) 
      recordBounces = 0;
    
    //Game reset
    if(keyIsDown(ENTER)) {
      leftPoints = 0; rightPoints = 0;
      bounces = 0;
      ballX=350; ballY=250;
    }
  }
}