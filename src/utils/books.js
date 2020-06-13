import { get } from 'lodash'

import { getBookDataFromFile } from './files'

const getProperty = (data, path = []) => get(data, path, null)

const getIdFromFilePath = path => {
  const parsed = path.split('/').pop().split('.')[0].replace('pg', '')

  return parsed ? parseInt(parsed) : null
}

const getSubjects = book => {
  const subjects = getProperty(book, ['dcterms:subject']) || []

  return subjects
    .map(subject => getProperty(subject, ['rdf:Description', 0, 'rdf:value', 0]))
    .filter(Boolean)
}

const parseBookData = (id, data) => {
  const book = data['rdf:RDF']['pgterms:ebook'][0]

  const title = getProperty(book, ['dcterms:title', 0])
  const author = getProperty(book, ['dcterms:creator', 0, 'pgterms:agent', 0, 'pgterms:name', 0])
  const language = getProperty(book, ['dcterms:language', 0, 'rdf:Description', 0, 'rdf:value', 0, '_'])
  const license = getProperty(book, ['dcterms:rights', 0])
  const publisher = getProperty(book, ['dcterms:publisher', 0])
  const publicationDate = getProperty(book, ['dcterms:issued', 0, '_'])
  const subjects = getSubjects(book)

  return {
    external_id: id,
    title,
    author,
    publisher,
    publication_date: publicationDate,
    language,
    subjects,
    license,
  }
}

export const getBookData = async (filePath) => {
  const id = getIdFromFilePath(filePath)
  const fileContent = await getBookDataFromFile(filePath)

  return parseBookData(id, fileContent)
}
