const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();


//we now convert the post to get and we will also create a middleware before resolvin the request

//we will call middleware here through ensureAuthenticated
router.get('/', ensureAuthenticated, (req, res) => {

    //to save data call is best practice, we store frequently used information in our server

    //this is the place where we store user related information, let's say for RBAC, information can be stored in object like req.user

    
    console.log('---- logged in user detail ---', req.user); //to check req.user from Auth.js after JWT verification

    //passing json directly
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },
        {
            name: "tv",
            price: 20000
        }
    ])
});

module.exports = router;