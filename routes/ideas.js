const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// load Idea Model
require('../models/Idea');
const Idea = mongoose.model('ideas');

// Idea Index Page Route
router.get('/', (req, res) => {
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
router.get('/add', (req, res) => {
  const title = 'ideas-add';
  res.render('ideas/add', {
  title,
  });
});

// Edit Idea form
router.get('/edit/:id', (req, res) => {
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
router.post('/', (req, res) => {
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
        req.flash('success_msg', 'Video Idea added');
        res.redirect('/ideas');
      });
  }
  console.log(req.body);
});

// Edit Form process
router.put('/:id', (req, res) => {
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
          req.flash('success_msg', 'Video Idea updated');
          res.redirect('/ideas'),
          title
        });
    });
});

// Delete Idea
router.delete('/:id', (req, res) => {
  // delete from database
  Idea.remove({
    _id: req.params.id
  })
    .then(() => {
      req.flash('success_msg', 'Video Idea removed');
      res.redirect('/ideas');
    });
});

module.exports = router;
