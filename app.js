const express = require('express');
// express-handlebars
const exphbs = require('express-handlebars');

const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Index Route
app.get('/', (req, res) => {
  // Handlebars change 'send' response to 'render'
  res.render('index');
});

// About Route
app.get('/about', (req, res) => {
  const title = 'Rendering from the server';
  const title1 = 'is this rendered';
  // Handlebars change 'send' response to 'render'
  res.render('about', {
    title,
    title1
  });
})

const port = 5000;
app.listen(port, () => {
  console.log(`server started on ${port}`);
})
