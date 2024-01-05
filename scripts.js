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
        animateLine(element.x, element.y, endPoint.x, endPoint.y, 0); 
        // ctx.beginPath();
        // ctx.moveTo(element.x, element.y);
        // ctx.lineTo(endPoint.x, endPoint.y);
        // ctx.stroke();
     }
}

function animateLine(x1, y1, x2, y2, ratio){
    ratio = ratio || 0;
    drawLine (x1, y1, x2, y2, ratio)
    if (ratio < 1) { //recursive loop to finish drawing
        requestAnimationFrame(function() {
            animateLine(x1, y1, x2, y2, ratio + 0.01);
        });
    }
}


function drawLine(x1, y1, x2, y2, ratio){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    x2 = x1 + ratio * (x2 - x1);
    y2 = y1 + ratio * (y2 - y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}





function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dotCoords.splice(0,dotCoords.length); //clear coordinates
}

