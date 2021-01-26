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

    test("a.equals(a)", () => {
        const a = new Coord(0, 0);
        const b = new Coord(0, 0);

        expect(a.equals(b)).toBe(true);
    });

    test("a.equals(b)  [where a != b]", () => {
        const a = new Coord(0, 0);
        const b = new Coord(1, 1);

        expect(a.equals(b)).toBe(false);
    });
})