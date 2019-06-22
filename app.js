const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

// Connect to mongoose
mongoose.connect('mongodb://localhost:127.0.0.1/vidjot-dev', {useNewUrlParser: true})
  .then(() => console.log(`MongoDB connected`))
  .catch(err => console.log(err));


// handling static folder for add bootstrap
app.use(express.static('public'));

// Handlebars Middleware
app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
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

const port = 5000;
app.listen(port, () => {
  console.log(`server started on ${port}`);
})
