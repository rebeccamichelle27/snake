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

export {
    BufferedInput
}