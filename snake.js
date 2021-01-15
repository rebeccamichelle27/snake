const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let x = 0;
let y = 0;
let [appleX, appleY] = randomCoord();

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
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX, appleY, 20, 20);
}


function logKey(e) {
    lastPress = e.code;
}

function randomCoord() {
    let appleX = 20 * Math.floor(Math.random() * 30);
    let appleY = 20 * Math.floor(Math.random() * 30);
    let appleCoords = [appleX, appleY];
    return appleCoords;
}