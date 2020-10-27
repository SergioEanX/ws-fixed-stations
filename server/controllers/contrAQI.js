//https://www.npmjs.com/package/aqi-bot
//https://www.npmjs.com/package/aqi-calculator
// https://stackoverflow.com/questions/45935761/javascript-best-way-to-find-the-index-interval-in-an-array-with-given-number

const {
  LIMIT_VALUES,
  POLLUTANT_LABEL_COLOR_REF,
  POLLUTANT_UNITS,
} = require('../utils/aqi');

// function binarySearch(array, el) {
//   var m = 0;
//   var n = array.length - 1;
//   while (m <= n) {
//     var k = (n + m) >> 1;
//     var cmp = el - array[k];
//     if (cmp > 0) {
//       m = k + 1;
//     } else if (cmp < 0) {
//       n = k - 1;
//     } else {
//       return [k, k + 1];
//     }
//   }
//   return [n, n + 1];
// }

// const test = [
//   {
//     datetime: new Date('2020-10-21T12:50:00Z').toISOString(),
//     pm25: 352,
//     pm10: 324,
//     so2: 9,
//     no: 30,
//     nox: 39,
//     no2: 17,
//     o3: 38,
//     co: null,
//   },
//   {
//     datetime: new Date('2020-10-21T13:50:00Z').toISOString(),
//     pm25: 294,
//     pm10: 297,
//     so2: 3,
//     no: 32,
//     nox: 41,
//     no2: 18,
//     o3: 63,
//     co: null,
//   },
// ];

// if a pollutant is not specified in fucntion inputs it means that 
// is undefined
exports.calculateAQI = (
  PM10Mean_h24,
  O3MaxRunningMean,
  NO2Maxh,
  NO2Meanh24,
) => {
  // subindex return NaN when input in undefined
  const SPM10 = (PM10Mean_h24 / LIMIT_VALUES.VL_PM10) * 1000;
  const SO3 = (O3MaxRunningMean / LIMIT_VALUES.VL_O3) * 100;
  const SNO2 =
    0.5 *
    (NO2Maxh / LIMIT_VALUES.VL_NO2o +
      NO2Meanh24 / LIMIT_VALUES.VL_NO2a) *
    100;
    // filter out NaN values in array
  const AQInumber = Math.max(...[SPM10, SO3, SNO2].filter(v=>!isNaN(v)));
  return AQInumber;
};

// returns AQI info according to which range the AQI number belongs
exports.getAQIInfo = (AQIn) => {
  const AQIinfoObj = POLLUTANT_LABEL_COLOR_REF.filter((el) => {
    return AQIn >= el.AQI[0] && AQIn < el.AQI[1];
  });
  return AQIinfoObj[0];
};

//console.log(JSON.stringify(getAQIInfo(20)));

//https://aqicn.org/city/italy/campania/portici/portici-parco-reggia/
