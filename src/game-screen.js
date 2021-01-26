import { Screen } from './screen.js'
import { UP, DOWN, LEFT, RIGHT } from './direction.js'
import { BufferedInput } from './buffered-input.js'


class GameScreen extends Screen {
    constructor(ctx, width, height, snake) {
        super(ctx, width, height);
        this.snake = snake;
    }

    start() {
        // reset the game
        this.snake.reset();

        // reset input buffer
        this.bufferedInput = new BufferedInput(RIGHT);

        // start game loop
        this.interval = setInterval(() => {
            let alive = this.snake.move(this.bufferedInput.popDirection());
            this.draw();

            // If we're dead, go to gameover screen.
            if (!alive) {
                this.onNextScreen();
            }
        }, 150);
    }

    stop() {
        clearInterval(this.interval);
    }

    draw() {
        let spriteSheet = document.getElementById("spriteSheet");

        // TODO: clean this up
        const tileSize = this.width / 15;

        // helper to draw from sprite sheet
        const drawSprite = (spriteCol, spriteRow, coord) => {
            this.ctx.drawImage(spriteSheet, spriteCol * 64, spriteRow * 64, 64, 64, coord.x * tileSize, coord.y * tileSize, tileSize, tileSize);
        }

        // clear canvas
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // draw apple
        drawSprite(0, 3, this.snake.appleCoord);

        // draw tail of snake
        let tail = this.snake.parts[0];
        let beforeTail = this.snake.parts[1];

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
        for (let i = 1; i < this.snake.parts.length - 1; i++) {
            let segment = this.snake.parts[i];
            let nextSegment = this.snake.parts[i + 1];

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
        let head = this.snake.parts[this.snake.parts.length - 1];

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
        this.ctx.fillStyle = 'white';
        this.ctx.font = this._scaledFont(30);
        this.ctx.textAlign = 'center';
        this.ctx.fillText("Score: " + this.snake.score, this.width / 2, this.height * 0.03);

    }

    handleKey(e) {
        let direction;
        if (e.code === "ArrowUp") {
            direction = UP;
        } else if (e.code === "ArrowDown") {
            direction = DOWN;
        } else if (e.code === "ArrowLeft") {
            direction = LEFT;
        } else if (e.code === "ArrowRight") {
            direction = RIGHT;
        } else {
            return;
        }

        this.bufferedInput.pushDirection(direction);
    }
}

export {
    GameScreen
}