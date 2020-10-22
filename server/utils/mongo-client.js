const mongodbClient = require('mongodb').MongoClient;
const logger = require('./logger');
const mongoDB_URI = process.env.MONGO_DB_URI;
let client;

async function getDb(dbName) {
  if (!client || !client.isConnected()) {
    client = await mongodbClient.connect(mongoDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.debug('MongoDB connected successfully!!');
  }
  return client.db(dbName);
}

async function getCollection(dbName, collectionName) {
  const db = await getDb(dbName);
  const collection =db.collection(collectionName)
  logger.debug(`Database:${db.databaseName} - Collection: ${collection.collectionName}`)
  // console.log(db);
  // console.log(collection)
  return collection;
}

module.exports = {
  getCollection,
};
