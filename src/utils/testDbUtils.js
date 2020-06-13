import db from '../config/db'

export const syncDb = async () => {
  await db.drop()
  await db.sync({ force: true })
}

export const clearDb = () => db.drop()
