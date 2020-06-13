import { saveBooksInDatabase } from '../books'
import { syncDb, clearDb } from '../../utils/testDbUtils'
import Book from '../../models/Book'
import { mockedBooks } from '../__mocks__/books.mock'

describe('Repositories: books', () => {
  describe('saveBooksInDatabase', () => {
    beforeEach(async () => {
      await syncDb()
    })

    afterEach(async () => {
      await clearDb()
    })

    it('should save given list of books in the database', async () => {
      await saveBooksInDatabase(mockedBooks)

      const books = await Book.findAll()
      const book = await Book.findOne({ where: { id: 1 } })

      expect(books.length).toBe(10)
      expect(books).toMatchSnapshot()
      expect(book).toMatchObject({
        id: 1,
        external_id: 10001,
        title: 'Apocolocyntosis',
        author: 'Seneca, Lucius Annaeus',
        publisher: 'Project Gutenberg',
        language: 'en',
        subjects: [
          'PA',
          'Claudius, Emperor of Rome, 10 B.C.-54 A.D. -- Humor',
        ],
        license: 'Public domain in the USA.',
      })
    })

    it('should throw error on database constraint', async () => {
      const mockedBook = [{ title: 'Mocked Title' }]

      await expect(saveBooksInDatabase(mockedBook))
        .rejects
        .toThrowError()
    })
  })
})
