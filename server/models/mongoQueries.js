const {
  calculateAQI,
  getAQIInfo,
} = require('../controllers/contrAQI');
exports.getAQIdata = async (coll) => {
  const pipeline = [
    {
      $project: {
        date: {
          $dateToString: {
            date: '$_id',
            format: '%Y-%m-%d',
          },
        },
        station: 1,
        PM10: '$data.pm10_mg_m3',
      },
    },
    {
      $match: {
        date: '2020-10-20',
      },
    },
    {
      $group: {
        _id: '$station',
        PM10arr: {
          $push: '$PM10',
        },
        PM10avg: {
          $avg: '$PM10',
        },
      },
    },
  ];

  // Aggregation framework to compute AVG
  const cursor = coll.aggregate(pipeline);
  let result = [];
  for (
    let docAQI = await cursor.next();
    docAQI;
    docAQI = await cursor.next()
  ) {
    console.log(JSON.stringify(docAQI), null, 2);
    docAQI.AQI = calculateAQI(docAQI.PM10avgH24);
    docAQI.AQIinfo = getAQIInfo(docAQI.AQI);
    result.push(docAQI);

    // await coll_avg.updateOne(
    //   { _id: doc_avg._id },
    //   { $set: doc_avg },
    //   { upsert: true },
    // );
  }
  return result;
};
