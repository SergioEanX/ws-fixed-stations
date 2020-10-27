// const path= require('path')
// require('dotenv').config({path:path.join(__dirname,'.env')})
// console.log(process.env.MONGO_DB,
//   process.env.COLLECTION_TO_MONITOR,)
// const {getChange} = require('./controllers/contrChangeStream');
// getChange()
const { POLLUTANT_LABEL_COLOR_REF } = require('./utils/aqi');

const getAQIInfo = (AQIn) => {
  const AQIinfoObj = POLLUTANT_LABEL_COLOR_REF.filter((el) => {
    return AQIn >= el.AQI[0] && AQIn < el.AQI[1];
  });
  return AQIinfoObj[0];
};

console.log(JSON.stringify(getAQIInfo(7.96), null, 2));
