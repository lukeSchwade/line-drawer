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


function connectDots(array){
     for (let j = 0; j < (array.length - 1); j++) {
         const element = array[j];
         const endPoint = array[(j + 1)];
        ctx.beginPath();
        ctx.moveTo(element.x, element.y); //Draw from Current array coords to next array coords, finish before last one.
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
     }
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dotCoords.splice(0,dotCoords.length);
}

