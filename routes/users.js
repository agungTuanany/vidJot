const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// User login Route
router.get('/login', (req, res) => {
  const title = 'login';
  res.send('login');
});

// User Register Route
router.get('/register', (req, res) => {
  const title = 'user register';
  res.send('register');
});

module.exports = router;
