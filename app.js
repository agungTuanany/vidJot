const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connect to mongoose
mongoose.connect('mongodb://localhost:127.0.0.1/vidjot-dev', {useNewUrlParser: true})
  .then(() => console.log(`MongoDB connected`))
  .catch(err => console.log(err));


// handling static folder for add bootstrap
app.use(express.static('public'));

app.use('*/js',express.static(path.join(__dirname, 'public/js')));
app.use('*/css',express.static(path.join(__dirname, 'public/css')));

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
  res.render('index');
});

// About Route
app.get('/about', (req, res) => {
  const title = 'about';
  // Handlebars change 'send' response to 'render'
  res.render('about', {
    title,
  });
})

// Add Details Router
app.get('/ideas/add', (req, res) => {
  const title = 'ideas-add';
  res.render('ideas/add', {
  title,
  });
});


const port = 5000;
app.listen(port, () => {
  console.log(Date() + ` server started on ${port}`);
})
