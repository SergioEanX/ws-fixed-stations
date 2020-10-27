// get .env variables from .env file (inside server folder)
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
// read app name
const pjson = require('./package.json');
// use winston logger
const logger = require('./utils/logger');
// load express app and server
const { app, server } = require('./app');

// default port 4000
const port = process.env.PORT || 4000;
app.set('port', port);
server.listen(port);
// show name app and server PORT
logger.debug(`${pjson.name} running → PORT ${server.address().port}`);

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled rejection at ${promise},
reason: ${reason.message}`);

  //  process.exit(1);
});

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  //  process.exit(1);
});

// USEFUL RESOURCES
// https://socket.io/docs/#Features

// https://www.digitalocean.com/community/tutorials/nodejs-serving-static-files-in-express
// https://stackoverflow.com/questions/24609991/using-socket-io-in-express-4-and-express-generators-bin-www
// https://www.valentinog.com/blog/socket-react/
//
// https://socket.io/docs/emit-cheatsheet/
// https://www.freecodecamp.org/news/create-a-professional-node-express/
// https://hackernoon.com/socketio-react-and-nodejs-going-real-time-with-websockets-3vqd3ygy
// https://stfalcon.com/en/blog/post/chat-app-creation-vue.js-nuxt.js-node.js-socket.io-vue-socket.io-vuetify.js-technolog
