const { Sequelize } = require('sequelize')

const config = require('../config')

const setupSequelize = () => new Sequelize(config.databaseUrl, {
  logging: false,
})

module.exports = setupSequelize()
