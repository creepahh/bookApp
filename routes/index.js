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

router.get('/edit/:id', async function (req, res) {
  try {
    const book = await book.findById(req.params.id);
    if (!book) {
      res.redirect("/");

    }
    res.render("edit-book", {
      title: "edit book",
      book: book,
    });
  } catch (error) {
    console.log(error);
  }
  // res.redirect("/");
});

router.post('/update/:id', async function(req, res, next) {
  try {
    const bookId = req.params.id;
    const updatedData = req.body; // Get the updated data from the form

    console.log('Updating the book with ID:', bookId);

    await Book.findByIdAndUpdate(bookId, updatedData, { new: true });
    
    
    res.redirect("/");
    
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating book.");
  }
});


//for edit, book to be edited should also be sent 

router.post('/delete/:id',async function(req, res, next) {
  try{
    const bookId = req.params.id;
    
    console.log('Deleting the book with ID:', bookId); 
    
   await Book.findByIdAndDelete(new ObjectId(bookId));
   res.redirect("/");
  }catch(err){
   console.log(err); 
   res.status(500).send("Error deleting book.");   //internal server error
  }
});



module.exports = router;
