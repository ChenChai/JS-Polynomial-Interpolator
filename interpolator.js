// adds an empty input pair to the list of input pairs.
function addInputPair() {
    var point = document.createElement("div");

    point.setAttribute("id", "point");
    
    // create an input field
    var coord = document.createElement("input");
    coord.setAttribute("type", "text");
    coord.setAttribute("placeholder", "x");
    var coord2 = document.createElement("input");
    coord2.setAttribute("type", "text");   
    coord2.setAttribute("placeholder", "y") 

    point.append(coord);
    point.append(" "); // spaces aren't counted as nodes.
    point.append(coord2);

    var pointList = document.getElementById("pointList");
    pointList.append(point);
}

// removes the last input pair from the list if there are more that two.
function deleteInputPair() {
    var pointForm = document.getElementById("pointList");

    // we won't delete the point if there are two points or less.
    if (pointForm.childElementCount <= 2) {
        return;
    }

    pointForm.removeChild(pointForm.lastChild);
}

function getPoints() {
    var pointForm = document.getElementById("pointList");
    var numPoints = pointForm.childElementCount;
    var rawPoints = pointForm.children;

    // array containing actual numbers.
    var points = [];

    for (var i = 0; i < numPoints; i++) {
        var rawPoint = rawPoints[i];
        var x = rawPoint.children[0].value;
        var y = rawPoint.children[1].value;
        var pair = [x, y];
        points.push(pair);
    }

    return points;
}

// returns a vandermonde array to work with.
function getVandermondeArray() {
    var points = getPoints();

    var numPoints = points.length;
    var vandermonde = [];
    // create the matrix
    for (var i = 0; i < numPoints; i++) {
        var point = points[i];
        var x = point[0];
        var y = point[1];
        
        var row = [];

        // create a row of the matrix. Each row has a number of 
        // elements equal to the number of points given
        for (var j = 0; j < numPoints; j++) {
            // raise x to the power of the row.
            // this process will create the Vandermonde matrix.
            row.push(Math.pow(x, j));
        }

        vandermonde.push(row);
    }

    return vandermonde;
}

function getVandermondeDeterminant(vandermonde) {
    var det = 1;
    var numRows = vandermonde.length;
    // formula for determinant of vandermonde matrix is
    // product of differences of x values in second column.

    // loop through each row's x value.
    for (var i = 0; i < numRows; i++) {
        var x = vandermonde[i][1];

        for (var j = 0; j < i; j++) {
            det *= (x - vandermonde[j][1]);
        }
    }

    return det;
}

// Returns cofactor matrix of a vandermonde matrix by value.
function getVandermondeCofactorMatrix(vandermonde) {
    var det = getVandermondeDeterminant(vandermonde);
    var numRows = vandermonde.length;

    var cofactorMatrix = [];

    // loop through each row and column
    for (var i = 0; i < numRows; i++) {
        var row = [];

        for (var j = 0; j < numRows; j++) {
            // calculate cofactor
            var c = (i + j) % 2 == 0 ? 1 : -1;
            
            var innerMatrix = JSON.parse(JSON.stringify(vandermonde));
            spliceMatrix(innerMatrix, i, j);
            c *= getDeterminant(innerMatrix);
            
            row.push(c);
        }
        cofactorMatrix.push(row);
    }

    return cofactorMatrix;
}

function getDeterminant(matrix) {

    console.clear();
    console.log("Beginning Row Reduction:")
    var numRows = matrix.length;
    var numColumns = matrix[0].length;

    // copy matrix
    var newMatrix = JSON.parse(JSON.stringify(matrix));

    // loop through each row from top to bottom, and
    // make all entries beneath leading entry zero.
    for (var i = 0; i < numRows; i++) {
        // reduce row j's first entry to zero.
        for (var j = i + 1; j < numRows; j++) {
            // subtract (row i * leading entry of row j) from (row j * leading entry of row i) 
            subtractRow(newMatrix, newMatrix[i][i], j, newMatrix[j][i], i);
            console.log(newMatrix.join("\n"));
        }

    }

    console.log(newMatrix.join("\n"));

    var det = 1;

    for (var i = 0; i < numRows; i++) {
        det *= newMatrix[i][i];
    }
    return det;
    /*
    var det = 0;
    
    var size = matrix.length;
    if (size <= 1) {
        return matrix[0][0];
    }

    // calculate determinant using recursion
    // chose first row to find determinant.
    var i = 0;
    for (var j = 0; j < size; j++) {

        var x = (i + 1 + j + 1) % 2 == 0 ? 1 : -1;
        x *= matrix[i][j];
        
        // create a matrix with row i and column j taken out

        // first, copy the matrix by value
        // need to use this technique for array of arrays.
        var innerMatrix = JSON.parse(JSON.stringify(matrix)); 

        // splice matrix
        spliceMatrix(innerMatrix, i, j);

        x *= getDeterminant(innerMatrix);

        det += x;
        delete innerMatrix;
    }
    return det;
    */
}

// subtracts a multiple of row2 from a multiple of row1. Uses mutation on row1.
function subtractRow(matrix,  row1Multiple, row1, row2Multiple, row2) {
    for (var i = 0;  i < matrix.length; i++) {
        matrix[row1][i] = row1Multiple * matrix[row1][i] - row2Multiple * matrix[row2][i];
    }
}

// removes row i and column j from matrix.
function spliceMatrix(matrix, i, j) {
    matrix.splice(i, 1);

    var size = matrix.length;
    // loop through remaining rows and remove element from column j.
    for (var k = 0; k < size; k++) {
        matrix[k].splice(j, 1);
    }
}

// validates that inputs are good.
function validateInputs() {
    var pointForm = document.getElementById("pointList");
    var numPoints = pointForm.childElementCount;
    var points = pointForm.children;

    // will be set to false if any input is invalid.
    var valid = true;

    // loop through each coordinate pair and validate
    for (var i = 0; i < numPoints; i++) {
        // get a point
        var point = points[i];

        // get x and y values.
        var x = point.children[0];
        var y = point.children[1];

        // check if x is valid (check for no whitespace too!)
        if (isNaN(x.value) || x.value == "" || x.value.search(/[*0-9.-]/)) {
            valid = false;
            x.setAttribute("class", "invalid");
        } else {
            x.setAttribute("class", "");
        }

        // check if y is valid
        if (isNaN(y.value) || y.value == "" || y.value.search(/[*0-9.-]/)) {
            valid = false;
            y.setAttribute("class", "invalid");
        } else {
            y.setAttribute("class", "");
        }
    }

    return valid;
}

// returns an array of the y-values of the points given.
function getConstantVector() {
    var points = getPoints();
    var size = points.length;

    var vector = [];
    for (var i = 0; i < size; i++) {
        vector.push(points[i][1]); // add the y value.
    }
    return vector;
}

// returns a new matrix that is the transpose of the given
function transpose(matrix) {
    var newMatrix = [];
    for (var i = 0; i < matrix.length; i++) {
        var row = [];
        for (var j = 0; j < matrix.length; j++) {
            row.push(matrix[j][i]);
        }
        newMatrix.push(row);
    }
    return newMatrix;
}

// scalar multiply a matrix. Returns a new matrix. 
function scalarMultiply(matrix, scalar) {
    return matrix.map(row => row.map(element => (element * scalar)));
}

// matrix multiplies (matrix * vector) and returns new matrix.
function matrixVectorMultiply(matrix, vector) {
    var newVector = [];

    var numRows = matrix.length;
    var numColumns = matrix[0].length;

    // multiply matrix by vector using linear algebra
    for (var i = 0; i < numRows; i++) {
        var x = 0;
        for (var j = 0; j < numColumns; j++) {
            x += matrix[i][j] * vector[j];
        }
        newVector.push(x);
    }

    return newVector;
}

function submitPoints() {
    var valid = validateInputs();
    if (!valid) { return; }

    // vandermonde array is a special type of array that 
    // can be used for polynomial interpolation
    var vandermonde = getVandermondeArray();

    // constant vector of all the y-values
    var vector = getConstantVector();

    // get determinant
    var det = getVandermondeDeterminant(vandermonde);

    // no possible solution (i.e., not function?)
    if (det == 0) {
        document.getElementById("answer").innerHTML = "No solution possible.";
        return;
    }

    if (isNaN(det)) { 
        document.getElementById("answer").innerHTML = "Output too large.";
        return;
    }

    // get cofactor matrix by value
    var cofactor = getVandermondeCofactorMatrix(vandermonde);
    var adjoint = transpose(cofactor);

    // get the inverse of the vandermonde matrix
    var inverse = scalarMultiply(adjoint, 1 / det);

    // solve the system of equations by multiplying the constant vector by the inverse of the matrix
    var polynomial = matrixVectorMultiply(inverse, vector);

    document.getElementById("answer").innerHTML ="f(x) = " + getPolynomialString(polynomial);
}

// prints a polynomial passed in vector form
function getPolynomialString(polynomial) {
    var polyString = "";

    // build up a string of terms in the polynomial.
    for (var i = 0; i < polynomial.length; i++) {
        if (polynomial[i] == Infinity) { return "Output too large."; }
        if (isNaN(polynomial[i])) { console.log(polynomial[i]);}
        polyString = Math.round(polynomial[i] * 1000) / 1000 + "x<sup>" + i + "</sup>" + polyString;
        
        if (i != polynomial.length - 1) {
            polyString = " + " + polyString;
        }
    }

    return polyString;
}