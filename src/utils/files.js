const glob = require('glob')
const fs = require('fs')
const { Parser } = require('xml2js')

const parser = new Parser()

const getFilesPaths = (path) => new Promise((resolve, reject) => {
  glob(path, {}, (error, files) => {
    if (error) reject(error)

    const limit = parseInt(process.env.FILES_LIMIT) || files.length
    resolve(files.slice(0, limit))
  })
})

const getBookDataFromFile = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, { encoding: 'utf-8' }, (error, data) => {
    if (error) reject(error)

    parser.parseString(data, (error, parsed) => {
      if (error) reject(error)
      resolve(parsed)
    })
  })
})

module.exports = {
  getFilesPaths,
  getBookDataFromFile,
}
