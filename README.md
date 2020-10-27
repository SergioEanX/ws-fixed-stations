# ws-fixed-stations

### Node App to publish via Socket.io AQI data

> Using Mongodb [change streams](https://www.mongodb.com/blog/post/an-introduction-to-change-streams), `fixed_stations_avg` collection is monitored   
(except for deletes) to automatically perform a query on the same collection to 
return AQI data

#### Hot to run
Use `npm run start` (or `node index`) to start the application

#### AQI data returned
The app returns an array of Objects with the following schema:

   "_id": {
      "name": "AQ101", &nbsp;&nbsp;&nbsp;&nbsp;         // station name
      "loc": {     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;             // location in GeoJSON format
        "type": "Point",
        "coordinates": [
          14.3351564,
          40.8118439
        ]
      },
      "properties": {}
    },
    "PM10arr": [&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// array for last 24h hourly data
      23.75,
      21,
      18.55,
      5.55,
      4.3,
      5.8,
      8,
      5.066666666666666,
      5.277777777777778,
      6.822222222222222,
      7.949999999999999,
      5.091666666666667,
      3.4545454545454546,
      3.1785714285714284,
      5.019230769230769,
      9.296428571428573,
      5.043333333333334,
      5.576923076923077,
      5.294736842105263,
      4.3076923076923075,
      5.075,
      11.6875
    ],
    "PM10avg": 7.958740687143797,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// mean value for PM10 in last 24h
    "AQI": 15.917481374287593,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// AQI number
    "AQIinfo": {
      "label": "Good",&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;               // AQI label
      "color": "#50f0e6",,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// AQI coded color
      "AQI": [
        0,
        20
      ]
    }
  

