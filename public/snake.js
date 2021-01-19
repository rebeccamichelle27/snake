
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
let gameActive = false;

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
    console.log(canvas.width, canvas.height);
    if (head.x >= squares || head.x < 0 || head.y >= squares || head.y < 0) {
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
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'white';
    ctx.font = '50px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    ctx.font = '30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("Press ENTER to start a new game", canvas.width / 2, (canvas.height / 2) + 50);
    ctx.fillStyle = 'white';
    ctx.font = '30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("Score: " + score, canvas.width / 2, 30);
    return;
}

function drawSprite(spriteCol, spriteRow, coord) {
    ctx.drawImage(spriteSheet, spriteCol * 64, spriteRow * 64, 64, 64, coord.x * size, coord.y * size, size, size);
}

function redraw() {
    // clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw apple
    let spriteSheet = document.getElementById("spriteSheet");
    ctx.drawImage(spriteSheet, 0 * 64, 3 * 64, 64, 64, appleX * size, appleY * size, size, size);

    // draw tail of snake
    let tail = snakeParts[0];
    let beforeTail = snakeParts[1];

    if (beforeTail.direction === UP) {
        drawSprite(3, 2, tail.coord);
    } else if (beforeTail.direction === DOWN) {
        drawSprite(4, 3, tail.coord);
    } else if (beforeTail.direction === RIGHT) {
        drawSprite(4, 2, tail.coord);
    } else if (beforeTail.direction === LEFT) {
        drawSprite(3, 3, tail.coord);
    }

    // draw body of snake
    for (let i = 1; i < snakeParts.length - 1; i++) {
        let segment = snakeParts[i];
        let nextSegment = snakeParts[i + 1];

        const rev = {
            [UP]: DOWN,
            [DOWN]: UP,
            [LEFT]: RIGHT,
            [RIGHT]: LEFT,
        }

        function pathIs(dir1, dir2) {
            return (
                segment.direction === dir1 && nextSegment.direction === dir2 ||
                segment.direction === rev[dir2] && nextSegment.direction === rev[dir1]
            );

        }

        if (pathIs(UP, LEFT)) {
            drawSprite(2, 0, segment.coord);
        } else if (pathIs(UP, RIGHT)) {
            drawSprite(0, 0, segment.coord);
        } else if (pathIs(DOWN, LEFT)) {
            drawSprite(2, 2, segment.coord);
        } else if (pathIs(DOWN, RIGHT)) {
            drawSprite(0, 1, segment.coord);

        } else if (segment.direction === LEFT || segment.direction === RIGHT) {
            drawSprite(1, 0, segment.coord);
        } else if (segment.direction === UP || segment.direction === DOWN) {
            drawSprite(2, 1, segment.coord);
        }
    };

    // draw head of snake
    let head = snakeParts[snakeParts.length - 1];

    if (head.direction === UP) {
        drawSprite(3, 0, head.coord);
    } else if (head.direction === DOWN) {
        drawSprite(4, 1, head.coord);
    } else if (head.direction === LEFT) {
        drawSprite(3, 1, head.coord);
    } else if (head.direction === RIGHT) {
        drawSprite(4, 0, head.coord);
    }

    // draw score
    ctx.fillStyle = 'white';
    ctx.font = '30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("Score: " + score, canvas.width / 2, 30);

}


function handleKey(e) {
    if (e.code === "Enter" && gameover || e.code === "Enter" && !gameActive) {
        gameActive = true;
        restartGame();
        return;
    }

    let head = snakeParts[snakeParts.length - 1];

    // handle directional input
    // ignore attempt to doubleback on yourself

    if (e.code === "ArrowUp" && head.direction !== DOWN) {
        direction = UP;
    } else if (e.code === "ArrowDown" && head.direction !== UP) {
        direction = DOWN;
    } else if (e.code === "ArrowLeft" && head.direction !== RIGHT) {
        direction = LEFT;
    } else if (e.code === "ArrowRight" && head.direction !== LEFT) {
        direction = RIGHT;
    }

    if (debugging) {
        step();
    }
}

function randomCoord() {

    let appleX;
    let appleY;

    while (true) {

        let conflict = false;

        appleX = Math.floor(Math.random() * squares);
        appleY = Math.floor(Math.random() * squares);

        for (segment of snakeParts) {
            if (segment.coord.x === appleX && segment.coord.y === appleY) {
                conflict = true;
                break;
            }
        }

        if (!conflict) {
            break;
        }
    }

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

function showTitle() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'white';
    ctx.font = '50px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("SNAKE", canvas.width / 2, canvas.height / 2);
    ctx.font = '30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("Press ENTER to play", canvas.width / 2, (canvas.height / 2) + 50);
}


showTitle();
// restartGame();
// debugGame();