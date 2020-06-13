const { getFilesPaths } = require('./utils/files')
const { getBookData } = require('./utils/books')
const { saveBooksInDatabase } = require('./repositories/books')
const PromisePool = require('@supercharge/promise-pool')

const db = require('./config/db')

const filesPath = `${__dirname}/../data/**/*.rdf`

const main = async () => {
  try {
    const filesPaths = await getFilesPaths(filesPath)

    console.time('Books Processing')

    const { results: books } = await PromisePool
      .for(filesPaths)
      .withConcurrency(512)
      .process(async path => getBookData(path))

    console.timeEnd('Books Processing')

    console.time('Saving results in database')

    await saveBooksInDatabase(books)

    console.timeEnd('Saving results in database')
  } finally {
    db.close()
  }
}

(async () => main())()
