const canvas = document.getElementById("brushCanvas");
const ctx = canvas.getContext('2d');
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


//Draw a circle on click
canvas.addEventListener("click", (evt) => {
    let mousePosition = getMousePosition(canvas, evt);
    drawCircle (ctx, mousePosition);
    storeCoords(mousePosition.x, mousePosition.y, dotCoords);
})

function drawCircle(ctx, mousePosition){
    ctx.beginPath();
    ctx.arc (mousePosition.x, mousePosition.y, 5, 0, 2 * Math.PI);
    ctx.stroke();
    
}

function storeCoords(xPos, yPos, dotCoords){
    dotCoords.push({ //Struct with x and y coord stored on each array index, and isdrawn property
        x: xPos, 
        y: yPos,
        isDrawn: 0,
    }); 
}


function connectDots() {
    drawNextSegment(0);
}

function drawNextSegment (segment) { 
    while (dotCoords[segment].isDrawn){ //Cycle to first non-drawn segment
        segment++;
    }
    const startPos = dotCoords[segment];
    const endPos = dotCoords[(segment + 1)];
    console.log(`starting Drawing segment ${segment}`);
    try {
        animateLine(startPos.x, startPos.y, endPos.x, endPos.y, 0, segment)
        .then(x => {
            console.log(`finished drawing segments ${x}`);
            dotCoords[segment].isDrawn = true;
            segment++;
            if (segment < (dotCoords.length - 1)){ //end at second-to-last set
                drawNextSegment(segment);
            } else {
                console.log("Finished!");
            }
    });
    } catch (error) {
        console.error(error);
    }

}

function animateLine(x1, y1, x2, y2, ratio, segment){
    return new Promise((resolve) => {
        ratio = ratio || 0;
        drawLine (x1, y1, x2, y2, ratio);
        if (ratio < 1) { //recursive loop to finish drawing
            requestAnimationFrame(function() {
            animateLine(x1, y1, x2, y2, ratio + 0.02, segment).then(segment => resolve(segment));
        });
        } else {
            console.log (`finished drawing segment ${segment}`)
            ratio = 0;
            resolve(segment);
        }
    });
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

function clearJustLines(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    reDrawCircles(dotCoords);
    dotCoords.map((x) => x.isDrawn = false); //reset drawCheck for all circles
}

function reDrawCircles(array){
    array.map((circle) => drawCircle(ctx, circle));
}