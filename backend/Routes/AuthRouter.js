


const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();


//After creating AuthValidation, we will add signupvalidation before calling controller
router.post('/login', loginValidation, login); //parameters is validation and controller
router.post('/signup', signupValidation, signup);

module.exports = router;