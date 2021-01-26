import { Screen } from './screen.js'

class TitleScreen extends Screen {
    constructor(ctx, scoreService, musicAudio) {
        super(ctx);
        this.scoreService = scoreService;
        this.musicAudio = musicAudio;
    }

    async start() {
        this.active = true;
        this.scores = null;
        this.draw();

        // get scores and redraw if we're still the active screen.
        this.scores = await this.scoreService.getScores();
        if (this.active) {
            this.draw();
        }
    }

    stop() {
        this.active = false;
    }

    draw() {
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

        if (this.scores === null) {
            this.ctx.textAlign = 'center';
            this.ctx.font = this._scaledFont(30);
            this.ctx.fillText("Loading . . .", this.width / 2, this.height * 0.32)
        } else {
            for (let i = 0; i < maxNumScores && i < this.scores.length; i++) {
                this.ctx.textAlign = 'left';
                this.ctx.font = this._scaledFont(30);
                this.ctx.fillText(`${this.scores[i].name}`, this.width / 3, this.height * (0.32 + i * 0.04))
                this.ctx.textAlign = 'right'
                this.ctx.fillText(`${this.scores[i].score}`, this.width / 1.5, this.height * (0.32 + i * 0.04))

            }
        }
        this.ctx.fillStyle = '#4BF542'
        this.ctx.font = this._scaledFont(30);
        this.ctx.textAlign = 'center';
        this.ctx.fillText("Press ENTER to play", this.width / 2, this.height * 0.80);
    }

    handleKey(e) {
        if (e.key === "Enter") {
            this.musicAudio.play();
            this.onNextScreen();
        }
    }
}

export {
    TitleScreen
}