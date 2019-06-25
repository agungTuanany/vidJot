const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const passport = require('passport');

const app = express();

// load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);

// Connect to mongoose
mongoose.connect('mongodb://localhost:127.0.0.1/vidjot-dev', {useNewUrlParser: true})
  .then(() => console.log(`MongoDB connected`))
  .catch(err => console.log(err));

// handling static folder for add bootstrap
//app.use(express.static(path.join(__dirname, 'public/*')));

app.use('*/js',express.static(path.join(__dirname, 'public/js')));
app.use('*/css',express.static(path.join(__dirname, 'public/css')));
app.use('*/img',express.static(path.join(__dirname, 'public/img')));

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// method-override middleware
app.use(methodOverride('_method'));

// express-session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// !!IMPORTANT ISSUE
// Passport middleware | write it after express-session middleware
app.use(passport.initialize());
app.use(passport.session());

// connect-flash middleware
app.use(flash());

// Global Variables
app.use(function(req, res, next) {
  res.locals.success_msg =req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  // for using password or user not found
  res.locals.error = req.flash('error');
  // for users have login will not show login amd register nav
  res.locals.user = req.user || null;
  next();
});

// Handlebars Middleware
app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
  ideasDir: __dirname + '/views/ideas'
}));
app.set('view engine', 'hbs');

// Index Route
app.get('/', (req, res) => {
  const title = 'home';
  // Handlebars change 'send' response to 'render'
  res.render('index', {
    title
  });
});

// About Route
app.get('/about', (req, res) => {
  const title = 'about';
  // Handlebars change 'send' response to 'render'
  res.render('about', {
    title,
  });
});


// Use routes
app.use('/ideas', ideas);
app.use('/users', users);


const port = 5000;
app.listen(port, () => {
  console.log(Date() + ` server started on ${port}`);
})
