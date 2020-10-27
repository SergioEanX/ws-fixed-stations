// constants for AQI description anc computation
const POLLUTANT_LABEL_COLOR_REF = [
    { label: "Good", color: "#50f0e6", AQI:[0,20] },
    { label: "Fair", color: "#50ccaa", AQI:[20,40] },
    { label: "Moderate", color: "#f0e641",AQI:[40,80] },
    { label: "Poor", color: "#ff5050", AQI:[80,100] },
    { label: "Very Poor", color: "#960032", AQI:[100,150] },
    { label: "Extremely Poor", color: "#7D2181", AQI:[150,200] },
    { label: "No data", color: " #6f6f6f", AQI:[] },
  ];
  
  // const POLLUTANT_RANGE_REF = {
  //   pm25: [0, 10, 20, 25, 50, 75, 800],
  //   pm10: [0, 20, 40, 50, 100, 150, 1200],
  //   no2: [0, 40, 90, 120, 230, 340, 1000],
  //   o3: [0, 50, 100, 130, 240, 380, 800],
  //   so2: [0, 100, 200, 350, 500, 750, 1250],
  //   //no: [0, 40, 80, 180, 280, 400, 1000],
  //   //nox: [0, 40, 80, 180, 280, 400, 1000],
  //   co: [0, 200, 250, 300, 400, 700, 1000],
  //   aqi: [0, 50, 100, 200, 300, 400, 500],
  // };
  
  const POLLUTANT_UNITS = {
    pm25: "µg/m3",
    pm10: "µg/m3",
    so2: "µg/m3",
    no2: "µg/m3",
    nox: "µg/m3",
    benzene: "µg/m3",
    o3: "µg/m3",
    nh3: "µg/m3",
    co: " mg/m3",
    co2: "µg/m3",
    no: " µg/m3",
    temperature: "°C",
  };
  
  const POLLUTANT_FULL_NAME = {
    // pm1: 'PM 1',
    pm25: "Particulate matter 2.5",
    pm10: "Particulate matter 10",
    so2: "Sulpher dioxide",
    no: "Nitrogen Monoxide",
    nox: "Nitrogen oxides",
    no2: "Nitrogen Dioxide",
    o3: "Ozone",
    co2: 'Carbon Dioxide',
    co: "Carbon monoxide",
    // nh3: 'Ammonia',
    // benzene: 'Benzene',
    // xylene: 'Xylene',
    // toluene: 'Toluene',
  };
  
  const POLLUTANT_OPTIONS = {
    // pm1: 'PM 1',
    pm25: "PM 2.5",
    pm10: "PM 10",
    so2: "SO2",
    // no: "Nitrogen Monoxide",
    nox: "NOX",
    // no2: "Nitrogen Dioxide",
    o3: "O3",
    // co2: 'Carbon Dioxide',
    co: "CO",
    // nh3: 'Ammonia',
    // benzene: 'Benzene',
    // xylene: 'Xylene',
    // toluene: 'Toluene',
  };
  const LIMIT_VALUES={
    VL_PM10:50,
    VL_O3:120,
    VL_NO2o:200,
    VL_NO2a:40
  }
  module.exports = {
    LIMIT_VALUES,
    POLLUTANT_LABEL_COLOR_REF,
    POLLUTANT_UNITS,
    POLLUTANT_FULL_NAME,
    POLLUTANT_OPTIONS,
  };

  // https://airindex.eea.europa.eu/Map/AQI/Viewer/#
  // http://macc-raq-op.meteo.fr/index.php?category=ensemble&subensemble=hourly_ensemble&date=LAST&calculation-model=ENSEMBLE&species=o3&level=SFC&offset=000

 // 
 // The hourly concentrations for NO2, O3 and SO2
 // Based on 24-hour running means for PM10 and PM2.5
