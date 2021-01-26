// Abstract screen class
class Screen {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    _scaledFont(scale) {
        // return originalSize * (canvas.width / (64 * 15)) + "px sans-serif";
        return scale * (this.width / (64 * 15)) + "px Sniglet";
    }
}

export {
    Screen
}