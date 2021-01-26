

function delay(ms) {
    return new Promise(resolve => setTimeout(() => resolve(null), ms));
}

class MockScoreService {
    constructor(scores = [], delayMillis = 1000) {
        this.scores = scores;
        this.delayMillis = delayMillis;
        this._sort();
    }

    async getScores() {
        await delay(this.delayMillis);
        return Promise.resolve(this.scores);
    }

    async sendScore(name, score) {
        this.scores.push({ name, score });
        this._sort();
        await null;
    }

    _sort() {
        this.scores.sort((a, b) => a.score > b.score ? -1 : 0)
    }
}

export {
    MockScoreService
}