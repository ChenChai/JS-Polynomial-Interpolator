// adds an empty input pair to the list of input pairs.
function addInputPair() {
    var point = document.createElement("div");

    point.setAttribute("id", "point");
    //point.append("(");
    
    // create an input field
    var coord = document.createElement("input");
    coord.setAttribute("type", "text");
    var coord2 = document.createElement("input");
    coord2.setAttribute("type", "text");    

    point.append(coord);
    //point.append(", ")
    point.append(coord2);

    //point.append(")");

    var pointList = document.getElementById("pointList");
    pointList.append(point);
}

// returns an array of points which have been input.
function getArray() {
    var pointForm = document.getElementById("pointList");

    var numPoints = pointForm.childElementCount;
    window.alert(numPoints);
    return;

    if (pointForm.childElementCount <= 1) {
        return undefined;
    }

    var rawPoints = pointForm.childNodes;
    var length = rawPoints.length;
    
    var vandermonde = [];
    for(var i = 0; i < length; i++) {

    }

}

// validates that inputs are good.
function validateInputs() {
    var pointForm = document.getElementById("pointList");
    var numPoints = pointForm.childElementCount;
    console.log("Number of points: " + numPoints);
    var points = pointForm.children;

    var valid = true;

    // loop through each coordinate pair and validate
    for (var i = 0; i < numPoints; i++) {
        // get a point
        var point = points[i];
        console.log("number of coords: " + point.childElementCount);

        // get x and y values.
        var x = point.children[0];
        var y = point.children[1];

        // check if x is valid
        if (isNaN(x.value) || x.value == "") {
            valid = false;
            x.setAttribute("class", "invalid");
        } else {
            console.log("x is " + x.value);
            x.setAttribute("class", "");
        }

        // check if y is valid
        if (isNaN(y.value) || y.value == "") {
            valid = false;
            y.setAttribute("class", "invalid");
        } else {
            console.log("y is " + y.value);
            y.setAttribute("class", "");
        }
    }

    return valid;
}

function submitPoints() {
    var valid = validateInputs();

    if (!valid) { return; }
}

