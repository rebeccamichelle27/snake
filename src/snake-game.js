const UP = "UP";
const DOWN = "DOWN";
const LEFT = "LEFT";
const RIGHT = "RIGHT";

// This represents a queue of user directional input.
class BufferedInput {
    constructor(initialDirection) {
        this.directionQueue = [initialDirection];
    }

    popDirection() {
        if (this.directionQueue.length > 1) {
            this.directionQueue.shift();
        }

        return this.directionQueue[0];
    }

    pushDirection(direction) {
        this.directionQueue.push(direction);
    }
}

class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Coord(this.x, this.y);
    }

    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
}

class SnakePart {
    constructor(coord, direction) {
        this.coord = coord;
        this.direction = direction;
    }
}

class Snake {
    constructor() {
        this.width = 15;
        this.height = 15;

        this.parts = [
            new SnakePart(new Coord(0, 0), RIGHT),
            new SnakePart(new Coord(1, 0), RIGHT),
            new SnakePart(new Coord(2, 0), RIGHT),
            new SnakePart(new Coord(3, 0), RIGHT)
        ];
    }

    // Move the snake in the given direction. (TODO: describe appleCoord argument)
    // If the snake is still alive, returns true.
    move(direction, appleCoord) {
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
                return false;
            }
        }

        //Determines if the snake has moved offscreen 
        if (head.x >= this.width || head.x < 0 || head.y >= this.height || head.y < 0) {
            // remove tip of tail
            this.parts.shift();
            return false
        }

        //Determines if the snake hits the apple
        if (!head.equals(appleCoord)) {
            // remove tip of tail
            this.parts.shift();
        }

        return true;
    }
}

export {
    UP, DOWN, LEFT, RIGHT,
    Coord,
    SnakePart,
    Snake,
    BufferedInput
}