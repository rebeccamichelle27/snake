import { TitleScreen } from './title-screen.js'
import { GameScreen } from './game-screen.js'
import { GameOverScreen } from './gameover-screen.js'
import { Snake } from './snake.js'
import { BufferedInput } from './buffered-input.js'
import { UP, DOWN, LEFT, RIGHT } from './direction.js'
import { Coord } from './coord.js';

const numSquares = 15;

(async () => {
    await document.fonts.load("12px Sniglet");

    let squareSize;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const canvasContainer = canvas.parentNode;

    const snake = new Snake();

    let width = 100;
    let height = 100;

    const titleScreen = new TitleScreen(ctx, width, height);
    const gameScreen = new GameScreen(ctx, width, height, snake);
    const gameOverScreen = new GameOverScreen(ctx, width, height, gameScreen);
    let activeScreen = titleScreen;

    const allScreens = [titleScreen, gameScreen, gameOverScreen];

    function onNextScreen() {
        activeScreen.stop();

        if (activeScreen === titleScreen) {
            activeScreen = gameScreen;
        } else if (activeScreen === gameScreen) {
            activeScreen = gameOverScreen;

        } else {
            activeScreen = titleScreen;
        }

        activeScreen.start();
        activeScreen.draw();
    }
    for (screen of allScreens) {
        screen.onNextScreen = onNextScreen;
    }

    function handleKey(e) {
        e.preventDefault();
        activeScreen.handleKey(e);
    }
    document.addEventListener('keydown', handleKey);

    activeScreen.start();

    // let timer = setInterval(step, 150);
    // function step() {

    // }

    function min(a, b) { return a < b ? a : b; }

    window.addEventListener('resize', respondCanvas);
    function respondCanvas() {

        // calculate best-fit dimensions for the window.
        // assume square canvas dimensions for now.
        const rect = canvas.getBoundingClientRect();
        const canvasSize = min(window.innerHeight - rect.top, canvasContainer.clientWidth);
        width = height = numSquares * Math.floor(canvasSize / numSquares);

        // update canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // update screen dimensions
        for (screen of allScreens) {
            screen.width = width;
            screen.height = height;
        }

        activeScreen.draw();

        // titleScreen.draw(ctx, [
        //     { name: "Rebecca", score: "1000000" },
        //     { name: "Rebecca", score: "1000000" },
        //     { name: "Rebecca", score: "1000000" },
        //     { name: "Rebecca", score: "1000000" },
        // ]);

        // gameOverScreen.draw(ctx);


    }

    //Initial call
    respondCanvas();
})()

