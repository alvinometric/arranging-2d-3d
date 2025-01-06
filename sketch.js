const drawings = new Map([
  ["grid", { draw: grid, name: "arrange-in-grid" }],
  ["circle", { draw: aroundCircle, name: "arrange-in-circle" }],
  ["semi", { draw: semi, name: "arrange-in-semicircle" }],
  ["spiral", { draw: spiral, name: "arrange-in-spiral" }],
  ["fill-circles", { draw: fillCircles, name: "arrange-fill-circle" }],
]);

function setup() {
  createCanvas(400, 400, SVG); // Create SVG Canvas
  noStroke();
  fill("darkseagreen");
  noLoop();
}

function draw() {
  const drawing = drawings.get("fill-circles");

  drawing.draw();
  save(`${drawing.name}.svg`);
}

function spiral() {
  translate(width / 2, height / 2);

  // How many revolutions
  let turns = 3;
  let radius = 100;
  // How close we want the points to be, as an angle in radians, smaller is closer
  let tightness = 0.2;
  let full = Math.PI * 2 * turns;

  for (let angle = 0; angle < full; angle += tightness) {
    let r = radius * (angle / full);
    let x = Math.cos(angle) * r;
    let y = Math.sin(angle) * r;
    ellipse(x, y, 4, 4);
  }
}

function fillCircles() {
  translate(width / 2, height / 2);

  let radius = 150;
  let itemSize = 8;
  let spacing = 2;

  let totalSize = itemSize + spacing; // Diameter of each small circle
  let step = Math.floor(radius / totalSize);

  for (let j = 0; j < step; j++) {
    let r = radius - step * j;
    let numCircles = Math.round((TWO_PI * r) / totalSize);
    for (let i = 0; i < numCircles; i++) {
      let x = r * cos(i * (TWO_PI / numCircles));
      let y = r * sin(i * (TWO_PI / numCircles));
      ellipse(x, y, itemSize, itemSize);
    }
  }

  // final central circle
  ellipse(0, 0, itemSize, itemSize);
}

function semi() {
  translate(width / 2, height / 2);

  let numItems = 7;
  let radius = 100;
  // use this value to offset the angle and rotate your semicircle
  let angleOffset = 0;
  for (let i = 0; i < numItems; i++) {
    let t = i / Math.max(1, numItems - 1);
    let angle = Math.PI * t + angleOffset;
    let x = Math.cos(angle) * radius;
    let y = Math.sin(angle) * radius;
    ellipse(x, y, 20, 20);
  }
}

function aroundCircle() {
  translate(width / 2, height / 2);
  let numItems = 8;
  let radius = 100;
  for (let i = 0; i <= numItems; i++) {
    let angle = ((2 * i) / numItems) * Math.PI;
    let x = Math.cos(angle) * radius;
    let y = Math.sin(angle) * radius;
    ellipse(x, y, 20, 20);
  }
}

function grid() {
  // arrange items in a horizontal grid from left to right
  let gridSize = 3;
  let itemSize = 60;
  let numItems = 11;

  for (let i = 0; i < numItems; i++) {
    // from left to right
    let gx = i % gridSize;
    let gy = Math.floor(i / gridSize);
    // swap gx and gy to arrange in a vertical grid from top to bottom
    // gx = Math.floor(i / gridSize);
    // gy = i % gridSize
    let x = gx * itemSize;
    let y = gy * itemSize;
    // 4px spacing
    rect(x, y, itemSize - 4, itemSize - 4);
  }
}
