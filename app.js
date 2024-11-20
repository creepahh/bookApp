require('dotenv').config();
const passport = require('passport');

var createError = require('http-errors');  
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var mongoose = require("mongoose");

//db connection
// mongoose.connect('mongodb+srv://username:password@cluster0.ir5kr.mongodb.net/test')   
//   .then(() => console.log('Connected!'))
//   .catch((e) => console.log(e));
  
// const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// mongoose.connect(dbURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log("Connected to MongoDB!");
// }).catch((err) => {
//     console.error("MongoDB connection error:", err);
// });
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log('Connected!'))
  .catch(err => console.error('Connection error:', err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));          //look at the templates of frontend here 
app.set('view engine', 'ejs');          //pug, zed views can be used like ejs

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const { isLoggedIn } = require('./routes/auth');  // Import the middleware

// Use `isLoggedIn` to protect routes
app.get('/books', (req, res) => {
    // Only logged-in users can access the books route
    res.render('books');
});
app.get('/', (req, res) => {
  res.redirect('/login');
});
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
      const user = await User.findOne({ username, password });
      if (user) {
          req.session.user = user.username;
          res.redirect('/dashboard');
      } else {
          res.redirect('/login');
      }
  } catch (error) {
      console.error(error);
      res.redirect('/login');
  }
});


app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
      const newUser = new User({ username, email, password });
      await newUser.save();
      res.redirect('/login');
  } catch (error) {
      console.error(error);
      res.redirect('/register');
  }
});


app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
      return res.redirect('/login');
  }
  res.render('dashboard', { title: 'Dashboard', user: req.session.user });
}); 

app.listen(3001)

module.exports = app;
