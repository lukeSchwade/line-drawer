const canvas = document.getElementById("brushCanvas");
const ctx = canvas.getContext('2d');
let isDraw = false;
let x = 0;
let y = 0;

let dotCoords = []; //Array for storing double-click points
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
    array.push({ //Struct with x and y coord stored on each array index
        x: xPos, 
        y: yPos
    }); //coordinates array
}

const drawTime = 5000; //in milliseconds

function connectDots(array){
     for (let j = 0; j < (array.length - 1); j++) { //for each segment, finish at last coord pair
         const element = array[j];
         const endPoint = array[(j + 1)];
        drawTimer(element.x, element.y, endPoint.x, endPoint.y); 
        // ctx.beginPath();
        // ctx.moveTo(element.x, element.y);
        // ctx.lineTo(endPoint.x, endPoint.y);
        // ctx.stroke();
     }
}

function drawTimer(xStart, yStart, xEnd, yEnd){
    const xDiff = xStart - xEnd;
    const yDiff = yStart - yEnd;
    const xSpeed = xDiff / (drawTime / 10);
    const ySpeed = yDiff / (drawTime / 10);//draw a line segment every 100 miliseconds
    let x = xStart;
    let y = yStart;
    let xNewEnd = xEnd;
    let yNewEnd = yEnd;
    do {
      setTimeout(drawLine, 500, x, y, xNewEnd, yNewEnd)
      x += xSpeed;
      y += ySpeed;
      xNewEnd += xSpeed;
      yNewEnd += ySpeed;
    } while (xNewEnd < xEnd && yNewEnd < yEnd);
}


function drawLine(xStart, yStart, xEnd, yEnd){
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();
}
// How to procedurally Draw a line
// get start point and End point coords
// Determine diff btwn x and Y start/end
// Divide That distance by number of increments (one increment per 100ms)
// Draw a piece of the line every 100ms




function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dotCoords.splice(0,dotCoords.length); //clear coordinates
}

