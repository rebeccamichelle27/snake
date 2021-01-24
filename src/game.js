import { TitleScreen } from './title-screen.js'
import { GameScreen } from './game-screen.js'
import { Snake } from './snake.js'
import { UP, DOWN, LEFT, RIGHT } from './direction.js'
import { Coord } from './coord.js';



const squares = 15;

(async () => {
    await document.fonts.load("12px Sniglet");

    const appleCoord = new Coord(5, 5);

    const snake = new Snake();

    const titleScreen = new TitleScreen();
    const gameScreen = new GameScreen(snake);

    let squareSize;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const canvasContainer = canvas.parentNode;

    function min(a, b) { return a < b ? a : b; }

    window.addEventListener('resize', respondCanvas);
    function respondCanvas() {
        var rect = canvas.getBoundingClientRect();

        var canvasSize = min(window.innerHeight - rect.top, canvasContainer.clientWidth);

        canvas.width = squares * Math.floor(canvasSize / squares); //max width
        canvas.height = squares * Math.floor(canvasSize / squares);  //set the heigh to the width

        squareSize = Math.floor(canvasSize / squares);

        gameScreen.draw(ctx, canvas.width, canvas.height, appleCoord);

        // titleScreen.draw(ctx, canvas.width, canvas.height, [
        //     { name: "Rebecca", score: "1000000" },
        //     { name: "Rebecca", score: "1000000" },
        //     { name: "Rebecca", score: "1000000" },
        //     { name: "Rebecca", score: "1000000" },
        // ]);
    }

    //Initial call
    respondCanvas();
})()