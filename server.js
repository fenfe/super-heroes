const mongoose = require('mongoose');
const express = require('express');
const methodOverride = require('method-override'); 

const port = 3000;
const app = express();

// 1. DATABASE CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/superhero_db')
    .then(() => console.log('connected to my offline mongodb successfully!'))
    .catch(err => console.error('connection failed', err));

// 2. MONGOOSE SCHEMA & MODEL
const superHeroSchema = new mongoose.Schema({
    heroName : String,
    alterEgo : String,
    powers : String,
    movie : String
});
const Superhero = mongoose.model('Superhero', superHeroSchema);

// 3. EXPRESS MIDDLEWARE & SETTINGS
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// 4. ROUTES
app.get('/', async (req, res) => {
try{
    // fetch all heroes from database
    const allHeroes = await Superhero.find({});

    //render the index page passing the database array as heroes
    res.render('index', {
        title : 'Super hero center',
        userLoggedIn : true,
        heroes : allHeroes
    })
} catch (err) {
    console.error(err)
}
});

app.post('/addHero', async (req, res) => {
    try {
        const newHero = await Superhero.create({
            heroName : req.body.heroName,
            alterEgo : req.body.alterEgo,
            powers : req.body.powers,
            movie : req.body.movie
        });
        res.send(`${newHero.heroName} was just added!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Eish, something went wrong saving the hero');
    }
});

app.put('/updateHero', async(req, res) => {
    try {
        const targetId = req.body.id;
        const updatedHero = await Superhero.findByIdAndUpdate(
            targetId,
            {
                heroName : req.body.heroName,
                alterEgo : req.body.alterEgo,
                powers : req.body.powers,
                movie : req.body.movie
            },
            {new : true}
        );
        if(!updatedHero) {
            return res.status(404).send('Eish, i cant find that id inside ur database');
        }
        res.send(`Success! ${updatedHero.heroName} was updated in MongoDB offline!`);
    } catch(err) {
        console.error(err);
        res.status(500).send(`Something went wrong with the database update.`);
    }
});

app.delete('/deleteHero', async (req, res) => {
    try {
        const targetId = req.body.id;
        const deletedHero = await Superhero.findByIdAndDelete(targetId);
        if(!deletedHero){
            return res.status(404).send('hero not found');
        }
        res.send(`Success!!! ${deletedHero.heroName} was deleted from mongodb`);
    } catch(err) {
        res.status(500).send('Delete failed');
    }
});

app.get('/viewHeroes', async (req, res)=> {
    try {
        const allHeroes = await Superhero.find({});
        res.json(allHeroes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Sorry, could not view data from mongodb");
    }
});

// 5. LISTEN (Keep this at the very bottom)
app.listen(port, () => {
    console.log(`Server is alive on port ${port}`);
});
