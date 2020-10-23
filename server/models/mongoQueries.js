exports.getAQIdatag = async (coll, ) => {
    const pipeline = [
      {
        $match: {
          _id: id,
        },
      },
      ...aggregationAvg,
    ];
  
    // Aggregation framework to compute AVG
    const cursor = coll.aggregate(pipeline);
    for (
      let docAQI = await cursor.next();
      docAQI;
      docAQI = await cursor.next()
    ) {
      console.log(JSON.stringify(doc_avg), null, 2);
      resolve(doc)
  
      // await coll_avg.updateOne(
      //   { _id: doc_avg._id },
      //   { $set: doc_avg },
      //   { upsert: true },
      // );
    }
  };