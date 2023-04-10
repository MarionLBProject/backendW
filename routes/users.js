var express = require('express');
var router = express.Router();

const User = require("../models/users");

// Route pr inscription - save something new
router.post('/signup', (req, res) => { // route POST car infos sensibles email/pw à ne pas show ds l'URL
    // check if signup data is valid
    
    if( !req.body.name || !req.body.email || !req.body.password) { // means if value is undefined or null
      res.json({ result: false, error: 'Missing or empty fields '});
      return; // la fct stoppe, n'a pas besoin de continuer l'inscription si ces champs sont vides / sinon on fait un else
    }
    // check if user is already registered
    User.findOne({ email: req.body.email })
    .then(data => { // data reponse findOne. if there is data, there is user, if null, this email is not in bdd
        if (data === null) { // means user not registered
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            newUser.save() // new doc saved in bdd, collec° Users
            .then(() => {
                res.json({ result: true })
            })
        } else { // means user already exist in bdd
            res.json({ result: false, error: 'User already exists' })
        }
    })
});

// route pour connexion - verif infos user
router.post('/signin', (req, res) => {
    // check if signin data is valid
    if( !req.body.email || !req.body.password) { 
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
// check if user is registered
    User.findOne({ email: req.body.email, password: req.body.password })
    .then(data => {  // si le .then recupère utilisateur, c'est que les infos sont bonnes, si .then recoit null= soit email soit pw est wrong
        if(data) { // if data=true (!null), on recupere bien un doc
           res.json({ result: true }); // user is registered
        } else {
           res.json({ result: false, error: 'User not found' });
        }
    });
});
    
    
module.exports = router;