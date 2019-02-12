var Ball = function(u,v,r) {
    this.x = UtoX(u);
    this.y = VtoY(v);
    this.u = XtoU(this.x);
    this.v = YtoV(this.y);
    this.r = r;
    this.R = random(255);
    this.G = random(255);
    this.B = random(255);
    
    this.draw = function() {
        stroke(0);
        fill(this.R, this.G, this.B);
        strokeWeight(1);
        ellipse( this.u, this.v, this.r, this.r );
    }
    
    this.velocity = function(mat) {
        let vel = new Matrix(1,2);
        vel.arr[0][0] = field.xFunc(mat.at(0,0), mat.at(0,1));
        vel.arr[0][1] = field.yFunc(mat.at(0,0), mat.at(0,1));
        if (vel.arr[0][0] == Infinity) vel.arr[0][0] = 0;
        if (vel.arr[0][1] == Infinity) vel.arr[0][1] = 0;
        return vel;
    }
    
    this.updatePos = function() {
        let Rxy = UtoX(this.r) - UtoX(0);
        
        let currentPos = new Matrix(1,2); //define current position as a matrix
        currentPos.is(0,0,this.x);
        currentPos.is(0,1,this.y);
        
        let nextpos = RK4(this.velocity, currentPos, h); //determine next position using rk4 method
        
        this.x = nextpos.at(0,0); //assign new x and y
        this.y = nextpos.at(0,1);
        this.u = XtoU(this.x);
        this.v = YtoV(this.y);
    }
}