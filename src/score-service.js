class ScoreService {
    constructor() {
        this.lastSend = Promise.resolve();
    }

    sendScore(name, score) {
        const nameScore = {
            name: name,
            score: score
        }

        // keep track of last submission,
        // as we'll want to wait for it to complete before we show the new scores.
        this.lastSend = fetch('/score', {
            method: 'POST',
            body: JSON.stringify(nameScore),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    async getScores() {
        // wait for any in-flight score submissions
        await this.lastSend;

        let response = await fetch('/score', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })

        return response.json();
    }
}

export {
    ScoreService
}