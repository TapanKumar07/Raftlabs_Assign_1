//npm modules
const express = require("express");
const router = express.Router();
const axios = require("axios");
const json2csv = require("json2csv").parse;
const fs = require('fs');
const path = require('path');

//models
const magzine = require("../models/Magazines");
const Book = require("../models/Book");

//helpers
const getMany = require("../helpers/getMany");
const getOnebyAuthor = require("../helpers/getOneByAuthor");
const getOnebyIsbn = require("../helpers/getOnebyIsbn");
const createOne = require("../helpers/createOne");




router.get("/", (req, res) => {
  res.render("../views/home.ejs");
});

router.get("/createbook", (req, res) => {
  res.render("../views/book.ejs");
});

router.get("/createmagzine", (req, res) => {
  res.render("../views/magzine.ejs");
});

router.get('/getcsvbookdata', async(req,res) => {
  const data = await axios.get("http://localhost:3000/showbookData");
  let csv
  let opts = { 
    delimiter : ';',
    fields : ['title','isbn','authors','description']
  }
  try {
    csv = json2csv(data.data,opts)
  } catch (err) {
    return res.status(500).json({ err });
  }
  const filePath = path.join(__dirname, "..", "export_csv" , "csv-" + 'bookdata' + ".csv")
  fs.writeFile(filePath, csv, function (err) {
    if (err) {
      return res.json(err).status(500);
    }
    else {
      setTimeout(function () {
        fs.unlinkSync(filePath); 
      }, 300000)
      return res.render('../views/details.ejs',{"data" : csv})
    }
  });
})


router.get('/getcsvmagzinedata', async(req,res) => {
  const data = await axios.get("http://localhost:3000/showmagzineData");

  let csv
  let opts = { 
    delimiter : ';',
    fields : ['title','isbn','authors','publishedAt']
  }
  try {
    csv = json2csv(data.data,opts)
  } catch (err) {
    return res.status(500).json({ err });
  }
  const filePath = path.join(__dirname, "..", "export_csv" , "csv-" + 'magzinedata' + ".csv")
  fs.writeFile(filePath, csv, function (err) {
    if (err) {
      return res.json(err).status(500);
    }
    else {
      setTimeout(function () {
        fs.unlinkSync(filePath); 
      }, 300000)
      return res.render('../views/details.ejs',{"data" : csv})
    }
  });
})

router.get('/getcsvbookdata', async(req,res) => {
  const data = await axios.get('http://localhost:3000/showmagzineData');
  console.log(data);
  res.end();
})


router.get("/bookData", async (req, res) => {
  const data = await axios.get("http://localhost:3000/showbookData");
  res.render("../views/bookview.ejs", {"data" : data.data});
});

router.get("/magzineData", async (req, res) => {
  const data = await axios.get("http://localhost:3000/showmagzineData");
  res.render("../views/magview.ejs", {"data" : data.data});
});

router.route("/showbookData").get(getMany(Book));

router.route("/showmagzineData").get(getMany(magzine));

router.post("/findbyISBNbook", async (req, res) => {
  try {
    const data = await axios.get("http://localhost:3000/findbyISBNbook", {
      params: { isbn: req.body.isbn },
    });
    res.render("../views/bookquery.ejs",data.data);
  } catch (err) {
    res.end();
  }
});

router.route("/findbyISBNbook").get(getOnebyIsbn(Book));

router.post("/findbyISBNmagzine", async (req, res) => {
  try {
    const data = await axios.get("http://localhost:3000/findbyISBNmagzine", {
      params: { isbn: req.body.isbn },
    });
    res.render("../views/magquery.ejs",data.data);
  } catch (err) {
    res.end();
  }
});
router.route("/findbyISBNmagzine").get(getOnebyIsbn(magzine));

router.post("/findmagByAuthor", async (req, res) => {
  try {
    const data = await axios.get("http://localhost:3000/findmagByAuthor", {
      params: { author: req.body.author },
    });
    res.render("../views/magquery.ejs", data.data);
  } catch (err) {
    res.staus(400).send("Invalid!");
  }
});

router.route("/findmagByAuthor").get(getOnebyAuthor(magzine));

router.post("/findbookByAuthor", async (req, res) => {
  try {
    const data = await axios.get("http://localhost:3000/findbookByAuthor", {
      params: { author: req.body.author },
    });
    res.render("../views/bookquery.ejs", data.data);
  } catch (err) {
    res.staus(400).send("Invalid!");
  }
});

router.route("/findbookByAuthor").get(getOnebyAuthor(Book));

router.route("/createbook").post(createOne(Book, "book"));

router.route("/createmagzine").post(createOne(magzine, "magzine"));

router.get("/booksMagSorted", async (req, res) => {
  var arr = [];
  const dataBook = await axios.get("http://localhost:3000/showbookData");

  for (const element of Object.entries(dataBook.data)) {
    arr.push(element[1]);
  }

  const magData = await axios.get("http://localhost:3000/showmagzineData");

  for (const element of Object.entries(magData.data)) arr.push(element[1]);

  arr.sort(function (a, b) {
    if (a.title > b.title) {
      return 1;
    }
    if (b.title > a.title) {
      return -1;
    }
    return 0;
  });
  
  res.render('../views/bookandMagSorted.ejs',{data : arr});
});



module.exports = router;
