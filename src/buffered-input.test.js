import { LEFT, RIGHT } from "./direction.js"
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

    test("pushing directions", () => {
        let input = new BufferedInput(RIGHT);

        expect(input.popDirection()).toBe(RIGHT);
        input.pushDirection(LEFT);
        expect(input.popDirection()).toBe(LEFT);
    });
})
