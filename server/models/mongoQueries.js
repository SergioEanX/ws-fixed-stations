const {
  calculateAQI,
  getAQIInfo,
} = require('../controllers/contrAQI');

const getDateTime = (strDateTime) => {
  return strDateTime ? new Date(strDateTime) : new Date();
};

exports.getAQIdata = async (coll, strDateTime) => {
  // set current datetime according to input string datetime
  // if not specified is the actual datetime
  const currentDateTime = getDateTime(strDateTime);

  // compute one day before
  const oneDayBefore = new Date(
    getDateTime(strDateTime).setDate(
      getDateTime(strDateTime).getDate() - 1,
    ),
  );

  // set datetime filter  pipeline stage
  const stageDatesFilter = {
    _id: { $gte: oneDayBefore, $lt: currentDateTime },
  };

  const pipeline = [
    {
      $match: stageDatesFilter,
    },
    {
      $project: { station: 1, PM10: '$data.pm10_mg_m3' }, // ADD MORE POLLUTANT HERE
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
  const result = [];
  for (
    let docAQI = await cursor.next();
    docAQI;
    docAQI = await cursor.next()
  ) {
    // console.log(JSON.stringify(docAQI), null, 2);
    // compute AQI according to ARPAC spec
    docAQI.AQI = calculateAQI(docAQI.PM10avg);
    // retrive AQI info (color code, description,etc..)
    docAQI.AQIinfo = getAQIInfo(docAQI.AQI);
    // put all AQI by station into an array
    result.push(docAQI);

    // await coll_avg.updateOne(
    //   { _id: doc_avg._id },
    //   { $set: doc_avg },
    //   { upsert: true },
    // );
  }
  return result;
};
