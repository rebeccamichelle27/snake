// Abstract screen class.
//
// Every screen must implement the following functions:
//   show, draw, stop
class Screen {
    constructor(ctx) {
        this.ctx = ctx;
        this.onNextScreen = () => { };
    }

    // start is called when the screen becomes active.
    // should (re)set any needed state and draw the initial frame.
    start() { throw 'not implemented'; }

    // draw is called directly when the page resized.
    draw() { throw 'not implemented'; }

    // stop is called when this screen is no longer the active screen.
    // should stop any background processing (e.g. call clearInterval if necessary).
    stop() { throw 'not implemented'; }

    _scaledFont(scale) {
        // return originalSize * (canvas.width / (64 * 15)) + "px sans-serif";
        return scale * (this.width / (64 * 15)) + "px Sniglet";
    }
}

export {
    Screen
}