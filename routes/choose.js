var express = require("express");
var router = express.Router();
const fs = require("fs");

router.use(express.static("public"));
/* GET home page. */
router.get("/", function (req, res, next) {
  res.send(fs.readFileSync("./views/choose.html", "utf8"));
});

module.exports = router;
