const mongoose = require('mongoose'); //library to manage databse connections and database operations

const mongo_url= process.env.MONGO_CONN; //It fetches the database connection string from the environment variable MONGO_CONN


//Mongoose attempts to connect to the MongoDB database using 
mongoose.connect(mongo_url)
    .then(()=>{
        console.log('MongoDB Connected...');
    }).catch((err)=>{
        console.log('MongoDB Connection Error: ', err);
    })

    