import Sequelize from 'sequelize'
import db from '../config/db'

const Book = db.define('Book', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  external_id: {
    type: Sequelize.INTEGER,
  },
  title: {
    type: Sequelize.STRING(1024),
  },
  author: {
    type: Sequelize.STRING(256),
  },
  publisher: {
    type: Sequelize.STRING(64),
    allowNull: false,
  },
  publication_date: {
    type: Sequelize.DATE,
  },
  language: {
    type: Sequelize.STRING(2),
  },
  subjects: {
    type: Sequelize.JSON,
  },
  license: {
    type: Sequelize.STRING(128),
  },
}, {
  tableName: 'books',
  underscored: true,
  timestamps: false,
})

module.exports = Book
