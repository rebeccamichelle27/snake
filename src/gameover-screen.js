import { Screen } from './screen.js'

class GameOverScreen extends Screen {

    constructor(ctx, width, height, gameScreen) {
        super(ctx, width, height);
        this.gameScreen = gameScreen;
        this.name = "";
    }

    draw() {
        this.gameScreen.draw(this.ctx)

        this.ctx.globalAlpha = 0.7;
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = 'white';
        this.ctx.font = this._scaledFont(50);
        this.ctx.textAlign = 'center';
        this.ctx.fillText("GAME OVER", this.width / 2, this.height / 2);

        this.ctx.fillStyle = 'white';
        this.ctx.font = this._scaledFont(30);
        this.ctx.textAlign = 'center';
        this.ctx.fillText("Score: " + this.gameScreen.snake.score, this.width / 2, this.height * 0.03);

        this.ctx.fillStyle = 'white';
        this.ctx.font = this._scaledFont(30);
        this.ctx.textAlign = 'center';
        this.ctx.fillText("Enter your name:", this.width / 2, this.height * 0.60);

        this.ctx.fillStyle = 'white';
        this.ctx.font = this._scaledFont(30);
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.name + "▯", this.width / 2, this.height * 0.67);
    }

    handleKey(e) {
        if (e.key === "Enter") {
            // TODO: submit score
            this.onNextScreen();
            return;
        }

        if (this.name.length < 15 && e.key.length == 1) {
            this.name += e.key;
        } else if (e.key === "Backspace") {
            this.name = this.name.substring(0, this.name.length - 1);
        }
        this.draw();
    }
}

export {
    GameOverScreen
}