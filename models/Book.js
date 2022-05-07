var moongose = require("mongoose");

const bookSchema = new moongose.Schema({
    title : String,
    isbn :  String,
    authors : String,
    description : String
});


module.exports = moongose.model('books',bookSchema);