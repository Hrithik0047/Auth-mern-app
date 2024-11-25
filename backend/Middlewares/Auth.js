// this is to access product data, we also created router for product


const jwt = require('jsonwebtoken'); //library for jwt which helps us to decrypt with secret and check it's expiry

//ensures a user is authenticated
const ensureAuthenticated = (req, res, next) => {
    
    //our token will come from authorization header
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token is require' });
    }
    try {


        const decoded = jwt.verify(auth, process.env.JWT_SECRET); //passing jwttoken, and out JWT_SECRET
        req.user = decoded; // we will add the data in req.user, so we can directly access and use decoded data like email, user_id without using database call
        next(); //function 
    } catch (err) {
        return res.status(401)
            .json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
}

module.exports = ensureAuthenticated;