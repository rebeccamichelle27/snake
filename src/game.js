import { TitleScreen } from './screens/title-screen.js'
import { GameScreen } from './screens/game-screen.js'
import { GameOverScreen } from './screens/gameover-screen.js'
import { Snake } from './snake.js'
import { MockScoreService as ScoreService } from './mock-score-service.js'
// import { ScoreService } from './score-service.js'

const numSquares = 15;

function min(a, b) { return a < b ? a : b; }

// calculate best-fit dimensions for the window.
// assume square canvas dimensions for now.
function bestFitSize() {
    const canvasSize = min(window.innerHeight, window.innerWidth);
    return numSquares * Math.floor(canvasSize / numSquares);
}

function goFullScreen() {
    if (canvas.requestFullScreen)
        canvas.requestFullScreen();
    else if (canvas.webkitRequestFullScreen)
        canvas.webkitRequestFullScreen();
    else if (canvas.mozRequestFullScreen)
        canvas.mozRequestFullScreen();
}

(async () => {
    // wait for font to load.
    await document.fonts.load("12px Sniglet");

    // sprite sheet
    const spriteSheet = document.getElementById("spriteSheet");

    // audio
    const coinAudio = new Audio('/coin.mp3');
    const musicAudio = new Audio('/MachinimaSound.com_-_The_Arcade.mp3');
    musicAudio.loop = true;

    // canvas
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // score service
    const scoreService = new ScoreService();

    // snake, screens
    const snake = new Snake();
    const titleScreen = new TitleScreen(ctx, scoreService, musicAudio);
    const gameScreen = new GameScreen(ctx, snake, coinAudio, spriteSheet);
    const gameOverScreen = new GameOverScreen(ctx, gameScreen, scoreService);
    let activeScreen = titleScreen;
    const allScreens = [titleScreen, gameScreen, gameOverScreen];

    // cycle through screens
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
    }
    for (screen of allScreens) {
        screen.onNextScreen = onNextScreen;
    }

    // forward key events to active screen
    function handleKey(e) {
        activeScreen.handleKey(e);
    }
    document.addEventListener('keydown', handleKey);

    // activate current screen
    activeScreen.start();

    // handle window resizing
    window.addEventListener('resize', resizeCanvas);
    function resizeCanvas() {
        // update canvas dimensions
        const size = bestFitSize();
        canvas.width = canvas.height = size;

        // update screen dimensions
        for (screen of allScreens) {
            screen.width = screen.height = size;
        }

        activeScreen.draw();
    }

    // set initial canvas size
    resizeCanvas();
})()