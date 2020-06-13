const { getFilesPaths } = require('./utils/files')
const { getBookData } = require('./utils/books')

const PromisePool = require('@supercharge/promise-pool')

const filesPath = `${__dirname}/../data/**/*.rdf`

const main = async () => {
  const filesPaths = await getFilesPaths(filesPath)

  console.time('Books Processing')

  const { results, errors } = await PromisePool
    .for(filesPaths)
    .withConcurrency(1024)
    .process(async path => getBookData(path))

  console.log(results)
  // console.log('errors', errors)
  // console.log('number of errors', errors)

  console.timeEnd('Books Processing')
}

(async () => main())()
