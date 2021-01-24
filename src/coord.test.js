import { Coord } from "./coord.js"

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