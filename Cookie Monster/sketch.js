var monster_img;
var cookie_img;
var miss_img;
var cake_img;
var pie_img;
var points;
var missed;
var monster_x, monster_y;
var speed;
var cookie_x, cookie_y;
var cake_x, cake_y;
var pie_x, pie_y;

function preload() {
  monster_img = loadImage("assets/cookie_monster.png");
  cookie_img = loadImage("assets/cookie.png");
  miss_img = loadImage("assets/miss.png");
  cake_img = loadImage("assets/cake.png");
  pie_img = loadImage("assets/pie.png");
}

function setup() {
  createCanvas(720, 400);
  monster_x = 150
  monster_y = height-150;
  cookie_x = 725;
  cookie_y = random(350);
  speed = 4;
  cake_x = 725;
  cake_y = random(350);
  pie_x = 825;
  pie_y = random(350);
  points = 0;
  missed = 0;
}

function draw() {
  background(200);
  displayPoints();
  
  image(monster_img, monster_x, monster_y);
  image(cookie_img, cookie_x, cookie_y);
  image(cake_img, cake_x, cake_y);
  image(pie_img, pie_x, pie_y);
  
  moveCookie();
  moveCake();
  movePie();
  moveMonster();
  checkForChomp();
  displayMissed();
  gameOver();
}

function displayPoints() {
  fill(160);
  textSize(150);
  text(points,10,370);
}

function displayMissed() {
  if(missed == 1) {
    image(miss_img,680,5);
  } else if(missed == 2) {
    image(miss_img,680,5);
    image(miss_img,640,5);
  } else if(missed == 3) {
    image(miss_img,680,5);
    image(miss_img,640,5);
    image(miss_img,600,5);
  }
}

function gameOver() {
  if(missed >= 3) {
    fill(200);
    rect(0,0,720,400);
    fill(0);
    textSize(75);
    text("Game Over", 50,200);
    textSize(30);
    text("Press enter to restart", 70,275);
  }
  if(missed >= 3 && keyIsDown(ENTER)) {
    missed = 0;
    points = 0;
    speed = 4;
  }
}
function moveCookie() {
  if(cookie_x < 0) {
    missed +=1;
    cookie_x = 725;
    cookie_y = random(350);
    if(cookie_y > cake_y-20 || cookie_y < cake_y+20)
      cookie_y = random(350);
    if(cookie_y > pie_y-20 || cookie_y < pie_y+20)
      cookie_y = random(350);
  }
  else 
    cookie_x -= speed;
}

function moveCake() {
  if(cake_x < 0) {
    cake_x = 725;
    cake_y = random(350);
    if(cake_y > cookie_y-20 && cake_y < cookie_y+20)
      cake_y = random(350);
    if(cake_y > pie_y-20 && cake_y < pie_y+20)
      cake_y = random(350);
  }
  else 
    cake_x -= 2;
}

function movePie() {
  if(pie_x < 0) {
    pie_x = 750;
    pie_y = random(350);
    if(pie_y > cookie_y-20 && pie_y < cookie_y+20)
      pie_y = random(350);
    if(pie_y > cake_y-20 && pie_y < cake_y+20)
      pie_y = random(350);
  }
  else 
    pie_x -= 2;
}

function moveMonster() { //Monster movement
  if(keyIsDown(UP_ARROW) && monster_y > 0) 
    monster_y -= 4;
  if(keyIsDown(DOWN_ARROW) && monster_y < height-150)
    monster_y += 4;
  if(keyIsDown(LEFT_ARROW) && monster_x > 0)
    monster_x -= 4;
  if(keyIsDown(RIGHT_ARROW) && monster_x < width-150)
    monster_x += 4;
}

function checkForChomp() {
  var d = dist(cookie_x, cookie_y, monster_x, monster_y); //Cookie chomp
  if (d < 75) {
    points += 1;
    if(speed < 50)
      speed = speed+(points*.1); //acceleration
    cookie_x = 725;
    cookie_y = random(350);
  }
  var d = dist(cake_x, cake_y, monster_x, monster_y); //Cake chomp
  if (d < 75) {
    cake_x = 725;
    cake_y = random(350);
    missed += 1;
  }
  var d = dist(pie_x, pie_y, monster_x, monster_y); //Pie chomp
  if (d < 75) {
    pie_x = 725;
    pie_y = random(350);
    missed += 1;
  }
}
