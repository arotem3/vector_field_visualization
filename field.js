var Field = function() {
    this.maxVecSize = 0.001; //initialization
    
    this.updateMax = function() {
        let i;
        let j;
        for (i = 0; i < spacingX; ++i) {
            for (j = 0; j < spacingY; ++j) {
                //set up lattice point in uv-space
                let u = (width/spacingX)*i + (width/spacingX)/2; //window location
                let v = (height/spacingY)*j + (height/spacingY)/2;
                
                //express lattice point in xy-space
                let x = UtoX(u); //x,y coordinates 
                let y = VtoY(v);
                
                //determine length of vector at lattice point in uv space
                let VectorX = this.xFunc(x,y);
                let VectorU = Math.abs(XtoU(VectorX) - XtoU(0));
                let VectorY = this.yFunc(x,y);
                let VectorV = Math.abs(YtoV(VectorY) - YtoV(0));
                
                let vecSize = Math.sqrt(VectorU**2 + VectorV**2);
                
                //determine if there is a singularity on a lattice point
                if ( !isFinite(VectorX) || !isFinite(VectorY) ) {
                    continue; //ignore singularities
                }
                
                //determine if this point is the maximum point.
                if (vecSize > this.maxVecSize) {
                    this.maxVecSize = vecSize;
                }
            }
        }
    }
    
    this.drawField = function() {
        let i;
        let j;
        for (i = 0; i < spacingX; ++i) {
            for (j = 0; j < spacingY; ++j) {
                //set up lattice point in uv-space
                let u = (width/spacingX)*i + (width/spacingX)/2; //window location
                let v = (height/spacingY)*j + (height/spacingY)/2;
                
                //express lattice point in xy-space
                let x = UtoX(u); //x,y coordinates 
                let y = VtoY(v);
                
                //determine length of vector at lattice point in uv space
                let VectorX = this.xFunc(x,y);
                let VectorU = XtoU(VectorX) - XtoU(0);
                let VectorY = this.yFunc(x,y);
                let VectorV = YtoV(VectorY) - YtoV(0);
                
                //scale vectors
                VectorU *= VMAX/this.maxVecSize;
                VectorV *= VMAX/this.maxVecSize;
                
                //draw singularities as single points
                VectorU = ( !isFinite(VectorX) ) ? (0) : (VectorU);
                VectorV = ( !isFinite(VectorY) ) ? (0) : (VectorV);
                
                //acount for vectors too small
                VectorU *= (Math.abs(VectorU) < VMIN) ? (VMIN/Math.abs(VectorU)) : (1);
                VectorV *= (Math.abs(VectorV) < VMIN) ? (VMIN/Math.abs(VectorV)) : (1);
                
                //set up second point on line segment
                let u2 = u + VectorU;
                let v2 = v + VectorV;
                
                //draw line
                fieldGraphics.stroke(255,0,0); //draw to our graphics object
                fieldGraphics.line(u,v,u2,v2);
            }
        }
    }
    
    this.xFunc = function(x,y) { //our default linear function for x'(t) = 
        return a*x + b*y;
    }
    
    this.yFunc = function(x,y) { //our default linear function for y'(t) = 
        return c*x + d*y;
    }
    
    this.nonlinFunc = function() { //create nonlinear field from user input
        this.maxVecSize = 0.001;
        
        let xFuncInput = document.getElementById("nonlin-x").value;
        let yFuncInput = document.getElementById("nonlin-y").value;
        
        this.xFunc = Function('x','y', 'return ' + xFuncInput); //re-define x'(t)
        this.yFunc = Function('x','y', 'return ' + yFuncInput); //re-define y'(t)
    }

    this.randFunc = function() {
        this.maxVecSize = 0.001;

        this.xFunc = function(x,y) {
            return 10*Math.random() - 5;
        };
        this.yFunc = function(x,y) {
            return 10*Math.random() - 5;
        };
    }
    
    this.resetFunctions = function() { //return functions to linear
        this.Umax = 0.001;
        this.Vmax = 0.001;
        
        this.xFunc = function(x,y) {
            return a*x + b*y;
        }
        this.yFunc = function(x,y) {
            return c*x + d*y;
        }
    }
}