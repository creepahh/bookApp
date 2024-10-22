var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {  
  const books = [
    {
      _id: 1,
      name: "book 1",
      description: "this is book 1",
      author: "author 1",
    },
    {
      _id: 2,
      name: "book 2",
      description: "this is book 2",
      author: "author 2",
    },
    {
      _id: 3,
      name: "book 3",
      description: "this is book 3",
      author: "author 3",
    },
  ];
  res.render('index', { title: 'Expressssssss', bookList: books});        //shows index file from views folder          //bookList will be taken and used in front
});

router.get('/add-book', function (req, res, next) {
  res.render('add-book');
});

// 

router.post('/save', function (req, res) {
  console.log(req.body);
});

module.exports = router;
