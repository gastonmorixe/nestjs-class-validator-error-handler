import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const MONGO_SERVER = new MongoMemoryServer()

/**
 * Connect to the in-memory database.
 */
export async function connectFakeMongo() {
  const opts = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  }

  const mongoUri = await MONGO_SERVER.getUri()
  const result = await mongoose.connect(mongoUri, opts)

  return result
}

/**
 * Drop database, close the connection and stop mongod.
 */
export async function disconnectFakeMongo() {
  // await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await MONGO_SERVER.stop()
}
