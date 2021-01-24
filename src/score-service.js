class ScoreService {
    constructor() { }

    sendScore(name, score) {
        const nameScore = {
            name: name,
            score: score
        }

        return fetch('/score', {
            method: 'POST',
            body: JSON.stringify(nameScore),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    async getScores() {
        let response = await fetch('/score', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })

        return response.json();
    }
}