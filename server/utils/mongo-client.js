// MongoDB util to return mongo db collection
const mongodbClient = require('mongodb').MongoClient;
const logger = require('./logger');

const mongoDBURI = process.env.MONGO_DB_URI;
let client;

async function getDb(dbName) {
  if (!client || !client.isConnected()) {
    client = await mongodbClient.connect(mongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.debug('MongoDB connected successfully!!');
  }
  return client.db(dbName);
}

async function getCollection(dbName, collectionName) {
  const db = await getDb(dbName);
  const collection = db.collection(collectionName);
  logger.debug(
    `Database:${db.databaseName} - Collection: ${collection.collectionName}`,
  );
  // logger.debug(db);
  // logger.debug(collection)
  return collection;
}

module.exports = {
  getCollection,
};
