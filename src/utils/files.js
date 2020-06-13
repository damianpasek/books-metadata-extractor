import path from 'path'
import glob from 'glob'
import fs from 'fs'
import { Parser } from 'xml2js'

const parser = new Parser()

export const getDataDirectoryPath = () => {
  const dirPath = process.env.FILES_PATH || path.join(__dirname, '../..', 'data')
  return `${dirPath}/**/*.rdf`
}

export const getFilesPaths = path => new Promise((resolve, reject) => {
  glob(path, {}, (error, files) => {
    if (error) reject(error)

    const limit = parseInt(process.env.FILES_LIMIT) || files.length
    resolve(files.slice(0, limit))
  })
})

export const getBookDataFromFile = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, { encoding: 'utf-8' }, (error, data) => {
    if (error) return reject(error)

    parser.parseString(data, (error, parsed) => {
      if (error) return reject(error)
      resolve(parsed)
    })
  })
})
