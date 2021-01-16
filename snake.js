const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Coord(this.x, this.y);
    }
}

// Config
let size = 30
let squares = 15
canvas.height = size * squares;
canvas.width = size * squares;

// Game State
let score;
let snakeParts;
let timer;
let appleX;
let appleY;
let lastPress;
let gameover = false;

document.addEventListener('keydown', handleKey);

function step() {
    // update snake position



    /*
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
    */

    let head = snakeParts[snakeParts.length - 1].copy();
    if (lastPress === "ArrowUp") {
        head.y -= size;
    } else if (lastPress === "ArrowDown") {
        head.y += size;
    } else if (lastPress === "ArrowLeft") {
        head.x -= size;
    } else if (lastPress === "ArrowRight") {
        head.x += size;
    }
    snakeParts.push(head);

    for (let i = 0; i < snakeParts.length - 1; i++) {
        if (snakeParts[i].x === head.x && snakeParts[i].y === head.y) {
            gameover = true;
            clearInterval(timer);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = '50px serif';
            ctx.textAlign = 'center';
            ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
            ctx.font = '30px serif';
            ctx.textAlign = 'center';
            ctx.fillText("Press ENTER to start a new game", canvas.width / 2, (canvas.height / 2) + 50);
            return;

        }
    }

    if (head.x === appleX && head.y === appleY) {
        console.log("gobble!");
        [appleX, appleY] = randomCoord();
        score += 100;
    } else {
        // remove tip of tail
        snakeParts.shift();
    }


    // handle apple gobbling and update apple position
    /*
    if (head.x === appleX && head.y === appleY) {
        console.log("gobble!");
        [appleX, appleY] = randomCoord();
        snakeParts.unshift(new Coord(newSegmentX, newSegmentY));
        score += 100;
    }
    */

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


function handleKey(e) {
    if (e.code === "Enter" && gameover) {
        restartGame();
        return;
    }

    lastPress = e.code;
}

function randomCoord() {
    let appleX = size * Math.floor(Math.random() * squares);
    let appleY = size * Math.floor(Math.random() * squares);
    let appleCoords = [appleX, appleY];
    return appleCoords;
}

function restartGame() {
    snakeParts = [new Coord(0, 0), new Coord(20, 0), new Coord(40, 0), new Coord(60, 0)];
    lastPress = "ArrowRight";
    timer = setInterval(step, 250);
    score = 0;
    [appleX, appleY] = randomCoord();
    gameover = false;
}

restartGame();