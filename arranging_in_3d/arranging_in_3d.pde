import processing.svg.*;

void setup() {
  size(2000, 2000, P3D);
  noLoop();
  beginRaw(SVG, "output.svg");
}

void cubes(){
  float xCount = 4;
  float yCount = 4;
  float zCount = 4;
  float boxSize = 100;
  translate(width / 2, height / 2);
  
  rotateX(PI/8);
  rotateY(PI / 4);
  rotateZ(2);
  
  // darkseagreen css colour
  fill(143, 188, 143);
  
  for (int k = 0; k < zCount; k++) {
  
    for (int j = 0; j < yCount; j++) {
  
      for (int i = 0; i < xCount; i++) {
  
        float size = boxSize + 35;
        float halfWayX = size * xCount / 2;
        float halfWayY = size * yCount / 2;
        float halfWayZ = size * zCount / 2;
  
        if (xCount % 2 != 0) halfWayX -= size / 2;
        if (yCount % 2 != 0) halfWayY -= size / 2;
        if (zCount % 2 != 0) halfWayZ -= size / 2;
  
        float x = size * i - halfWayX;
        float y = size * j - halfWayY;
        float z = size * k - halfWayZ;
        pushMatrix();
        translate(x, y, z);
        box(boxSize, boxSize, boxSize);
        popMatrix();
      };
    }
  };
  
  save("cubes.png");
}

void pointsInSphere(){
  translate(width/2, height/2, -200);
  rotateZ(0.2);
  strokeWeight(2);
  
  // darkseagreen css colour
  stroke(143, 188, 143); 
  
  for(int i = 0; i < 1000; i++){
    float radius = 200;
    float phi = random(1) * (2 * PI);
    float costheta = random(1) * 2 - 1;
    float u = random(1);
    
    float theta = acos(costheta);
    float r = radius * (float) Math.cbrt(u);
    
    float x = r * sin(theta) * cos(phi);
    float y = r * sin(theta) * sin(phi);
    float z = r * cos(theta);
    
    point(x, y, z);
  }
}

void draw() {
  // Do all your drawing here
  background(255);

    
  cubes();


  endRaw();
}
