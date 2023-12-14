const canvas = document.getElementById("brushCanvas");
const ctx = canvas.getContext('2d');
let isDraw = false;
let x = 0;
let y = 0;

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

canvas.addEventListener("dblclick", (evt) => {
    let mousePosition = getMousePosition(canvas, evt);
    
    drawCircle (ctx, mousePosition);
})

function drawCircle(ctx, mousePosition){
    ctx.beginPath();
    ctx.arc (mousePosition.x, mousePosition.y, 10, 0, 2 * Math.PI);
    ctx.stroke();
}
function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

