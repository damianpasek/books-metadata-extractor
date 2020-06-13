import { set } from 'lodash'

import * as fileUtils from '../files'
import { getBookData } from '../books'

import { mockedBook, mockedBookWithoutFields } from '../__mocks__/books.mock'

describe('Utils: Books', () => {
  describe('getBookData', () => {
    const MOCKED_PATH = '/Users/user/Projects/metadata-extractor/data/epub/10004/pg12345.rdf'

    beforeEach(() => {
      jest.spyOn(fileUtils, 'getBookDataFromFile').mockResolvedValue(mockedBook)
    })

    it('should call getBookDataFromFile method wil the proper file path', async () => {
      await getBookData(MOCKED_PATH)

      expect(fileUtils.getBookDataFromFile).toHaveBeenCalledWith(MOCKED_PATH)
    })

    it('should return desired fields from the parsed file', async () => {
      const result = await getBookData(MOCKED_PATH)

      expect(result).toEqual({
        author: 'Jefferson, Thomas',
        external_id: 12345,
        language: 'en',
        license: 'Public domain in the USA.',
        publication_date: '1971-12-01',
        publisher: 'Project Gutenberg',
        subjects: [
          'JK',
          'United States. Declaration of Independence',
          'United States -- History -- Revolution, 1775-1783 -- Sources',
          'E201',
        ],
        title: 'The Declaration of Independence of the United States of America',
      })
    })

    it('if parsing of file path for book ID is not possible should return null', async () => {
      const { external_id } = await getBookData('')

      expect(external_id).toBe(null)
    })

    it('should return null if any of fields is not available', async () => {
      jest.spyOn(fileUtils, 'getBookDataFromFile').mockResolvedValue(mockedBookWithoutFields)

      const result = await getBookData(MOCKED_PATH)

      expect(result).toEqual({
        author: null,
        external_id: 12345,
        language: null,
        license: null,
        publication_date: null,
        publisher: null,
        subjects: [],
        title: null,
      })
    })

    it('should return empty array if subjects cannot be parsed', async () => {
      const mockedData = set(mockedBook, ['rdf:RDF', 'pgterms:ebook', 0, 'dcterms:subject'], null)

      jest.spyOn(fileUtils, 'getBookDataFromFile').mockResolvedValue(mockedData)

      const { subjects } = await getBookData(MOCKED_PATH)

      expect(subjects).toEqual([])
    })
  })
})
