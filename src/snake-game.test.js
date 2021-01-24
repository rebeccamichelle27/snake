import { BufferedInput, Coord, Snake, SnakePart, UP, DOWN, LEFT, RIGHT } from "./snake-game.js"

describe(BufferedInput, () => {
    test("initial direction", () => {
        let input = new BufferedInput(RIGHT);

        expect(input.popDirection()).toBe(RIGHT);
    });

    test("popping multiple times leaves at least one direction", () => {
        let input = new BufferedInput(RIGHT);

        expect(input.popDirection()).toBe(RIGHT);
        expect(input.popDirection()).toBe(RIGHT);
    });

    test("pushing directions", () => {
        let input = new BufferedInput(RIGHT);

        expect(input.popDirection()).toBe(RIGHT);
        input.pushDirection(LEFT);
        expect(input.popDirection()).toBe(LEFT);
    });
})

describe(Coord, () => {
    test("copy() should work", () => {
        const original = new Coord(2, 3);
        const copy = original.copy();

        expect(copy.x).toBe(original.x);
        expect(copy.y).toBe(original.y);

        // the original coord and the copy should not
        // be literally the same object.
        expect(copy).not.toBe(original);
    });
})

describe(Snake, () => {
    test("movement", () => {
        const snake = new Snake();
        const appleCoord = new Coord(5, 0);

        expect(snake.parts).toEqual([
            new SnakePart(new Coord(0, 0), RIGHT),
            new SnakePart(new Coord(1, 0), RIGHT),
            new SnakePart(new Coord(2, 0), RIGHT),
            new SnakePart(new Coord(3, 0), RIGHT)
        ]);

        expect(snake.move(RIGHT, appleCoord)).toBe(true);

        expect(snake.parts).toEqual([
            new SnakePart(new Coord(1, 0), RIGHT),
            new SnakePart(new Coord(2, 0), RIGHT),
            new SnakePart(new Coord(3, 0), RIGHT),
            new SnakePart(new Coord(4, 0), RIGHT)
        ]);

        expect(snake.move(RIGHT, appleCoord)).toBe(true);

        expect(snake.parts).toEqual([
            new SnakePart(new Coord(1, 0), RIGHT),
            new SnakePart(new Coord(2, 0), RIGHT),
            new SnakePart(new Coord(3, 0), RIGHT),
            new SnakePart(new Coord(4, 0), RIGHT),
            new SnakePart(new Coord(5, 0), RIGHT)
        ]);

        expect(snake.move(DOWN, appleCoord)).toBe(true);

        expect(snake.parts).toEqual([
            new SnakePart(new Coord(2, 0), RIGHT),
            new SnakePart(new Coord(3, 0), RIGHT),
            new SnakePart(new Coord(4, 0), RIGHT),
            new SnakePart(new Coord(5, 0), RIGHT),
            new SnakePart(new Coord(5, 1), DOWN)
        ]);

        expect(snake.move(LEFT, appleCoord)).toBe(true);

        expect(snake.parts).toEqual([
            new SnakePart(new Coord(3, 0), RIGHT),
            new SnakePart(new Coord(4, 0), RIGHT),
            new SnakePart(new Coord(5, 0), RIGHT),
            new SnakePart(new Coord(5, 1), DOWN),
            new SnakePart(new Coord(4, 1), LEFT)
        ]);

        expect(snake.move(DOWN, appleCoord)).toBe(true);

        expect(snake.parts).toEqual([
            new SnakePart(new Coord(4, 0), RIGHT),
            new SnakePart(new Coord(5, 0), RIGHT),
            new SnakePart(new Coord(5, 1), DOWN),
            new SnakePart(new Coord(4, 1), LEFT),
            new SnakePart(new Coord(4, 2), DOWN)
        ]);


        expect(snake.move(RIGHT, appleCoord)).toBe(true);

        expect(snake.parts).toEqual([
            new SnakePart(new Coord(5, 0), RIGHT),
            new SnakePart(new Coord(5, 1), DOWN),
            new SnakePart(new Coord(4, 1), LEFT),
            new SnakePart(new Coord(4, 2), DOWN),
            new SnakePart(new Coord(5, 2), RIGHT)
        ]);

        // now bite ourself

        expect(snake.move(UP, appleCoord)).toBe(false);

        expect(snake.parts).toEqual([
            new SnakePart(new Coord(5, 1), DOWN),
            new SnakePart(new Coord(4, 1), LEFT),
            new SnakePart(new Coord(4, 2), DOWN),
            new SnakePart(new Coord(5, 2), RIGHT),
            new SnakePart(new Coord(5, 1), UP)
        ]);
    })
})