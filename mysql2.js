const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mysql = require("mysql2");
// create the connection to database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nestjs",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// !important!
// you need to install the following libraries |express|ejs|[dotenv > if required]
// or run this command >> npm i express ejs dotenv

app.set("view engine", "engine");

app.get("/", (req, res) => {
  connection.query("SELECT * FROM todo", (err, results, fields) => {
    if (!err) {
      res.send(results);
    }
    res.send(err);

    return err;
  });
});

app.get("/users", async (req, res) => {
  try {
    // get the client
    const newMysql = require("mysql2/promise");
    // create the connection
    const connection = await newMysql.createPool({
      host: "localhost",
      user: "root",
      database: "nestjs",
    });
    // query database
    const [rows, fields] = await connection.execute("SELECT * FROM todo");
    res.send(rows);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
