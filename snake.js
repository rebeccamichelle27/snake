const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let x = 0;
let y = 0;

ctx.fillStyle = 'green';
ctx.fillRect(x, y, 20, 20);

const log = document.getElementById("log");

document.addEventListener('keydown', logKey);

function redraw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 600, 600);
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, 20, 20);
}


function logKey(e) {

    if (e.code === "ArrowUp") {
        y -= 20;
    } else if (e.code === "ArrowDown") {
        y += 20;
    } else if (e.code === "ArrowLeft") {
        x -= 20;
    } else if (e.code === "ArrowRight") {
        x += 20;
    }

    redraw();
}