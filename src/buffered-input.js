import { UP, DOWN, LEFT, RIGHT } from './direction.js'

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
        const rev = {
            [UP]: DOWN,
            [DOWN]: UP,
            [LEFT]: RIGHT,
            [RIGHT]: LEFT,
        }

        // only push the direction if it's not the opposite of the last enqueued direction.
        if (direction !== rev[this.directionQueue[this.directionQueue.length - 1]]) {
            this.directionQueue.push(direction);
        }
    }
}

export {
    BufferedInput
}