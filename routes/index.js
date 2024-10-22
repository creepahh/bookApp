var express = require('express');
const Book = require('../models/books');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {  
  // const books = [
  //   {
  //     _id: 1,
  //     name: "book 1",
  //     description: "this is book 1",
  //     author: "author 1",
  //   },
  //   {
  //     _id: 2,
  //     name: "book 2",
  //     description: "this is book 2",
  //     author: "author 2",
  //   },
  //   {
  //     _id: 3,
  //     name: "book 3",
  //     description: "this is book 3",
  //     author: "author 3",
  //   },
  // ];
  try {
    const books = await Book.find();
    res.render("index", { title: "title", bookList: books })
    res.json(books);
  } catch (error) {
    console.error(error);
    return null;
  }
  // res.render('index', { title: 'Expressssssss 123', bookList: books});        //shows index file from views folder          //bookList will be taken and used in front
});

router.get('/add-book', function (req, res, next) {
  res.render('add-book');
});


// 

router.post ('/save', async function(req,res){
  try {
    console.log(req.body)
    const newBook =new Book(req.body);
     await newBook.save();
    console.log("book saved ",newBook);
  }
  catch(error){
    console.log(error);
  }
  res.redirect("/");
});

//for edit, book to be edited should also be sent 

module.exports = router;
