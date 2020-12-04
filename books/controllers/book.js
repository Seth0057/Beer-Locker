// Load required packages
var Book = require('../models/book');

// Create endpoint /api/books for POST
exports.postBooks = function(req, res) {
  // Create a new instance of the Book model
  var book = new Book();

  // Set the book properties that came from the POST data
  book.author = req.body.author;
  book.title = req.body.title;
  book.page = req.body.page;
  book.userId = req.user._id;

  // Save the book and check for errors
  book.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Book added to the library!', data: book });
  });
};

// Create endpoint /api/books for GET
exports.getBooks = function(req, res) {
  // Use the Book model to find all book
  Book.find({}, function(err, books) {
    if (err)
      res.send(err);

    res.json(books);
  });
};

// Create endpoint /api/books/:book_id for GET
exports.getBook = function(req, res) {
  // Use the Book model to find a specific book
  Book.find({ userId: req.user._id, _id: req.params.book_id }, function(err, book) {
    if (err)
      res.send(err);

    res.json(book);
  });
};

// Create endpoint /api/books/:book_id for PUT
exports.putBook = function(req, res) {
  // Use the Book model to find a specific book
  Book.update({ userId: req.user._id, _id: req.params.book_id }, { page: req.body.page }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/books/:book_id for DELETE
exports.deleteBook = function(req, res) {
  // Use the Book model to find a specific book and remove it
  Book.remove({ userId: req.user._id, _id: req.params.book_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Book removed from the library!' });
  });
};