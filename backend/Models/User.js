//We will create schema using mongoose and we will use THIS schema to connect to mongodb collection and perform operations using this schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema; //A constructor provided by Mongoose to define the structure of your documents (rows in MongoDB).


//This block defines the structure of the "User" document in MongoDB. Each user document will have three fields: name, email, and password
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

//This creates a Mongoose model called UserModel
//The model acts as a bridge between our application and the database.
const UserModel = mongoose.model('users', UserSchema);

//This exports the UserModel, so other parts of your application (e.g., routes or controllers) 
//So that they can use it to interact with the users collection.
module.exports = UserModel;
