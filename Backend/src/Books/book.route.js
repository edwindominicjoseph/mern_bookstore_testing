const express = require('express');
const Book = require('./book.model');
const { postABook, getSingleBook, UpdateBook, deleteABook } = require('./book.controller');
const { get } = require('mongoose');
const router = express.Router();
const { getAllBooks } = require('./book.controller');

// Logic==> Frontend sends a post request--- backend server--- book route---book.controller.js---book.model.js---(if accepts)--save to db and send a success message--if any errors on the path it will be caught and a failure message will be sent back to the frontend.

router.post('/create-book',postABook);

// get all books
router.get('/', getAllBooks);

// get a single book
router.get('/:id' , getSingleBook)

// update a book
router.put('/edit/:id', UpdateBook )

// delete a book
router.delete('/:id', deleteABook)
    

module.exports = router;
