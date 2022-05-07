var moongose = require("mongoose");

const magazineSchema = new moongose.Schema({
    title : String,
    isbn :  String,
    authors : String,
    publishedAt : String
});

module.exports = moongose.model('magazines', magazineSchema);