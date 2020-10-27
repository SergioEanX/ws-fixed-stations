// const path = require('path');
// require('dotenv').config({ path: path.join(__dirname, '.env') });
const { getChangeStream } = require('../utils/change-stream');
const { getAQIdata } = require('../models/mongoQueries');
const { getCollection } = require('../utils/mongo-client');
const logger = require('../utils/logger');

exports.getChange = async (io) => {
  const changeStream = await getChangeStream(
    process.env.MONGO_DB,
    process.env.COLLECTION_TO_MONITOR,
  );
  changeStream.on('change', async (change) => {
    const changeObj = JSON.stringify(change, null, 2);

    // retrive data for AQI
    const coll = await getCollection(
      process.env.MONGO_DB,
      process.env.COLLECTION_TO_MONITOR,
    );
    let resultAQI = await getAQIdata(coll, '2020-10-21T06:00Z');
    logger.debug(JSON.stringify(resultAQI, null, 2));

    if (io) {
      io.emit('ws-fixed-stations', resultAQI);
    }

    // logger.debug(changeObj);
    return changeObj;
  });
  changeStream.on('error', (err) => {
    logger.error(err);
  });
};

// changeObj has the following format
// {
//     _id: {
//       _data: '825F8FDAC6000000012B022C0100296E5A1004EF9D824CE6874BAAA63E85F2CBB7493C46645F696400645F8FDAC6A99EA5FDBD30AEBA0004'
//     },
//     operationType: 'insert',
//     clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 1, high_: 1603263174 },
//     fullDocument: { _id: 5f8fdac6a99ea5fdbd30aeba, NO2: 1455.85 },
//     ns: { db: 'Air-Heritage', coll: 'fixed_stations_avg' }
//   }

// await saveResumeTaken(change._id, "SOME_TOKEN_ID");
