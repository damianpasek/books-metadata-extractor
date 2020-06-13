const { getBookDataFromFile } = require('./files')

const safeGetProperty = (data, path = []) => {
  try {
    return path.reduce((value, key) => value[key], data)
  } catch {
    return null
  }
}

const getIdFromFilePath = path => {
  try {
    return parseInt(path.split('/').pop().split('.')[0].replace('pg', ''))
  } catch {
    return null
  }
}

const getSubjects = book => {
  const subjects = book['dcterms:subject'] || []

  return subjects
    .map(subject => safeGetProperty(subject, ['rdf:Description', 0, 'rdf:value', 0]))
    .filter(Boolean)
}

const parseBookData = (id, data) => {
  const book = data['rdf:RDF']['pgterms:ebook'][0]

  const title = safeGetProperty(book, ['dcterms:title', 0])
  const author = safeGetProperty(book, ['dcterms:creator', 0, 'pgterms:agent', 0, 'pgterms:name', 0])
  const language = safeGetProperty(book, ['dcterms:language', 0, 'rdf:Description', 0, 'rdf:value', 0, '_'])
  const license = safeGetProperty(book, ['dcterms:rights', 0])
  const publisher = safeGetProperty(book, ['dcterms:publisher', 0])
  const publicationDate = safeGetProperty(book, ['dcterms:issued', 0, '_'])
  const subjects = getSubjects(book)

  return { external_id: id, title, author, publisher, publication_date: publicationDate, language, subjects, license }
}

const getBookData = async (filePath) => {
  const id = getIdFromFilePath(filePath)
  const fileContent = await getBookDataFromFile(filePath)

  return parseBookData(id, fileContent)
}

module.exports = {
  getBookData,
}
