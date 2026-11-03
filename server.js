// import mongoose
const mongoose = require('mongoose');
// make the connection
// '127.0.0.1:27017' tells Mongoose to look inside your own PC offline
// 'superhero_db' is the name of the database room we created in Compass
mongoose.connect('mongodb://127.0.0.1:27017/superhero_db')
    .then(() => console.log('connected to my offline mongodb successfully!'))
    .catch(err => console.error('conection failed', err))

// This tells Mongoose what fields to expect and enforce
const superHeroSchema = new mongoose.Schema({
    heroName : String,
    alterEgo : String,
    powers : String,
    movie : String
})
// This creates a usable "Model" called Superhero based on that blueprint
const Superhero = mongoose.model('superhero', superHeroSchema);

const express = require('express');
const port = 3000;
const app = express();
// const fs = require('fs'); // no longer read files locally





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


//create/post strictly to mongodb
app.post('/addHero', async (req, res) => {
    try{
        // Mongoose builds the object AND writes it to the database all in one step!
        const newHero = await Superhero.create({
            heroName : req.body.heroName,
            alterEgo : req.body.alterEgo,
            powers : req.body.powers,
            movie : req.body.movie
        });

        // Respond to the browser using the name from the saved document
        res.send(`${newHero.heroName} was just added1`)
    } catch (err) {
        console.error(err);
        res.status(500).send('Eish, something went wrong saving the hero')
    }
  

})

//update hero details


// Delete hero


