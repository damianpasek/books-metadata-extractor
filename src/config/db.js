import Sequelize from 'sequelize'

import config from './index'

const setupSequelize = () => new Sequelize(config.databaseUrl, {
  logging: false,
})

module.exports = setupSequelize()
