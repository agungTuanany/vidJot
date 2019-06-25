/*
 mongodb is schema-less, we didn't use to define the schema on databases level, however is good practice to use schema on application level.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const IdeaSchema = new Schema({
  titleForm: {
    type: String,
    required: true
  },
  detailsForm: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('ideas', IdeaSchema);
