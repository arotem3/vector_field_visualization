//Runge-kutta 4 for 2 dimensional systems
function RK4(Fx, x0, h) { //function with matrix row output, array 2 values, matrix row, number
    let x = new Matrix(1, 2); // output x matrix
    
    let k1 = Fx(x0).scalarMult(h, 0); //h*f(x)
    let k2 = Fx(x0.addRows(k1.scalarMult(0.5,0),0,0)).scalarMult(h,0); //h*f(x + 0.5k1)
    let k3 = Fx(x0.addRows(k2.scalarMult(0.5,0),0,0)).scalarMult(h,0); //h*f(x + 0.5*k2)
    let k4 = Fx(x0.addRows(k3,0,0)).scalarMult(h,0); //h*f(x+k3)

    let nextRow = k1.addRows(k2.scalarMult(2,0), 0,0); // k1 + 2*k2
    nextRow = nextRow.addRows(k3.scalarMult(2,0), 0,0); // k1 + 2*k2 + 2*k3
    nextRow = nextRow.addRows(k4, 0,0); //k1 + 2*k2 + 2*k3 + k4
    nextRow = nextRow.scalarMult(1/6,0); // (k1 + 2*k2 + 2*k3 + k4)/6
    nextRow = nextRow.addRows(x0, 0,0); // x0 + (k1 + 2*k2 + 2*k3 + k4)/6
    x.rowIs(0, nextRow); //x =  x0 + (k1 + 2*k2 + 2*k3 + k4)/6
    
    return x;
}