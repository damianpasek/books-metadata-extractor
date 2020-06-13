import dbConfig from './dbConfig'

const env = process.env.NODE_ENV || 'development'

export default {
  env,
  databaseUrl: dbConfig[env]?.url,
}
