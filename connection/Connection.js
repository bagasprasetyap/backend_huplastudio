var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "db_huplastudio"
});

connection.connect(error => {
  if (error) {
    throw error;
  } else {
    console.log("Database db_huplastudio terhubung!");
  }
});

module.exports = connection;
