var grow;
var count;
var bgColor = 0;
var creatureColor = 0;

function setup() {
  createCanvas(600,700);
  grow = 1;
  count = 0;
}

function draw() {
  noStroke();
  background(bgColor);
  
  for(var i = 0;i < 15; i++) { //Towers
    disco(i*40,50);
  }
  
  for(var i = 0;i < 12; i++) { //Disco balls
    towers(i*50);
  }
  
  if(mouseIsPressed) {
    translate(mouseX-165,mouseY-450);
    scale(.5,1.5);
  }
  
  translate(mouseX-300,mouseY-300);
  creature();
  animation();
}

function creature() {
  //Body
  fill(255,0,0);
  triangle(300,100,100,500,500,500);
  
  //Torso
  fill(creatureColor);
  rect(280,500,40,100);
  
  //Eyes
  fill(255);
  ellipse(210,180,150,150);
  ellipse(390,180,150,150);
  
  //Pupil
  fill(creatureColor);
  ellipse(210,180,100+grow,100+grow);
  ellipse(390,180,100+grow,100+grow);
  
  //Nose
  fill(255,255,0);
  triangle(300,270+grow,280,250,320,250);
  
  //Mouth
  fill(0);
  rect(200,380,200,60-grow);
  
  //Arms&Legs
  stroke(255);
  line(280,537,260-grow,520);
  line(320,537,340+grow,520);
  line(285,600,285,630+grow);
  line(315,600,315,630+grow);
}

function animation() {
  count++;
  if(count < 40) {
    grow=grow+.75;
  } else if(count < 80) {
    grow=grow-.75;
  } else {
    count = 0;
  }
}

function towers(x) {
  stroke(0);
  fill(0,255,0);
  var ish = random(height/2);
  rect(x,height-ish,30,ish);
}

function disco(x,y) {
  stroke(0);
  fill(255,20,147);
  ellipse(x,y,random(50),random(50));
}

function keyPressed () {
  if(keyCode == ENTER)
    bgColor = color(random(256),random(256),random(256));
  if(keyCode == SHIFT)
    creatureColor = color(random(256),random(256),random(256));
}