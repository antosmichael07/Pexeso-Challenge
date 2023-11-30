var express = require("express");
var router = express.Router();
const fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send(fs.readFileSync("./views/play.html", "utf8"));
});

module.exports = router;
