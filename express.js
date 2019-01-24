var express = require("express");
var cors = require("cors");
// var route_mysql = require("./router/router_mysql");

var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "bagaspp",
  password: "123456yolo",
  database: "db_huplastudio"
});

db.connect(() => {
  console.log("Database sudah terhubung!");
});

var app = express();
app.use(cors());
// app.use(route_mysql);

app.get("/", (req, res) => {
  //   res.send("<h1>Backend Project Hupla Studio (Express x MySQL)</h1>");
  db.query("select * from tes", (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send("berhasil");
    }
  });
});

app.listen(1234, () => {
  console.log("Server aktif di port 1234");
});
