import { LEFT, RIGHT, UP } from "./direction.js"
import { BufferedInput } from "./buffered-input.js"

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

    test("pushing non-opposing directions", () => {
        let input = new BufferedInput(RIGHT);

        expect(input.popDirection()).toBe(RIGHT);
        input.pushDirection(UP);
        expect(input.popDirection()).toBe(UP);
    });

    test("pushing opposing directions", () => {
        // going right ...
        let input = new BufferedInput(RIGHT);
        expect(input.popDirection()).toBe(RIGHT);

        // ... then going left ...
        input.pushDirection(LEFT);

        // ... should ignore the LEFT input and continue going RIGHT.
        expect(input.popDirection()).toBe(RIGHT);
    });
})
