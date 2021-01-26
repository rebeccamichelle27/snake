import { Screen } from './screen.js'
import { UP, DOWN, LEFT, RIGHT } from './direction.js'

class GameScreen extends Screen {
    constructor(width, height, snake, applecoord) {
        super(width, height);
        this.snake = snake;
        this.applecoord = applecoord;
        this.score = 0;
    }

    draw(ctx) {
        let spriteSheet = document.getElementById("spriteSheet");

        // TODO: clean this up
        const tileSize = this.width / 15;

        // helper to draw from sprite sheet
        function drawSprite(spriteCol, spriteRow, coord) {
            ctx.drawImage(spriteSheet, spriteCol * 64, spriteRow * 64, 64, 64, coord.x * tileSize, coord.y * tileSize, tileSize, tileSize);
        }

        // clear canvas
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.width, this.height);

        // draw apple
        ctx.drawImage(spriteSheet, 0 * 64, 3 * 64, 64, 64, this.applecoord.x * tileSize, this.applecoord.y * tileSize, tileSize, tileSize);

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
        ctx.fillStyle = 'white';
        ctx.font = this._scaledFont(30);
        ctx.textAlign = 'center';
        ctx.fillText("Score: " + this.score, this.width / 2, this.height * 0.03);

    }
}

export {
    GameScreen
}