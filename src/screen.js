// Abstract screen class
class Screen {
    _scaledFont(scale, width) {
        // return originalSize * (canvas.width / (64 * 15)) + "px sans-serif";
        return scale * (width / (64 * 15)) + "px Sniglet";
    }
}

export {
    Screen
}