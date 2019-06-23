const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
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

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
});

// Add Details Router
app.get('/ideas/add', (req, res) => {
  const title = 'ideas-add';
  res.render('ideas/add', {
  title,
  });
});

app.post('/ideas', (req, res) => {
  const title = 'ideas';
  // server-side validation
  let errors = [];

  if(!req.body.titleForm) {
    errors.push({ text: 'require title'});
  }

  if(!req.body.detailsForm) {
    errors.push({ text: 'require details' });
  }

  if(errors.length > 0) {
    res.render('ideas/add', {
      errors,
      titleForm: req.body.titleForm,
      detailsForm: req.body.detailsForm,
      title
    });
  } else {
    res.send('passed');
  }
  console.log(req.body)

});


const port = 5000;
app.listen(port, () => {
  console.log(Date() + ` server started on ${port}`);
})
