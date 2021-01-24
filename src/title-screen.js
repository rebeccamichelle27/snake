import { Screen } from './screen.js'

class TitleScreen extends Screen {
    constructor() {
        super();
    }

    draw(ctx, width, height, scores) {
        const maxNumScores = 10;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#4BF542';
        ctx.font = this._scaledFont(50, width);
        ctx.textAlign = 'center';
        ctx.fillText("SNAKE", width / 2, height * 0.15);
        ctx.font = this._scaledFont(40, width);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText("HIGH SCORES", width / 2, height * 0.25);


        for (let i = 0; i < maxNumScores && i < scores.length; i++) {
            ctx.textAlign = 'left';
            ctx.font = this._scaledFont(30, width);
            ctx.fillText(`${scores[i].name}`, width / 3, height * (0.32 + i * 0.04))
            ctx.textAlign = 'right'
            ctx.fillText(`${scores[i].score}`, width / 1.5, height * (0.32 + i * 0.04))

        }
        ctx.fillStyle = '#4BF542'
        ctx.font = this._scaledFont(30, width);
        ctx.textAlign = 'center';
        ctx.fillText("Press ENTER to play", width / 2, height * 0.80);
    }
}

export {
    TitleScreen
}