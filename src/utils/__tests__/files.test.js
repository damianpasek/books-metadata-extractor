import path from 'path'
import glob from 'glob'

import { getDataDirectoryPath, getFilesPaths, getBookDataFromFile } from '../files'

jest.mock('glob')

describe('Utils: files', () => {
  describe('getDataDirectoryPath', () => {
    const OLD_ENV = process.env

    beforeEach(() => {
      jest.resetModules()
      process.env = { ...OLD_ENV }
    })

    afterEach(() => {
      process.env = OLD_ENV
    })

    it('should return path based on provided env variable', () => {
      process.env.FILES_PATH = '/custom/data/path'

      expect(getDataDirectoryPath()).toBe('/custom/data/path/**/*.rdf')
    })

    it('should return data directory in project root if env variable not provided', () => {
      expect(getDataDirectoryPath().endsWith('/data/**/*.rdf')).toBe(true)
    })
  })

  describe('getFilesPaths', () => {
    const MOCKED_PATH = '/custom/data/path'

    it('should call library function with proper arguments and resolve with array of paths', async () => {
      const MOCKED_RESPONSE_PATHS = ['path1', 'path2']

      glob.mockImplementation((path, options, callback) => {
        callback(null, MOCKED_RESPONSE_PATHS)
      })

      const paths = await getFilesPaths(MOCKED_PATH)

      expect(glob).toHaveBeenCalled()

      const [calledPath, calledOptions] = glob.mock.calls[0]

      expect(calledPath).toBe(MOCKED_PATH)
      expect(calledOptions).toEqual({})
      expect(paths).toEqual(MOCKED_RESPONSE_PATHS)
    })

    it('should call library function with proper arguments and reject', async () => {
      glob.mockImplementation((path, options, callback) => {
        callback(new Error('GlobError'))
      })

      await expect(getFilesPaths(MOCKED_PATH))
        .rejects
        .toThrowError(new Error('GlobError'))

      expect(glob).toHaveBeenCalled()

      const [calledPath, calledOptions] = glob.mock.calls[0]

      expect(calledPath).toBe(MOCKED_PATH)
      expect(calledOptions).toEqual({})
    })
  })

  describe('getBookDataFromFile', () => {
    const MOCKED_RDF_FILE_PATH = path.join(__dirname, '..', '__mocks__', 'mocked-rdf-file.rdf')

    it('should return promise with parsed data from file', async () => {
      const data = await getBookDataFromFile(MOCKED_RDF_FILE_PATH)

      expect(data).toMatchSnapshot()
    })

    it('should throw an error if file cannot be parsed or accessed', async () => {
      await expect(getBookDataFromFile('NotExistingFile'))
        .rejects
        .toThrow()
    })
  })
})
