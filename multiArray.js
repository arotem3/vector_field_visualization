var Matrix = function(rows, cols, fillWith) {
    this.rows = rows; //number of rows
    this.cols = cols; //number of cols
    this.arr = new Array(rows); //our array
    
    fillWith = fillWith || 0; //optional parameter to fill matrix
    
    let i;
    for (i = 0; i < rows; ++i) {
        this.arr[i] = new Array(cols);
    } //creating array structure
    
    this.print = function() { //print array to console
        let i;
        let j;
        for (i = 0; i < this.rows; ++i) {
            let printStr = "[";
            for (j = 0; j < this.cols; ++j) {
                printStr += this.arr[i][j] + " ";
            }
            printStr += "]";
            console.log(printStr);
        }
    }
    
    this.populate = function(num) { //fill entire array with num
        let i;
        let j;
        for (i = 0; i < this.rows; ++i) {
            for (j = 0; j < this.cols; ++j) {
                this.arr[i][j] = num;
            }
        }
    }
    
    this.at = function(i,j) { //get array value at i,j
        return this.arr[i][j];
    }
    
    this.is = function(i,j,num) { //set array value at i,j
        this.arr[i][j] = num;
    }
    
    this.rowIs = function(rowThis, mat, rowThat) { //set row to a row of a different matrix
        if (this.cols != mat.cols) {
            console.log("Error: row dimensions do not match");
            return -1;
        }
        rowThat = rowThat || 0; //default value of first row
        let i;
        for (i = 0; i < this.cols; ++i) {
            this.arr[rowThis][i] = mat.at(rowThat,i);
        }
    }
    
    this.getRow = function(rowIndex) {
        let output = new Matrix(1, this.cols);
        let i;
        output.rowIs(0,this, rowIndex);
        return output;
    }
    
    this.addRows = function(otherArr, rowIndexThis, rowIndexThat) { // [1 1 1] + [2 1 3] = [3 2 4]
        var outputArr = new Matrix(1,this.cols);
        let i;
        for (i = 0; i < this.cols; ++i) {
            outputArr.is(0,i, this.arr[rowIndexThis][i] + otherArr.at(rowIndexThat,i));
        }
        return outputArr;
    }
    
    this.scalarMult = function(scalar,rowIndex) { //multiply row by a scalar;
        var outputArr = new Matrix(1, this.cols);
        let i;
        for (i = 0; i < this.cols; ++i) {
            outputArr.is(0,i,  scalar * this.arr[rowIndex][i]);
        }
        return outputArr;
    }
    
    this.size = function() { //return size of matrix
        let outputArr = new Array(2);
        outputArr[0] = this.rows;
        outputArr[1] = this.cols;
        return outputArr;
    }
    
    this.populate(fillWith); //after defining populate, fill array.
}