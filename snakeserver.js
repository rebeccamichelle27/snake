const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express()
app.use(express.static('public'));
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://cluster0.hdhvv.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    pass: process.env.MONGO_PASSWORD,
    user: "admin-rebecca",
    dbName: 'scores'
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


const scoresSchema = {
    name: String,
    score: Number
};

const Score = mongoose.model("Score", scoresSchema);

// for testing purposes
const delay = time => new Promise(res => setTimeout(() => res(), time));


app.get("/score", async (req, res) => {
    let scores = await Score.find({}, { _id: 0, __v: 0 }, { sort: { score: -1 }, limit: 10 });
    res.send(scores);
})

app.post("/score", (req, res) => {
    const score = new Score(req.body);
    score.save(function (err) {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            res.status(201);
        }
        res.end();
    });
})


app.get('/', (req, res) => {
    res.sendFile('index.html')
});


db.once('open', function () {

    app.listen(process.env.PORT || 3000, function () {
        console.log("app listening at local host 3000")
    })
});
