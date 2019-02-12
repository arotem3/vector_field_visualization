var XMIN = -5; //window dimensions
var XMAX = 5;
var YMIN = -5;
var YMAX = 5;
const h = 0.005; //stepsize for euler method

var a = -1; //field coefficients
var b = 1;
var c = -1;
var d = -1;

const spacingX = 30; //number of vectors in x direction
const spacingY = 30; //number of vectors in y direction
const VMAX = 30; //max length of vectors in an direction (25*sqrt(2) total)
const VMIN = 1; //min length of vectors in any direction

var showStream = new Boolean(false);

var myBubs = []; //ball array
var field = new Field(); //field objects
var fieldGraphics; //where we draw our field
var streamGraphics; //streamline graphics

function setup() {
    var cnv = createCanvas(0.9*windowHeight,0.9*windowHeight);
    cnv.parent("theGraphics"); //part of div
    let u = (windowWidth - width) / 2; //center it in X
    let v = (windowHeight - height) / 2; //center it in Y
    cnv.position(u, v); //place at center
    
    fieldGraphics = createGraphics(width, height); //create graphics object
    pixelDensity(1);
    
    streamGraphics = createGraphics(width, height);
    
    background(30,30,30);
    
    field.updateMax(); //redefine maxima
    field.drawField(); //draw our field (very cost intensive)
}

function windowResized() {
    setup(); //reset the window if resized
}

function draw() {
    background(30,30,30); //clear canvas with background
    image(fieldGraphics, 0, 0); //show our graphics object
    
    fill(200);
    strokeWeight(1);
    ellipse(mouseX, mouseY, 10, 10); //mouse location
    
    var i;
    for (i = 0; i <  myBubs.length; ++i) { //draw all bubbles
        streamGraphics.fill(255, 117, 26);
        streamGraphics.stroke(255, 117, 26);
        streamGraphics.ellipse(myBubs[i].u, myBubs[i].v, 1);
        myBubs[i].draw();
        myBubs[i].updatePos();
    }
    
    if (showStream) {
        image(streamGraphics, 0, 0);
    }
    
    if ( mouseInside() ) {
        document.getElementById("mouse-location").innerHTML = "Mouse X: " + UtoX(mouseX).toFixed(2) + " Y: " + UtoX(mouseY).toFixed(2);
    }
    
    drawAxes();
}