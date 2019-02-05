// koneksi ke server utama
var userRoutes = require("express").Router();

// koneksi ke database
var db = require("../connection/Connection");

// middleware
var bodyParser = require("body-parser");
var cors = require("cors");

// middleware yang digunakan
userRoutes.use(bodyParser.json());
userRoutes.use(cors());

// dapetin semua data users
userRoutes.get("/users", (req, res) => {
  var sql_get = "SELECT * FROM users";
  db.query(sql_get, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

//request register dari users
userRoutes.post("/users", (req, res) => {
  var fullName = req.body.fullName;
  var email = req.body.email;
  var password = req.body.password;

  var sql_check = `SELECT * FROM users WHERE email = '${email}'`;
  db.query(sql_check, (err, result) => {
    if (err) {
      throw err;
    } else if (result.length > 0) {
      res.send({ status: "dataAda" });
    } else {
      var sql_post = `INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)`;
      db.query(sql_post, [fullName, email, password], (err, result) => {
        if (err) {
          throw err;
        } else {
          console.log(result);
        }
      });
      res.send({ status: "regisBerhasil" });
    }
  });
});

//request login dari users
userRoutes.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var sql_login = `SELECT * FROM users WHERE email = '${email}'`;
  db.query(sql_login, (err, result) => {
    if (err) {
      throw err;
    } else if (result == 0) {
      res.send({
        status: "failedEmail"
      });
    } else {
      if (result[0].password != password) {
        res.send({
          status: "failedPassword"
        });
      } else {
        res.send({
          status: "Success"
        });
      }
    }
  });
});

module.exports = userRoutes;
