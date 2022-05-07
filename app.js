//npm modules
const express = require('express');
const Mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require("ejs")
const cors = require("cors");


//Models
const book = require('./models/Book');
const magzine = require('./models/Magazines');

const app  = express();
const router = require('./routes/routes');

const doBookEntry = require('./bookEntry');
const doMagazineEntry = require('./magzineEntry');
const datastores = require('./config/datastores');


app.set('view engine','ejs');
app.set('views','./views');

const PORT = process.env.PORT || 3000
//DB connection

const connect = async () => {
    await Mongoose.connect(datastores.MongoURI);
    console.log("Connected to DB")
    
    // refreshing data in db
    // insertion of csv data to db
    await book.deleteMany({});
    await magzine.deleteMany({});
    doBookEntry();
    doMagazineEntry();
}

connect();

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());


//routes
app.use('/',router);

app.listen(3000, async () => {  
    console.log("Server started");
});


