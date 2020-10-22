// get mongodb collection using connection Pooling
const { getCollection } = require('./mongo-client');

// return change stream Object
// MongoDB database and collection to monitor are set in .env
exports.getChangeStream = async function (db,coll) {
  //const resumeToken = await getResumetoken("SOME_UPSERT_TOKEN_ID");
  const changeStream = (await getCollection(db, coll)).watch(
    [
      {
        $match: {
          operationType: {
            $in: ['insert', 'update', 'replace'], //do not watch deletes
          },
        },
      },
      {
        $project: {
          documentKey: false, //documentKey is useless
        },
      },
    ],
    { fullDocument: 'updateLookup' },
  ); //"resumeAfter": resumeToken,

  return changeStream;
};
