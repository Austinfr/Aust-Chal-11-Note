const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3003;

const database = './db/db.json';

app.use(express.static('public'));

//get *
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//get /notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//get /api/notes
app.get('/api/notes', (req, res) => {
    fs.readFile(database, 'utf-8', (err, data) => {
        if(err){
            throw err;
        }

        res.json(JSON.parse(data.toString()));

    });

});

//post /api/notes
app.post('/api/notes', (req, res) => {

    console.log(`${req.method} request to add data`);

    const { title, text } = req.body;

    console.log(title, text);

    const dataToWrite = JSON.stringify({title: title, text: text});
    fs.appendFile('./db/db.json', dataToWrite, err => {
        if(err){
            throw err;
        }
    });
});

//delete /api/notes/:id
app.delete('/api/notes/:id', (req, res) => {
    //gets the db
    let dataSaved = {};
    fs.readFile(database, 'utf-8', (err, data) => {
        if(err){
            throw err;
        }

        dataSaved = JSON.parse(data.toString());

    });

    //looks throught it to find the match
    for(let note in dataSaved){
        
    }
});



app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});