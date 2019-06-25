const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// User login Route
router.get('/login', (req, res) => {
  const title = 'login';
  res.render('users/login', {
    title
  });
});

// User Register Route
router.get('/register', (req, res) => {
  const title = 'user register';
  res.render('users/register', {
    title
  });
});

// Login Process Form
router.post('/login', (req, res) => {
  const title = 'users';

  // server side rendering
  let errors = [];

  if(!req.body.email) {
    errors.push({ text: 'require a proper email'});
  }

  if(!req.body.password) {
    errors.push({ text: 'password need to be 6 character' });
  }

  if(errors.length > 0) {
    res.render('users/login', {
      errors,
      email: req.body.email,
      password: req.body.password,
      title
    });
  } else {
    res.send('passed');
  }
  console.log(req.body);
});

// Login Process Form
router.post('/register', (req, res) => {
  const title = 'users';

  // server side rendering
  let errors = [];

  if(!req.body.name) {
    errors.push({ text: 'require a name' });
  }

  if(!req.body.email) {
    errors.push({ text: 'require a proper email'});
  }

  if(!req.body.password) {
    errors.push({ text: 'password need to be 6 character' });
  }

  if(!req.body.password) {
    errors.push({ text: 'password not match' });
  }

  if(errors.length > 0) {
    res.render('users/register', {
      errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2,
      title
    });
  } else {
    res.send('passed');
  }
  console.log(req.body);
});

module.exports = router;
