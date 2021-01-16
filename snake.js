const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let snakeParts = [new Coord(0, 0), new Coord(20, 0), new Coord(40, 0), new Coord(60, 0)];

let size = 30
let squares = 15

let score = 0;

canvas.height = size * squares;
canvas.width = size * squares;

let [appleX, appleY] = [0, 90];
// let [appleX, appleY] = randomCoord();

let lastPress = "ArrowRight";

ctx.fillStyle = 'green';
ctx.fillRect(snakeParts[0].x, snakeParts[0].y, size, size);


const log = document.getElementById("log");

document.addEventListener('keydown', logKey);

setInterval(step, 250);

function step() {
    // update snake position

    let newSegmentX = snakeParts[0].x;
    let newSegmentY = snakeParts[0].y;

    for (let i = 0; i < snakeParts.length - 1; i++) {
        snakeParts[i].x = snakeParts[i + 1].x;
        snakeParts[i].y = snakeParts[i + 1].y;
    }


    let head = snakeParts[snakeParts.length - 1];

    if (lastPress === "ArrowUp") {
        head.y -= size;
    } else if (lastPress === "ArrowDown") {
        head.y += size;
    } else if (lastPress === "ArrowLeft") {
        head.x -= size;
    } else if (lastPress === "ArrowRight") {
        head.x += size;

    }

    // handle apple gobbling and update apple position
    if (head.x === appleX && head.y === appleY) {
        console.log("gobble!");
        [appleX, appleY] = randomCoord();
        snakeParts.unshift(new Coord(newSegmentX, newSegmentY));
        score += 100;
    }

    redraw();
}

function redraw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX, appleY, size, size);
    snakeParts.forEach(function (segment) {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, size, size);
    });
    ctx.fillStyle = 'white';
    ctx.font = '30px serif';
    ctx.textAlign = 'center';
    ctx.fillText("Score: " + score, canvas.width / 2, 30);

}


function logKey(e) {
    lastPress = e.code;
}

function randomCoord() {
    let appleX = size * Math.floor(Math.random() * squares);
    let appleY = size * Math.floor(Math.random() * squares);
    let appleCoords = [appleX, appleY];
    return appleCoords;
}