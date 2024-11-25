const Joi = require('joi');

const signupValidation = (req, res, next) => {
   
   //Let's prepare schema, definin how we will get the request like we are gettin object, and implement validation logic
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });

     //we will have to destructor this and we moght get error in destructor
    const { error } = schema.validate(req.body); //this is a function which will validate the req.body

   
    //if there is an error we will return 400 status code
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    //it will go to subsequent flow, like it will go to database for operation and user validation
    next();
}

//schema to check login validation 
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}

//exporting the models
module.exports = {
    signupValidation,
    loginValidation
}