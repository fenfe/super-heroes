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
const Superhero = mongoose.model('Superhero', superHeroSchema);

const express = require('express');
const port = 3000;
const app = express();
// const fs = require('fs'); // no longer read files locally





app.use(express.json());
app.use(express.urlencoded({extended: true}));// accept html forms

// check server
app.get('/', (req, res) => {
res.send('working server here!')
})

// app lives here
app.listen(port, () => {
    console.log('hello fifi')
});

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
app.post('/updateHero', async(req, res) => {
    try{
        // 1. Grab that long unique MongoDB ID code from your form
        const targetId = req.body.id;

        // 2. Tell MongoDB to find that specific ID and change its values
        const updatedHero = await Superhero.findByIdAndUpdate(
            targetId,
            {
                heroName : req.body.heroName,
                alterEgo : req.body.alterEgo,
                powers : req.body.powers,
                movie : req.body.movie
            },
            {new : true}//mongodb send us back the fresh updated data
        );
        // if the id is wrong and theres no match
        if(!updatedHero) {
            return res.status(404).send('Eish, i cant find that id inside ur database');
        }

        res.send(`Success ${updatedHero.heroName} was updated in MongoDB offline!`)
    } catch(err) {
        console.error(err);
        res.status(500).send(`Something went wrong with the database update.`)
    }
});
  

// Delete hero
app.post('/deleteHero', async (req, res) => {
    try{
        const targetId = req.body.id;
        const deletedHero = await Superhero.findByIdAndDelete(targetId);

        if(!deletedHero){
            return res.status(404).send('hero not found');
        }
        res.send(`Success!!! ${deletedHero.heroName} was deleted from mongodb`)
    } catch(err) {
        res.status(500).send('Delete failed')
    }
})

// view whats inside our databse
app.get('/viewHeroes', async (req, res)=> {
    try{
        const allHeroes = await Superhero.find({});

        res.json(allHeroes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Sorry, could not view data frommongodb")
    }
})

