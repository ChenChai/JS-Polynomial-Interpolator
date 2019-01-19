// adds an empty input pair to the list of input pairs.
function addInputPair() {
    var point = document.createElement("div");

    point.setAttribute("id", "point");
    
    // create an input field
    var coord = document.createElement("input");
    coord.setAttribute("type", "text");
    var coord2 = document.createElement("input");
    coord2.setAttribute("type", "text");    

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

// Returns cofactor matrix of a vandermonde matrix.
function getVandermondeCofactorMatrix(vandermonde) {
    var det = getVandermondeDeterminant(vandermonde);
    var numRows = vandermonde.length;

    var cofactorMatrix = [];

    for (var i = 0; i < numRows; i++) {
        var row = [];

        for (var j = 0; j < numRows; j++) {
            // calculate cofactor
            var c = (i + j) % 2 == 0 ? 1 : -1;
            c *= getDeterminant(spliceMatrix(vandermonde.slice(0), i, j));
            
            row.push(c);
        }
        cofactorMatrix.push(row);
    }

    return cofactorMatrix;
}

function getDeterminant(matrix) {
    var det = 0;
    
    var size = matrix.length;
    console.log("Size = " + size + " Finding det of:");
    console.log(matrix.join("\n"));

    if (size <= 1) {
        return matrix[0][0];
    }

    // calculate determinant using recursion
    // chose first row to find determinant.
    var i = 0;
    for (var j = 0; j < size; j++) {
        var x = (i + 1 + j + 1) % 2 ? 1 : -1;
        x *= matrix[i][j];
        
        // create a matrix with row i and column j taken out
        var innerMatrix = spliceMatrix(matrix.slice(0), i, j).slice(0); // use slice to return a copy.

        x *= getDeterminant(innerMatrix);

        det += x;
    }
    return det;
}

// removes row i and column j from matrix.
function spliceMatrix(matrix, i, j) {
    matrix.splice(i, 1);

    var size = matrix.length;
    // loop through remaining rows and remove element from column j.
    for (var k = 0; k < size; k++) {
        matrix[k].splice(j, 1);
    }
    return matrix;
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

        // check if x is valid
        if (isNaN(x.value) || x.value == "") {
            valid = false;
            x.setAttribute("class", "invalid");
        } else {
            x.setAttribute("class", "");
        }

        // check if y is valid
        if (isNaN(y.value) || y.value == "") {
            valid = false;
            y.setAttribute("class", "invalid");
        } else {
            y.setAttribute("class", "");
        }
    }

    return valid;
}

function submitPoints() {
    var valid = validateInputs();
    if (!valid) { return; }

    var vandermonde = getVandermondeArray();
    
    console.log("vandermonde matrix: ");
    console.log(vandermonde.join("\n"));
/*
    console.log("Cofactor of vandemonde: ");
    console.log(getVandermondeCofactorMatrix(vandermonde));
*/
    console.log(getDeterminant(vandermonde));

}

