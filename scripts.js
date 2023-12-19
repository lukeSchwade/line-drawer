const canvas = document.getElementById("brushCanvas");
const ctx = canvas.getContext('2d');
let isDraw = false;
let x = 0;
let y = 0;

//Array for storing double-click points
let dotCoords = [];
//Update the Mouse Coordinate position
function updateMessage(message){
    document.getElementById("mouseCoords").innerHTML = message;
}

function getMousePosition(canvas, evt){
    let drawframe = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - drawframe.left,
        y: evt.clientY - drawframe.top
    }

}
canvas.addEventListener('mousemove', function(evt){
    let mousePosition = getMousePosition(canvas, evt);
    let textPosition = 'Mouse position: ' + mousePosition.x + ', ' + mousePosition.y;
    updateMessage(textPosition)
}, !1);


//Draw a marker on double click
canvas.addEventListener("dblclick", (evt) => {
    let mousePosition = getMousePosition(canvas, evt);
    drawCircle (ctx, mousePosition);
})

function drawCircle(ctx, mousePosition){
    ctx.beginPath();
    ctx.arc (mousePosition.x, mousePosition.y, 5, 0, 2 * Math.PI);
    ctx.stroke();
    storeCoords(mousePosition.x, mousePosition.y, dotCoords);
}

function storeCoords(xPos, yPos, array){
    array.push({
        x: xPos, 
        y: yPos
    }); //coordinates array
}

const drawTime = 6000;     // in milliseconds
let drawInterval; //declaring interval

function connectDots(array){
     for (let j = 0; j < (array.length - 1); j++) {
         const startPoint = array[j];
         const endPoint = array[(j + 1)];
        slowDraw(startPoint, endPoint, array.length - 1)
        //drawLine(startPoint, endPoint);
     }
}

function slowDraw(startPoint, endPoint, segments) {
    const coordDistance = calcDistance(startPoint, endPoint); //unneccesary I think
    //const interval = drawTime / segments; //how much time does each segment get
    //const totalSegments = 10; //how many segments is the line divided into.
    // let distanceX = (startPoint.x - endPoint.x) / totalSegments;
    // let distanceY = (startPoint.y - endPoint.y) / totalSegments;
    const modifiedStart = startPoint;
    const modifiedEnd = modifiedStart;
    modifiedEnd.x =+ 10;
    modifiedEnd.y =+ 10;

    while (modifiedStart.x < endPoint.x && modifiedStart.y < endPoint.y) {
        setTimeout(drawLine(modifiedStart, modifiedEnd), 500);
        modifiedStart.x =+ 10;
        modifiedStart.y =+ 10;
        modifiedEnd.x =+ 10;
        modifiedEnd.y =+ 10;
    }
    
    
        // let modifiedStart = startPoint; 
        // let modifiedEnd = endPoint
        // drawLine(modifiedStart, modifiedEnd)
        // modifiedStart.x =+ distanceX;
        // modifiedStart.y =+ distanceY;
        // modifiedEnd.x =+ distanceX;
        // modifiedEnd.y =+ distanceY;
        //setTimeout(drawLine(startPoint, endPoint), interval / totalSegments);
}

function drawLine(startPoint, endPoint){
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y); //Draw from Current array coords to next array coords.
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();
}

function calcDistance(startPoint, endPoint){
    return Math.sqrt((endPoint.x - startPoint.x) ** 2 + (endPoint.y - startPoint.y) ** 2);
}


function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dotCoords.splice(0,dotCoords.length);
}

