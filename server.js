const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express()
app.use(express.static('build'));
app.use(bodyParser.json())

app.get('/foo', (req, res) => { res.send('hello'); res.end(); })


let port = process.env.PORT || 3000
app.listen(port, function () {
    console.log(`app listening at localhost:${port}`)
})

// asdf asdf asdf asdf asdf asdf asdf asdf  asdf