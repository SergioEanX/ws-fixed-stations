const express = require('express');
// const log = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const websocketRoutes = require('./routes/websocket');
const logger = require('./utils/logger');
const { getChange } = require('./controllers/contrChangeStream');

const io = require('socket.io', { maxHttpBufferSize: 1e5 })(server);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// use MongoDb change streams to emit AQI data
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
getChange(io);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// var print_data = async () => {
//   return {
//     date: new Date(),
//     station: 'AQ101',
//     data: {
//       PM1: parseFloat((Math.random() * (100 - 10) + 10).toFixed(3)),
//       PM10: parseFloat((Math.random() * (100 - 10) + 10).toFixed(3)),
//     },
//   };
// };

// const call_print_data = (io) =>
//   new Promise((resolve, reject) => {
//     var count = 0;
//     var interval = setInterval(async () => {
//       var res = await print_data();
//       io.emit('ws-fixed-stations', res); // EMIT NEW DATA via WEBSOCKET
//       count += 1;

//       if (count === 5) {
//         // if it has been run 5 times, we resolve the promise
//         clearInterval(interval);
//         resolve(res); // result of promise
//       }
//     }, 500 * 60); // 1 min interval
//   });

io.on('connection', (socket) => {
  logger.info(`A client with id ${socket.id} connected`);
  const socketId = socket.id;

  io.to(socketId).emit('notifications', {
    date: new Date(),
    message: 'Successfully connected!',
    id: socketId,
  });

  // call_print_data(io);

  socket.on('disconnect', () => {
    io.emit('notifications', { message: 'Connection lost!!' });
  });

  socket.on('ws-fixed-stations', (msg) => {
    if (typeof msg === 'object' && msg !== null) {
      if ('command' in msg && 'date' in msg) {
        logger.info(`Message: ${JSON.stringify(msg, null, 2)}`);
        if (!isNaN(new Date(msg.date).getTime())) {
          // get data and emit event
          logger.debug('Get data and emit event');
        }
      }
    }

    // socket.broadcast.emit('ws-fixed-stations', msg);
  });
});

// add socket.io as Middleware
app.use((req, res, next) => {
  res.io = io;
  next();
});
// app.use(log('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', websocketRoutes);
app.use(express.static(path.join(__dirname, 'public')));

exports.app = app;
exports.server = server;
// https://stackoverflow.com/questions/62872683/call-a-async-function-every-minute-for-5-minutes-in-nodejs

// https://stackoverflow.com/questions/47655869/how-to-use-vue-js-with-nginx
