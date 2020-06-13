import { chunk } from 'lodash'
import Book from '../models/Book'

const BATCH_SIZE = process.env.BATCH_SIZE || 50

export const saveBooksInDatabase = async (books = []) => {
  const batches = chunk(books, BATCH_SIZE)

  for (const batch of batches) {
    await Book.bulkCreate(batch)
  }
}
