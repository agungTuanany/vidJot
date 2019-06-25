const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load User Model
require('../models/User');
const User = mongoose.model('users');

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

// Login Process Form POST
router.post('/login', (req, res, next) => {
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
    //res.send('passed');
    passport.authenticate('local', {
      successRedirect:'/ideas',
      failureRedirect:'/users/login',
      failureFlash: true
    })(req, res, next);
  }
  console.log('your users account login',req.body);
});

// Register Process Form POST
router.post('/register', (req, res) => {
  const title = 'register';

  // server side rendering
  let errors = [];

  if(!req.body.name) {
    errors.push({ text: 'require a name' });
  }

  if(!req.body.email) {
    errors.push({ text: 'require a proper email' });
  }

  if(req.body.password != req.body.password2) {
    errors.push({ text: 'password not match' });
  }

  if(req.body.password.length <= 6) {
    errors.push({ text: 'password need to be 6 character' });
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
    // check if email has registered
    User.findOne({ email: req.body.email })
      .then(user => {
        if(user) {
          req.flash('error_msg', 'Email has registered');
          res.redirect('/users/register');
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are registered');
                  res.redirect('/users/login');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
          console.log('new users on databases: ' ,newUser)
        } // else 2nd
      });
  }; // else 1st
  console.log(req.body);
  console.log(errors);
});

// Logout User
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', "You are logged out");
  res.redirect('/users/login');
})

module.exports = router;
