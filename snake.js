
// Constants
const UP = "UP";
const DOWN = "DOWN";
const LEFT = "LEFT";
const RIGHT = "RIGHT";

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

// have both coordinate as well as direction
class Part {
    constructor(coord, direction) {
        this.coord = coord;
        this.direction = direction;
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
let gameover = false;
let speed;
let debugging = false;
let direction = RIGHT;

document.addEventListener('keydown', handleKey);

function step() {
    // update snake position
    let head = snakeParts[snakeParts.length - 1].coord.copy();

    if (direction === UP) {
        head.y -= 1;
    } else if (direction === DOWN) {
        head.y += 1;
    } else if (direction === LEFT) {
        head.x -= 1;
    } else if (direction === RIGHT) {
        head.x += 1;
    }
    snakeParts.push(new Part(head, direction));

    //Determines if the snake has hit its tail
    for (let i = 0; i < snakeParts.length - 1; i++) {
        if (snakeParts[i].coord.x === head.x && snakeParts[i].coord.y === head.y) {
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
        if (!debugging) {
            timer = setInterval(step, speed);
        }
    } else {
        // remove tip of tail
        snakeParts.shift();
    }

    // if debugging, print snake coords
    if (debugging) {
        console.log("snake:", ...snakeParts.map(({ coord, direction }) => [coord.x, coord.y, direction]));
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
    let spriteSheet = document.getElementById("spriteSheet");
    ctx.drawImage(spriteSheet, 0 * 64, 3 * 64, 64, 64, appleX * size, appleY * size, size, size);

    // draw snake
    snakeParts.forEach(function (segment) {
        ctx.fillStyle = 'green';
        if (segment.direction === LEFT || segment.direction === RIGHT) {
            ctx.drawImage(spriteSheet, 1 * 64, 0 * 64, 64, 64, segment.coord.x * size, segment.coord.y * size, size, size);
        } else if (segment.direction === UP || segment.direction === DOWN) {
            ctx.drawImage(spriteSheet, 2 * 64, 1 * 64, 64, 64, segment.coord.x * size, segment.coord.y * size, size, size);
        }
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

    // handle directional input
    if (e.code === "ArrowUp") {
        direction = UP;
    } else if (e.code === "ArrowDown") {
        direction = DOWN;
    } else if (e.code === "ArrowLeft") {
        direction = LEFT;
    } else if (e.code === "ArrowRight") {
        direction = RIGHT;
    }

    if (debugging) {
        step();
    }
}

function randomCoord() {
    let appleX = Math.floor(Math.random() * squares);
    let appleY = Math.floor(Math.random() * squares);
    let appleCoords = [appleX, appleY];
    return appleCoords;
}


function resetGame() {
    speed = 250;
    snakeParts = [
        new Part(new Coord(0, 0), RIGHT),
        new Part(new Coord(1, 0), RIGHT),
        new Part(new Coord(2, 0), RIGHT),
        new Part(new Coord(3, 0), RIGHT)

    ];
    direction = RIGHT;
    score = 0;
    [appleX, appleY] = randomCoord();
    gameover = false;
}

function restartGame() {
    resetGame();
    redraw();
    timer = setInterval(step, speed);
}

function debugGame() {
    resetGame();
    debugging = true;
    appleX = 7;
    appleY = 3;
    redraw();
}

// restartGame();
debugGame();