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

// validates that inputs are good.
function validateInputs() {
    var pointForm = document.getElementById("pointList");
    var numPoints = pointForm.childElementCount;
    console.log("Number of points: " + numPoints);
    var points = pointForm.children;

    var valid = true;

    // loop through each coordinate pair and validate
    for (var i = 0; i < numPoints; i++) {
        var point = points[i];
        console.log("number of coords: " + point.childElementCount);
        var x = point.children[0];
        var y = point.children[1];

        if (isNaN(x.nodeValue)) {
            valid = false;
            x.setAttribute("class", "invalid");
        } else {
            console.log("x is " + x.value);
        }

        if (isNaN(y.nodeValue)) {
            valid = false;
            x.setAttribute("class", "invalid");
        } else {
            console.log("y is " + y.value);
        }
    }

    return valid;
}

function submitPoints() {
    var valid = validateInputs();

    if (!valid) { return; }
}

