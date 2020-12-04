// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var BookSchema = new mongoose.Schema({
    author: String,
    title: String,
    page: Number,
    userId: String
});

//Export the Mongoose model
module.exports = mongoose.model('Book', BookSchema);