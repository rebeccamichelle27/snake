import { UP, DOWN, LEFT, RIGHT } from "./direction.js"
import { Snake, SnakePart } from "./snake.js"
import { Coord } from "./coord.js"

describe(Snake, () => {
    test("movement", () => {
        const snake = new Snake();

        // mock out the apple coordinates so they remain fixed
        // at a known location during the test:
        const appleCoord = new Coord(5, 0);
        snake.appleCoord = appleCoord
        snake.randomAppleCoord = () => { return appleCoord; }

        expect(snake.parts).toEqual([
            new SnakePart(new Coord(0, 0), RIGHT),
            new SnakePart(new Coord(1, 0), RIGHT),
            new SnakePart(new Coord(2, 0), RIGHT),
            new SnakePart(new Coord(3, 0), RIGHT)
        ]);

        expect(snake.move(RIGHT)).toBe(false);
        expect(snake.alive).toBe(true);

        expect(snake.parts).toEqual([
            new SnakePart(new Coord(1, 0), RIGHT),
            new SnakePart(new Coord(2, 0), RIGHT),
            new SnakePart(new Coord(3, 0), RIGHT),
            new SnakePart(new Coord(4, 0), RIGHT)
        ]);

        // should eat apple here
        expect(snake.move(RIGHT)).toBe(true);
        expect(snake.alive).toBe(true);


        expect(snake.parts).toEqual([
            new SnakePart(new Coord(1, 0), RIGHT),
            new SnakePart(new Coord(2, 0), RIGHT),
            new SnakePart(new Coord(3, 0), RIGHT),
            new SnakePart(new Coord(4, 0), RIGHT),
            new SnakePart(new Coord(5, 0), RIGHT)
        ]);

        expect(snake.move(DOWN)).toBe(false);
        expect(snake.alive).toBe(true);


        expect(snake.parts).toEqual([
            new SnakePart(new Coord(2, 0), RIGHT),
            new SnakePart(new Coord(3, 0), RIGHT),
            new SnakePart(new Coord(4, 0), RIGHT),
            new SnakePart(new Coord(5, 0), RIGHT),
            new SnakePart(new Coord(5, 1), DOWN)
        ]);

        expect(snake.move(LEFT)).toBe(false);
        expect(snake.alive).toBe(true);


        expect(snake.parts).toEqual([
            new SnakePart(new Coord(3, 0), RIGHT),
            new SnakePart(new Coord(4, 0), RIGHT),
            new SnakePart(new Coord(5, 0), RIGHT),
            new SnakePart(new Coord(5, 1), DOWN),
            new SnakePart(new Coord(4, 1), LEFT)
        ]);

        expect(snake.move(DOWN)).toBe(false);
        expect(snake.alive).toBe(true);


        expect(snake.parts).toEqual([
            new SnakePart(new Coord(4, 0), RIGHT),
            new SnakePart(new Coord(5, 0), RIGHT),
            new SnakePart(new Coord(5, 1), DOWN),
            new SnakePart(new Coord(4, 1), LEFT),
            new SnakePart(new Coord(4, 2), DOWN)
        ]);


        expect(snake.move(RIGHT)).toBe(false);
        expect(snake.alive).toBe(true);


        expect(snake.parts).toEqual([
            new SnakePart(new Coord(5, 0), RIGHT),
            new SnakePart(new Coord(5, 1), DOWN),
            new SnakePart(new Coord(4, 1), LEFT),
            new SnakePart(new Coord(4, 2), DOWN),
            new SnakePart(new Coord(5, 2), RIGHT)
        ]);

        // now bite ourself

        expect(snake.move(UP)).toBe(false);
        expect(snake.alive).toBe(false);

        expect(snake.parts).toEqual([
            new SnakePart(new Coord(5, 1), DOWN),
            new SnakePart(new Coord(4, 1), LEFT),
            new SnakePart(new Coord(4, 2), DOWN),
            new SnakePart(new Coord(5, 2), RIGHT),
            new SnakePart(new Coord(5, 1), UP)
        ]);
    })
})