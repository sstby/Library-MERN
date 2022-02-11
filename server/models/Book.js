const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  bookTitle: {
    type: String,
    required: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  bookGenre: {
    type: String,
    required: true,
  },
  bookSector: {
    type: String,
    required: true,
  },
  bookPublishing: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", BooksSchema);
module.exports = Book;
