import * as fileUtils from '../utils/files'
import * as bookUtils from '../utils/books'
import * as booksRepository from '../repositories/books'

import { main } from '..'

describe('Main', () => {
  const OLD_ENV = process.env

  const MOCKED_PATHS = [
    'mocked_path_1',
    'mocked_path_2',
    'mocked_path_3',
  ]

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV, FILES_PATH: '/mocked/data/path' }

    jest.spyOn(fileUtils, 'getFilesPaths').mockResolvedValue(MOCKED_PATHS)
    jest.spyOn(bookUtils, 'getBookData').mockResolvedValue('MockedBookData')
    jest.spyOn(booksRepository, 'saveBooksInDatabase').mockResolvedValue(undefined)
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  it('should invoke all method with proper data', async () => {
    await main()

    expect(fileUtils.getFilesPaths).toHaveBeenCalledWith('/mocked/data/path/**/*.rdf')
    expect(bookUtils.getBookData).toHaveBeenCalledTimes(3)

    expect(bookUtils.getBookData).toHaveBeenNthCalledWith(1, 'mocked_path_1')
    expect(bookUtils.getBookData).toHaveBeenNthCalledWith(2, 'mocked_path_2')
    expect(bookUtils.getBookData).toHaveBeenNthCalledWith(3, 'mocked_path_3')

    expect(booksRepository.saveBooksInDatabase).toHaveBeenCalledWith([
      'MockedBookData', 'MockedBookData', 'MockedBookData',
    ])
  })

  it('should throw an error if any occurred', async () => {
    jest.spyOn(fileUtils, 'getFilesPaths').mockRejectedValue('FilePathsError')

    await expect(main()).rejects.toEqual('FilePathsError')
  })
})
