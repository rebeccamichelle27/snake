import { Screen } from './screen.js'

class TitleScreen extends Screen {
    constructor(ctx, width, height) {
        super(ctx, width, height);
    }

    start() {
        this.draw();
    }

    draw() {
        const scores = []; // TODO

        const maxNumScores = 10;

        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = '#4BF542';
        this.ctx.font = this._scaledFont(50);
        this.ctx.textAlign = 'center';
        this.ctx.fillText("SNAKE", this.width / 2, this.height * 0.15);
        this.ctx.font = this._scaledFont(40);
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.fillText("HIGH SCORES", this.width / 2, this.height * 0.25);


        for (let i = 0; i < maxNumScores && i < scores.length; i++) {
            this.ctx.textAlign = 'left';
            this.ctx.font = this._scaledFont(30);
            this.ctx.fillText(`${scores[i].name}`, this.width / 3, this.height * (0.32 + i * 0.04))
            this.ctx.textAlign = 'right'
            this.ctx.fillText(`${scores[i].score}`, this.width / 1.5, this.height * (0.32 + i * 0.04))

        }
        this.ctx.fillStyle = '#4BF542'
        this.ctx.font = this._scaledFont(30);
        this.ctx.textAlign = 'center';
        this.ctx.fillText("Press ENTER to play", this.width / 2, this.height * 0.80);
    }

    handleKey(e) {
        if (e.key === "Enter") {
            this.onNextScreen();
        }
    }
}

export {
    TitleScreen
}