import { Screen } from './screen.js'

class TitleScreen extends Screen {
    constructor(width, height) {
        super(width, height);
    }

    draw(ctx, scores) {
        const maxNumScores = 10;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#4BF542';
        ctx.font = this._scaledFont(50);
        ctx.textAlign = 'center';
        ctx.fillText("SNAKE", this.width / 2, this.height * 0.15);
        ctx.font = this._scaledFont(40);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText("HIGH SCORES", this.width / 2, this.height * 0.25);


        for (let i = 0; i < maxNumScores && i < scores.length; i++) {
            ctx.textAlign = 'left';
            ctx.font = this._scaledFont(30);
            ctx.fillText(`${scores[i].name}`, this.width / 3, this.height * (0.32 + i * 0.04))
            ctx.textAlign = 'right'
            ctx.fillText(`${scores[i].score}`, this.width / 1.5, this.height * (0.32 + i * 0.04))

        }
        ctx.fillStyle = '#4BF542'
        ctx.font = this._scaledFont(30);
        ctx.textAlign = 'center';
        ctx.fillText("Press ENTER to play", this.width / 2, this.height * 0.80);
    }
}

export {
    TitleScreen
}