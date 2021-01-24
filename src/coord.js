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

export {
    Coord
}