const express = require('express');
const app = express();

const port = 5000;

/*
  Middleware usually use for authentication password.
*/
// How middleware works
app.use(function(req, res, next) {
  //console.log(Date.now());
  req.name = 'Agung Tuanany';
  next();
  // example of loading a series of middleware
},function(req, res, next) {
  console.log('Request URL: will return', req.originalUrl);
  next();
});

// Index Route
app.get('/', (req, res) => {
  console.log(req.name);
  //res.send('INDEX');
  res.send(req.name);
});

// About Route
app.get('/about', (req, res) => {
  res.send('ABOUT');
})

app.listen(port, () => {
  console.log(`server started on ${port}`);
})
