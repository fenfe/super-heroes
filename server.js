const mongoose = require('mongoose');
const express = require('express');
const methodOverride = require('method-override'); 
const path = require('path')

const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/superhero_db';
const app = express();

// 1. DATABASE CONNECTION
mongoose.connect(dbURI)
    .then(() => console.log('connected to mongodb successfully!'))
    .catch(err => console.error('connection failed', err));

// 2. MONGOOSE SCHEMA & MODEL
const superHeroSchema = new mongoose.Schema({
    heroName : {type: String, required: true, trim: true, maxlength: 50},
    alterEgo : {type: String, trim: true, maxlength: 50},
    powers : {type: String, trim: true, maxlength: 50},
    movie : {type: String, trim: true, maxlength: 80}
});
const Superhero = mongoose.model('Superhero', superHeroSchema);

// 3. EXPRESS MIDDLEWARE & SETTINGS
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname)));
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
        
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Eish, something went wrong saving the hero');
    }
});

app.put('/updateHero', async(req, res) => {
    try {
        const targetId = req.body.id; //
        // fetch existing hero fro, database
        const oldHero = await Superhero.findById(targetId);
        
        if(!oldHero) {
            return res.status(404).send('Eish, i cant find that id inside ur database');
        }

        const updatedHero = await Superhero.findByIdAndUpdate(targetId,{
            heroName : req.body.heroName || oldHero.heroName,
            alterEgo : req.body.alterEgo || oldHero.alterEgo,
            powers : req.body.powers || oldHero.powers,
            movie : req.body.movie || oldHero.movie
        },
        {new : true}
        );
        res.redirect('/');
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
        res.redirect('/');
    } catch(err) {
        res.status(500).send('Delete failed');
    }
});

// 5. LISTEN (Keep this at the very bottom)
app.listen(port, () => {
    console.log(`Server is alive on port ${port}`);
});


////////////////////////////////////////

