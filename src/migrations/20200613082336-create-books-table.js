'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
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
        type: Sequelize.STRING(32),
      },
      subjects: {
        type: Sequelize.JSON,
      },
      license: {
        type: Sequelize.STRING(128),
      },
    })

    // await queryInterface.addIndex('books', {
    //   fields: ['title'],
    //   name: 'books_title',
    // })

    await queryInterface.addIndex('books', {
      fields: ['author'],
      name: 'books_author',
    })

    await queryInterface.addIndex('books', {
      fields: ['publication_date'],
      name: 'books_publication_date',
    })
  },

  down: queryInterface => queryInterface.dropTable('books'),
}
