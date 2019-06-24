const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connect to mongoose
mongoose.connect('mongodb://localhost:127.0.0.1/vidjot-dev', {useNewUrlParser: true})
  .then(() => console.log(`MongoDB connected`))
  .catch(err => console.log(err));

// load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');


// handling static folder for add bootstrap
app.use(express.static('public'));

app.use('*/js',express.static(path.join(__dirname, 'public/js')));
app.use('*/css',express.static(path.join(__dirname, 'public/css')));

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// method-override middleware
app.use(methodOverride('_method'));

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

// Idea Index Page Route
app .get('/ideas', (req, res) => {
  const title = 'ideas';
  // fecth ideas from databases
  Idea.find({})
    .sort({ date: 'desc' })
    .then(ideas => {
      res.render('ideas/index', {
        ideas,
        title
      });
  });
});

// Add idea form
app.get('/ideas/add', (req, res) => {
  const title = 'ideas-add';
  res.render('ideas/add', {
  title,
  });
});

// Edit Idea form
app.get('/ideas/edit/:id', (req, res) => {
  const title ='ideas-edit';
  // render id
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      res.render('ideas/edit', {
        title,
        idea
      });
    })
});

// Process Form
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
    // saving idea to mongodb
    const newUser = {
      titleForm: req.body.titleForm,
      detailsForm: req.body.detailsForm
    }
    new Idea(newUser)
      .save()
      .then(idea => {
        res.redirect('/ideas');
      });
  }
  console.log(req.body);
});

// Edit Form process
app.put('/ideas/:id', (req, res) => {
  const title = 'edit idea';
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      // new values
      idea.titleForm = req.body.titleForm;
      idea.detailsForm = req.body.detailsForm;

      idea.save()
        .then(idea => {
          res.redirect('/ideas'),
          title
        });
    })

});


const port = 5000;
app.listen(port, () => {
  console.log(Date() + ` server started on ${port}`);
})
