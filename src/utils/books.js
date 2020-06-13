const { getBookDataFromFile } = require('./files')

const safeGetProperty = (data, path = []) => {
  try {
    return path.reduce((value, key) => value[key], data)
  } catch {
    return null
  }
}

const getSubjects = book => {
  const subjects = book['dcterms:subject'] || []

  return subjects
    .map(subject => safeGetProperty(subject, ['rdf:Description', 0, 'rdf:value']))
    .filter(Boolean)
}

const parseBookData = data => {
  const book = data['rdf:RDF']['pgterms:ebook'][0]

  const title = safeGetProperty(book, ['dcterms:title', 0])
  const author = safeGetProperty(book, ['dcterms:creator', 0, 'pgterms:agent', 0, 'pgterms:name', 0])
  const language = safeGetProperty(book, ['dcterms:language', 0, 'rdf:Description', 0, 'rdf:value', 0, '_'])
  const license = safeGetProperty(book, ['dcterms:rights', 0])
  const publisher = safeGetProperty(book, ['dcterms:publisher', 0])
  const publicationDate = safeGetProperty(book, ['dcterms:issued', 0, '_'])
  const subjects = getSubjects(book)

  return { title, author, publisher, publication_date: publicationDate, language, subjects, license }
}

const getBookData = async (filePath) => {
  const fileContent = await getBookDataFromFile(filePath)
  return parseBookData(fileContent)
}

module.exports = {
  getBookData,
}
