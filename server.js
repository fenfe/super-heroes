const express = require('express');
const port = 3000;
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// check server
app.get('/', (req, res) => {
res.send('working server here!')
})

// listen/alive
app.listen(port, () => {
    console.log('hello fifi')
});

// view/read database
app.get('/viewAll', (req, res) => {
    // access local db
    const localFile = fs.readFileSync('database.json', 'utf-8');
    //change to live js obj
    const db = JSON.parse(localFile);
    //access array inside local obj
    const currentDB = db.superheroes;
    res.send(currentDB)
})

//create/post
app.post('/addHero', (req, res) => {
    const localFile = fs.readFileSync('database.json', 'utf-8');
    const db = JSON.parse(localFile);
    const currentDB = db.superheroes;

    //create id for heroes automatically
    let nextHero = 1;
    if(currentDB.length > 0) {
        nextHero = currentDB[currentDB.length -1].id + 1;
    }

    // create obj to push to currentDB
    const newHero = {
        id : nextHero,
        heroName : req.body.heroName,
        alterego : req.body.alterEgo,
        powers : req.body.powers,
        movie : req.body.movie
    }

    // push into current array (currentDB)
    currentDB.push(newHero);
    // write it inside ur database
    fs.writeFileSync('database.json', JSON.stringify(db, null, 2));
    // respond to browser
    res.send(`${newHero} was added successfully to the database`)
})

//update hero details
app.post('/updateHero', (req, res) => {
// access localfile
const localFile = fs.readFileSync('database.json', 'utf-8');
// convert to usable obj in ram
const db = JSON.parse(localFile);

// get id of hero to update from user'sform
const heroToUpdate = req.body.id;
//check if the id is inside the database
const exists = db.superheroes.find(item => Number(item.id) === Number(heroToUpdate));
//if the hero is not in the database/ does not exist
if(!exists){
return res.status(404).send('hero not found inside database')
}
// if hero exist,update update all the fields from the new form
// and if they leave an input blank, keep the old value
exists.heroName = req.body.heroName;
exists.alterEgo = exists.alterEgo;
exists.powers = exists.powers;
exists.movie = exists.movie;

//write back to the file on system
fs.writeFileSync('database.json', JSON.stringify(db, null, 2));
//send responce to browser
res.send(`${exists.heroName} updated on file machine`)

})

// Delete hero
app.post('/deleteHero', (req, res) => {
const localFile = fs.readFileSync('database.json', 'utf-8');
const db = JSON.parse(localFile);

//get id of hero to delete
const heroToDelete = req.body.id;
// check if hero exists inside our file
const exists = db.superheroes.some(item => Number(item.id) === Number(heroToDelete));
// if id does not exist in our database
if(!exists){
return res.status(404).send('hero not found');
}

//if the hero is there, reassign db with all the values inside the db except heroToDelete
db.superheroes = db.superheroes.filter(item => Number(item.id) !== Number(heroToDelete))
// write it permanently to the system
fs.writeFileSync('database.json', JSON.stringify(db, null, 2));

// send respond to browser
res.send(`hero id ${heroToDelete} just got removed from database`)
})