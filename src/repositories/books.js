const { chunk } = require('lodash')

const Book = require('../models/Book')

const BATCH_SIZE = process.env.BATCH_SIZE || 50

const saveBooksInDatabase = async (books = []) => {
  const batches = chunk(books, BATCH_SIZE)

  for (const batch of batches) {
    await Book.bulkCreate(batch)
  }
}

module.exports = {
  saveBooksInDatabase,
}
