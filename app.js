const express = require('express');
const app = express();

const port = 5000;

/*
basic route in express have a method 'get' and 'post'. in every method have a callback function (handler functions)
*/

// Index Route
app.get('/', (req, res) => {
  res.send('INDEX');
});

// About Route
app.get('/about', (req, res) => {
  res.send('ABOUT');
})

app.listen(port, () => {
  console.log(`server started on ${port}`);
})
