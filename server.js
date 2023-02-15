const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3003;

const database = './db/db.json';

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

//get *
//sets up the main homepage location
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//get /notes
//sets up the note taker portion
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//get /api/notes
//sets up any time the page requires what notes we have
app.get('/api/notes', (req, res) => {
    fs.readFile(database, 'utf-8', (err, data) => {
        if(err){
            throw err;
        }

        res.json(JSON.parse(data.toString()));

    });

});

//post /api/notes
//For when you save a note
app.post('/api/notes', (req, res) => {

    //deconstructs the request note that's passed in through the request body
    const { title, text } = req.body;

    let newNote = {title: title, text: text};

    fs.readFile(database, (err, data) => {

        let noteArray = JSON.parse(data.toString());
        
        //was having issues using the thing itself as it's own id and this is much simpler
        //just whichever spot it's in will be it's id
        newNote.id = noteArray.length;

        noteArray.push(newNote);

        let dataToWrite = JSON.stringify(noteArray);

        //once we get all the other saved notes and add the new one we can write it to our storage
        fs.writeFile(database, dataToWrite, err => {
            if(err){
                throw err;
            }
            
            res.json(JSON.parse(dataToWrite));
        });

    })

});

//delete /api/notes/:id
app.delete('/api/notes/:id', (req, res) => {
    //gets the db
    let dataSaved = {};
    fs.readFile(database, 'utf-8', (err, data) => {
        if(err){
            throw err;
        }

        dataSaved = JSON.parse(data);

        //looks throught it to find the match
        for(let i = 0; i < dataSaved.length; i++){
            //when it's matched remove it and update our storage
            if(JSON.stringify(dataSaved[i]) === req.params.id){
                dataSaved.splice(i, 1);

                fs.writeFile(database, JSON.stringify(dataSaved), err => {
                    if(err){
                        throw err;
                    }

                    res.json(dataSaved);
                });
            }
        }

    });

});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});