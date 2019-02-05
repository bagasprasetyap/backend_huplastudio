var express = require("express");
var cors = require("cors");
var userRoutes = require("./router/userRoutes");
var server = express();

// koneksi ke mysql connection
var db = require("./connection/Connection");

// middleware yang digunakan
server.use(userRoutes);
server.use(cors());

// route utama
server.get("/", (req, res) => {
  res.send({ status: "server aktif!" });
});

// jika tidak ada route
server.use((req, res) => {
  res.status(404).send({ status: "404 not found" });
});

server.listen(4000, () => {
  console.log("Server berjalan di port 4000!");
});
