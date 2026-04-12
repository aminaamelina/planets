var angle1 = 0.0;
var angle2 = 0.0;
var angle3 = 0.0;
let img;

function preload() {
  img = loadImage('earth.png');
  img2 = loadImage('moon.png');
  img3 = loadImage('sun.png');
}

function setup() {
createCanvas(800, 800);
background(111, 10, 148);
}

function draw() {
   background(111, 10, 148);
   push();
translate(mouseX, mouseY);
rotate(angle1);
image(img, -50, -50, 100, 100);
angle1 += 0.01;

rotate (angle2);
translate(60, 23.8);
image(img2, 0, 0, 50, 50);
angle2 += 0.020;
pop();

push();
rotate (angle3);
imageMode(CENTER)
angle3 += 0.01;
image (img3, 200, 200);
pop();
}
