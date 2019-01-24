var router = require("express").Router();
var mysql = require("mysql");
var bodyParser = require("body-parser");
router.use(bodyParser.json());

var db = mysql.createConnection({
  host: "localhost",
  user: "bagaspp",
  password: "123456yolo",
  database: "db_huplastudio"
});

db.connect(() => {
  console.log("Database sudah terhubung!");
});

// GET all data
router.get("/data", (req, res) => {
  var dbStat = "select * from member";
  db.query(dbStat, (error, output) => {
    if (error) {
      console.log(error);
    } else {
      console.log(output);
      res.send(output);
    }
  });
});

// POST data
router.post("/data", (req, res) => {
  var dbStat = "insert into member set ?";
  var member = {
    nama_depan: req.body.firstname,
    nama_belakang: req.body.lastname,
    surel: req.body.email,
    sandi: req.body.password
  };
  db.query(dbStat, data, (error, output) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log(output);
      res.send({
        nama_depan: req.body.firstname,
        nama_belakang: req.body.lastname,
        surel: req.body.email,
        sandi: req.body.password,
        status: "Data terkirim"
      });
    }
  });
});

module.exports = router;
