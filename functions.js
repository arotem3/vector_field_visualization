var drawAxes = function() {
    let yZero = YtoV(0);
    let xZero = XtoU(0);
    
    stroke(255);
    strokeWeight(1);
    line(0, yZero, width, yZero);
    
    line(xZero, 0, xZero, height);
}

var XtoU = function(x) {
    return (width/(XMAX - XMIN))*(x - XMIN);
}

var UtoX = function(u) {
    return (u/width)*(XMAX - XMIN) + XMIN;
}

var YtoV = function(y) {
    return height - (height/(YMAX - YMIN))*(y - YMIN);
}

var VtoY = function(v) {
    return YMIN + (-v + height)*(YMAX - YMIN)/height;
}

var mouseInside = function() {
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
        return false;
    } else {
        return true;
    }
}

function mouseClicked() { //add ball to screen when mouse is clicked on screen
    if ( mouseInside() ) {
        myBubs.push( new Ball( mouseX, mouseY, random(5,25) ) );
    }
}

var updateCoef = function() {
    a = parseFloat(document.getElementById("a-coef").value); //update coefs from input
    b = parseFloat(document.getElementById("b-coef").value);
    c = parseFloat(document.getElementById("c-coef").value);
    d = parseFloat(document.getElementById("d-coef").value);
    
    field.resetFunctions();
    
    myBubs = []; //clear bubbles
    streamGraphics.clear();
    
    fieldGraphics.clear();
    field.updateMax(); //update field parameters
    field.drawField(); //redraw field
}

var changeToNonlinear = function() {
    field.nonlinFunc();
    
    myBubs = []; //clear bubbles
    streamGraphics.clear();
    
    fieldGraphics.clear();
    field.updateMax(); //update field parameters
    field.drawField(); //redraw field
}

function randomField() {
    field.randFunc();
    
    myBubs = [];
    streamGraphics.clear();

    fieldGraphics.clear();
    field.updateMax();
    field.drawField();
}

var newPt = function() { //function for manual point input.
    let x = parseFloat(document.getElementById("newPtX").value);
    let y = parseFloat(document.getElementById("newPtY").value);
    
    x = XtoU(x);
    y = YtoV(y);
    
    myBubs.push( new Ball(x, y, random(5,25) ) );
}

var changeAxes = function() {
    XMIN = parseFloat(document.getElementById("xmin-input").value);
    XMAX = parseFloat(document.getElementById("xmax-input").value);
    YMIN = parseFloat(document.getElementById("ymin-input").value);
    YMAX = parseFloat(document.getElementById("ymax-input").value);
    
    myBubs = []; //clear bubbles
    streamGraphics.clear();
    
    fieldGraphics.clear();
    field.updateMax(); //update field parameters
    field.drawField(); //redraw field
}

var clearPts = function() {
    myBubs = [];
    streamGraphics.clear();
}

var toggleStream = function() {
    showStream = !showStream;
}