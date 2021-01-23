let musicAudio = new Audio('/MachinimaSound.com_-_The_Arcade.mp3');
musicAudio.loop = true;

var coinAudio = new Audio('/coin.mp3');

// Constants
const UP = "UP";
const DOWN = "DOWN";
const LEFT = "LEFT";
const RIGHT = "RIGHT";


//Get the canvas & context
const canvas = document.getElementById('respondCanvas');
const ctx = canvas.getContext('2d');
var container = canvas.parentNode;


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

// Game State
let score;
let snakeParts;
let timer;
let appleX;
let appleY;
let speed;
let debugging = false;
let gameState = "title";
let name = "";
let directionList = [RIGHT];

document.addEventListener('keydown', handleKey);

function sendScore(name) {

    let nameScore = {
        name: name,
        score: score
    }

    fetch('/score', {
        method: 'POST',
        body: JSON.stringify(nameScore),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

async function getScores() {
    let response = await fetch('/score', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })

    return response.json();
}

function step() {
    // update snake position
    let head = snakeParts[snakeParts.length - 1].coord.copy();

    if (directionList.length > 1) {
        directionList.shift();
    }

    let direction = directionList[0]

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
        coinAudio.play();
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

function scaledFont(originalSize) {
    // return originalSize * (canvas.width / (64 * 15)) + "px sans-serif";
    return originalSize * (canvas.width / (64 * 15)) + "px Sniglet";
}

function showTitle() {
    getScores().then((scores) => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#4BF542';
        ctx.font = scaledFont(50);
        ctx.textAlign = 'center';
        ctx.fillText("SNAKE", canvas.width / 2, 150);
        ctx.font = scaledFont(40);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText("HIGH SCORES", canvas.width / 2, 225);

        for (let i = 0; i < scores.length; i++) {
            ctx.textAlign = 'left';
            ctx.font = scaledFont(30);
            ctx.fillText(`${scores[i].name}`, canvas.width / 3, 300 + 35 * i)
            ctx.textAlign = 'right'
            ctx.fillText(`${scores[i].score}`, canvas.width / 1.5, 300 + 35 * i)

        }
        ctx.fillStyle = '#4BF542'
        ctx.font = scaledFont(30);
        ctx.textAlign = 'center';
        ctx.fillText("Press ENTER to play", canvas.width / 2, (canvas.height / 2) + 300);
    });
}

function drawGame() {
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
    ctx.font = scaledFont(30);
    ctx.textAlign = 'center';
    ctx.fillText("Score: " + score, canvas.width / 2, 30);
}

function gameOver() {

    gameState = "gameover";
    clearInterval(timer);
    drawGame();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'white';
    ctx.font = scaledFont(50);
    ctx.textAlign = 'center';
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);

    ctx.fillStyle = 'white';
    ctx.font = scaledFont(30);
    ctx.textAlign = 'center';
    ctx.fillText("Score: " + score, canvas.width / 2, 30);

    ctx.fillStyle = 'white';
    ctx.font = scaledFont(30);
    ctx.textAlign = 'center';
    ctx.fillText("Enter your name:", canvas.width / 2, (canvas.height / 2) + 100);

    ctx.fillStyle = 'white';
    ctx.font = scaledFont(30);
    ctx.textAlign = 'center';
    ctx.fillText(name + "▯", canvas.width / 2, (canvas.height / 2) + 150);

    return;
}

function drawSprite(spriteCol, spriteRow, coord) {
    ctx.drawImage(spriteSheet, spriteCol * 64, spriteRow * 64, 64, 64, coord.x * size, coord.y * size, size, size);
}

function redraw() {

    //using three states

    if (gameState === "title") {
        showTitle();
    } else if (gameState === "playing") {
        drawGame();
    } else if (gameState === "gameover") {
        gameOver();
    }
}

function handleKey(e) {
    e.preventDefault();
    if (e.code === "Enter" && gameState === "title") {
        musicAudio.play();
        restartGame();
        return
    } else if (e.code === "Enter" && gameState === "gameover") {
        gameState = "title";
        sendScore(name);
        redraw();
        return
    } else if (gameState === "gameover") {
        // cheap attempt to ignore non-printable keys
        // (e.g. Shift, Alt, CapsLock)
        if (e.key.length == 1) {
            name += e.key;
        }
        if (e.key === "Backspace") {
            name = name.substring(0, name.length - 1);
            console.log(name);
        }
        redraw();
        return
    }

    if (gameState === "playing") {
        let head = snakeParts[snakeParts.length - 1];

        // handle directional input
        // ignore attempt to doubleback on yourself

        let lastDirection = directionList[directionList.length - 1]

        if (e.code === "ArrowUp" && lastDirection !== DOWN) {
            directionList.push(UP);
        } else if (e.code === "ArrowDown" && lastDirection !== UP) {
            directionList.push(DOWN);
        } else if (e.code === "ArrowLeft" && lastDirection !== RIGHT) {
            directionList.push(LEFT);
        } else if (e.code === "ArrowRight" && lastDirection !== LEFT) {
            directionList.push(RIGHT);
        }

        if (debugging) {
            step();
        }
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
    speed = 150;
    snakeParts = [
        new Part(new Coord(0, 0), RIGHT),
        new Part(new Coord(1, 0), RIGHT),
        new Part(new Coord(2, 0), RIGHT),
        new Part(new Coord(3, 0), RIGHT)

    ];
    directionList = [RIGHT];
    score = 0;
    [appleX, appleY] = randomCoord();
    gameState = "playing";
    name = "";

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






(async () => {
    // wait for font to load
    await document.fonts.load("12px Sniglet");

    showTitle();
    // restartGame();
    // debugGame();

    //Run function when browser  resize
    window.addEventListener('resize', respondCanvas);

    function min(a, b) { return a < b ? a : b; }

    function respondCanvas() {
        var rect = canvas.getBoundingClientRect();

        var canvasSize = min(window.innerHeight - rect.top, container.clientWidth);

        canvas.width = squares * Math.floor(canvasSize / squares); //max width
        canvas.height = squares * Math.floor(canvasSize / squares);  //set the heigh to the width

        size = Math.floor(canvasSize / squares);

        redraw();
    }

    //Initial call
    respondCanvas();

    // 100 px (original text size) * 32 (new canvas size)/64 (original canvas size)
    // 100 px * canvas.width/64 * 15
})()