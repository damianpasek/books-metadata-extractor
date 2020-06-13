module.exports = {
  development: {
    url: 'mysql://books:books@127.0.0.1:3308/books',
    dialect: 'mysql',
  },
  test: {
    url: 'sqlite://:memory',
    dialect: 'sqlite',
  },
}
