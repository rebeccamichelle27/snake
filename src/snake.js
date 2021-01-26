import { Coord } from "./coord.js"
import { UP, DOWN, LEFT, RIGHT } from "./direction.js"

class SnakePart {
    constructor(coord, direction) {
        this.coord = coord;
        this.direction = direction;
    }
}

// Snake encapsulates the rules/logic for the snake game.
class Snake {
    constructor() {
        // dimensions as number of tiles.
        // hard-coded to a square of 15x15 tiles for now.
        this.width = 15;
        this.height = 15;

        this.reset();
    }

    // reset the snake game
    reset() {
        this.alive = true;
        this.score = 0;
        this.parts = [
            new SnakePart(new Coord(0, 0), RIGHT),
            new SnakePart(new Coord(1, 0), RIGHT),
            new SnakePart(new Coord(2, 0), RIGHT),
            new SnakePart(new Coord(3, 0), RIGHT)
        ];
        this.appleCoord = this.randomAppleCoord();
    }

    // Move the snake in the given direction.
    // If the snake ate an apple, returns true.
    // If the snake dies, the alive property to false.
    move(direction) {
        // update snake position
        let head = this.parts[this.parts.length - 1].coord.copy();

        if (direction === UP) {
            head.y -= 1;
        } else if (direction === DOWN) {
            head.y += 1;
        } else if (direction === LEFT) {
            head.x -= 1;
        } else if (direction === RIGHT) {
            head.x += 1;
        }
        this.parts.push(new SnakePart(head, direction));

        //Determines if the snake has hit its tail
        for (let i = 0; i < this.parts.length - 1; i++) {
            if (this.parts[i].coord.x === head.x && this.parts[i].coord.y === head.y) {
                // remove tip of tail
                this.parts.shift();
                this.alive = false;
                return false;
            }
        }

        //Determines if the snake has moved offscreen 
        if (head.x >= this.width || head.x < 0 || head.y >= this.height || head.y < 0) {
            // remove tip of tail
            this.parts.shift();
            this.alive = false;
            return false
        }

        //Determines if the snake hits the apple
        if (head.equals(this.appleCoord)) {
            this.appleCoord = this.randomAppleCoord();
            this.score += 100;
            return true;
        } else {
            // remove tip of tail
            this.parts.shift();
        }

        return false;
    }

    // Generate a random Coord unoccupied by the snake.
    randomAppleCoord() {
        const appleCoord = new Coord(0, 0);

        while (true) {
            let conflict = false;
            appleCoord.x = Math.floor(Math.random() * this.width);
            appleCoord.y = Math.floor(Math.random() * this.height);

            for (let segment of this.parts) {
                if (segment.coord.x === appleCoord.x && segment.coord.y === appleCoord.y) {
                    conflict = true;
                    break;
                }
            }

            if (!conflict) {
                break;
            }
        }

        return appleCoord;
    }
}

export {
    SnakePart,
    Snake
}