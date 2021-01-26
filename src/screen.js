// Abstract screen class
class Screen {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.onNextScreen = () => { };
    }

    start() { }

    stop() { }

    _scaledFont(scale) {
        // return originalSize * (canvas.width / (64 * 15)) + "px sans-serif";
        return scale * (this.width / (64 * 15)) + "px Sniglet";
    }

}

export {
    Screen
}