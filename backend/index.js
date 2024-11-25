const express = require('express'); //require express
const app = express(); //initializing express


//Middleware addition
const bodyParser = require('body-parser'); //Library that will take request body in POST to server

const cors = require('cors'); // This library allows requests from different ports like 3000 (which is our react app is running on) in our server as our server is running on 8080

const AuthRouter = require('./Routes/AuthRouter');

const ProductRouter = require('./Routes/ProductRouter');

//loading env vars and then create .env file and define port there
require('dotenv').config(); 

//This will require to connect to monodb
require('./Models/db'); 

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------


//NEED TO CREATE A PORT FROM ENV VARIABLES, SO WE WILL LOAD ENV VARIABLES ON TOP AS REQUIRED
const PORT = process.env.PORT || 8080; // fetching port using process.env.port

app.get('/ping',(req,res) => {
    res.send('PONG');
}) //to test server, we are creating ping api and sending a response, test using localhost/ping

//Accepting Json format 
app.use(bodyParser.json());

//cors 
app.use(cors()); //our server is open to world, we can also pass confiduration objects, like IP, methods and headers here to secure it 

//authentication router
app.use('/auth', AuthRouter); // as soon as it gets request



app.use('/products', ProductRouter);

//providing port and callback function
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
}) 