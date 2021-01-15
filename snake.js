const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let x = 0;
let y = 0;

let lastPress = "ArrowRight";

ctx.fillStyle = 'green';
ctx.fillRect(x, y, 20, 20);

const log = document.getElementById("log");

document.addEventListener('keydown', logKey);

setInterval(redraw, 500);

function redraw() {
    if (lastPress === "ArrowUp") {
        y -= 20;
    } else if (lastPress === "ArrowDown") {
        y += 20;
    } else if (lastPress === "ArrowLeft") {
        x -= 20;
    } else if (lastPress === "ArrowRight") {
        x += 20;
    }
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 600, 600);
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, 20, 20);
}


function logKey(e) {
    lastPress = e.code;
}