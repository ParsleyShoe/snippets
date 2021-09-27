let origX;
let origY;
let colorOptions;
let selectedColors = 0;

function setup() {
  colorOptions = [
    [color('red'), color('green'), color('black')],
    [color('orange'), color('blue'), color('purple')],
    [color('yellow'), color('purple'), color('brown')]
  ];
  
  createCanvas(800, 800);
  
  origX = width / 2;
  origY = height / 2;
}

function draw() {
  if(frameCount === 61)
    frameCount = 0;
  if (frameCount % 10 === 0) {
      if (selectedColors < 2)
        selectedColors++;
      else selectedColors = 0;
  }
  
  let orig = createVector(origX, origY);
  let coordx = createVector(mouseX, origY);
  let coordy = createVector(mouseX, mouseY);
  background(237);
  
  // draw triangle on its own canvas
  let triang = createGraphics(width, height);
  triang.strokeWeight(1);
  triang.stroke('white');
  triang.fill('gray');
  triang.triangle(orig.x, orig.y, coordx.x, coordx.y, coordy.x, coordy.y);
  
  noFill();
  
  // draw points
  strokeWeight(6);
  stroke('black');
  point(orig.x, orig.y);
  point(coordx.x, coordx.y);
  point (coordy.x, coordy.y);
  let halfway = createVector(coordx.x, coordy.y + (orig.y - coordy.y) / 2);
  
  // draw (partial) circle on its own canvas
  let ang = createGraphics(width, height);
  let circleRadius = dist(orig.x, orig.y, halfway.x, halfway.y) * 0.15;
  ang.noFill();
  ang.strokeWeight(1);
  ang.stroke('gray');
  ang.circle(orig.x, orig.y, circleRadius * 2);
  
  let triangClone = triang.get();
  triangClone.mask(ang.get(), 0, 0);
  
  image(triangClone, 0, 0);
  
  // draw triangle with lines
  strokeWeight(2);
  stroke(colorOptions[selectedColors][0]);
  line(orig.x, orig.y, coordx.x, coordx.y);
  stroke(colorOptions[selectedColors][1]);
  line(coordx.x, coordx.y, coordy.x, coordy.y);
  stroke(colorOptions[selectedColors][2]);
  line(orig.x, orig.y, coordy.x, coordy.y);
}
