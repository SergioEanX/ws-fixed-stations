const express = require("express");
const router = express.Router();
const path = require("path");
const pjson = require('../package.json');

/* GET home page. */
router.get("/health", function (req, res, next) {
  res.status(200).json({status:'success',data:`App ${pjson.name} is healthy on date ${new Date()}`})
  // to serve VUE file
  // res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
