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
let size = 64
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
let speed;

document.addEventListener('keydown', handleKey);

function step() {
    // update snake position
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

    //Determines if the snake has hit its tail
    for (let i = 0; i < snakeParts.length - 1; i++) {
        if (snakeParts[i].x === head.x && snakeParts[i].y === head.y) {
            gameOver();
            return;
        }
    }

    //Determines if the snake has moved offscreen 
    if (head.x === canvas.width || head.x < 0 || head.y === canvas.height || head.y < 0) {
        gameOver();
        return;
    }

    //Determines if the snake hits the apple
    if (head.x === appleX && head.y === appleY) {

        console.log("gobble!");
        [appleX, appleY] = randomCoord();
        score += 100;
        speed = speed * 0.95;
        clearInterval(timer);
        timer = setInterval(step, speed);

    } else {
        // remove tip of tail
        snakeParts.shift();
    }

    redraw();
}

function gameOver() {
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

function redraw() {
    // clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw apple
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX, appleY, size, size);

    // draw snake
    snakeParts.forEach(function (segment) {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, size, size);
    });

    // draw score
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

    speed = 250;

    snakeParts = [new Coord(size * 0, 0), new Coord(size * 1, 0), new Coord(size * 2, 0), new Coord(size * 3, 0)];
    lastPress = "ArrowRight";
    timer = setInterval(step, speed);
    score = 0;
    [appleX, appleY] = randomCoord();
    gameover = false;
}

restartGame();