const canvas = document.getElementById("brushCanvas");
const ctx = canvas.getContext('2d');

function updateMessage(message){
    document.getElementById("mouseCoords").innerHTML = message;
}

function getMousePosition(canvas, evt){
    let drawframe = canvas.getBoundingClientRect();
    return {
        x: evt.clientX -drawframe.left,
        y: evt.clientY - drawframe.top
    }

}
brushCanvas.addEventListener('mousemove', function(evt){
    let mousePosition = getMousePosition(canvas, evt);
    let textPosition = 'Mouse position: ' + mousePosition.x + ', ' + mousePosition.y;
    updateMessage(textPosition)
}, !1);

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

