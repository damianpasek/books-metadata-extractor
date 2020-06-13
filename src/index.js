import PromisePool from '@supercharge/promise-pool'

import { getDataDirectoryPath, getFilesPaths } from './utils/files'
import { getBookData } from './utils/books'
import { saveBooksInDatabase } from './repositories/books'

export const main = async () => {
  const dataDirectoryPath = getDataDirectoryPath()
  const filesPaths = await getFilesPaths(dataDirectoryPath)

  console.time('Books Processing')

  const { results: books } = await PromisePool
    .for(filesPaths)
    .withConcurrency(process.env.BATCH_SIZE || 50)
    .process(async path => getBookData(path))

  console.timeEnd('Books Processing')

  console.time('Saving results in database')

  await saveBooksInDatabase(books)

  console.timeEnd('Saving results in database')
}

(async () => main())()
