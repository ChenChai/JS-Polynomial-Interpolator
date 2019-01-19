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
            // this process will create the Vandemonde matrix.
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
    console.log(vandermonde);
    var det = getVandermondeDeterminant(vandermonde);

    console.log("determinant: " + det);
}

