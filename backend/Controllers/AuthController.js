const bcrypt = require('bcrypt'); // library to encrypt passwords
const jwt = require('jsonwebtoken'); //library to generate jwt token

require('dotenv').config(); 

const UserModel = require("../Models/User");


const signup = async (req, res) => {
    try {
        //information we are going to get and from where
        const { name, email, password } = req.body;

        //we will check the user exists using email
        const user = await UserModel.findOne({ email });

        //if user already exists 
        if (user) {
            //sendin conflict
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }

        //creating new UserModel, and insert a name, email and password
        const userModel = new UserModel({ name, email, password });

        //encrypting the password, before saving it, using bcrypt library for hashing, providing salt
        userModel.password = await bcrypt.hash(password, 10);

        //calling save method to save it to database
        await userModel.save();

        //response for signup sucess
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
            //if we get an error, we will send error
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';

        //if user doesn't exists 
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false }); 
        }

        //using bcrypt, bcrypt returns a promise, first parameter is from user (client), second parameter is from (database) 
        const isPassEqual = await bcrypt.compare(password, user.password);

        //if both password equal, then proceed
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }

        //if usernae, password is correct, then we will create a JWT token, also add a self made secret to .env

        //creating JWT token, first parameter is payload like password and email, second parameter is our JWT secret key from.env, third parameter is expiry of token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        //sending this JWT token in response, also email, password, and message
        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

module.exports = {
    signup,
    login
}

