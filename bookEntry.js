

function entry()
{
    var fs = require('fs');
    var books = require('./models/Book')
    const { parse } = require('csv-parse');
    const { title } = require('process');
    
    
    var parser = parse({delimiter: ';',columns: true},function (err, records){
        records.forEach(async element => {
             await books.create({
                 title  : element.title,
                 isbn  : element.isbn,
                 authors : element.authors,
                 description : element.description
    
             })
        });
    });
    
    fs.createReadStream(__dirname + '/csv/books.csv').pipe(parser);
    
}

module.exports = entry;

