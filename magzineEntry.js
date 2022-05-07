

function entry()
{
    var fs = require('fs');
    var magzines = require('./models/Magazines')
    const { parse } = require('csv-parse');
    const { title } = require('process');
    
    
    var parser = parse({delimiter: ';',columns: true},function (err, records){
        records.forEach(async element => {
             
             await magzines.create({
                 title  : element.title,
                 isbn  : element.isbn,
                 authors : element.authors,
                 publishedAt : element.publishedAt    
             })
        });

    });
    fs.createReadStream(__dirname + '/csv/magazines.csv').pipe(parser);
    
}

module.exports = entry;

