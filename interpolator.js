// adds an empty input pair to the list of input pairs.
function addInputPair() {
    var point = document.createElement("div");

    point.setAttribute("id", "point");
    point.append("(");
    
    // create an input field
    var coord = document.createElement("input");
    coord.setAttribute("type", "text");    
    var coord2 = document.createElement("input");
    coord2.setAttribute("type", "text");    

    point.append(coord);
    point.append(", ")
    point.append(coord2);

    point.append(")");

    var pointList = document.getElementById("pointList");
    pointList.append(point);
}