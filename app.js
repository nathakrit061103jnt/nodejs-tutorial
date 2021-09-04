const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 8000;

const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// create the connection to database
const con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "nestjs",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/todos", (req, res) => {
  con.query("SELECT * FROM todo", (err, result, fields) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;

  con.query(`SELECT * FROM todo WHERE id=${id}`, (err, result, fields) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

app.post("/todos", (req, res) => {
  const { title } = req.body;

  const sql = `INSERT INTO todo (title) VALUES ('${title}')`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Successfully Inserted");
    res.send("Successfully Inserted");
  });
});

// update data
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  con.query(`SELECT * FROM todo WHERE id=${id}`, (err, result, fields) => {
    if (err || result.length == 0) throw err;

    const sql = `UPDATE todo SET title='${title}' WHERE id='${id}'`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send("Successfully Updated");
      console.log("Successfully Updated");
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  con.query(`SELECT * FROM todo WHERE id=${id}`, (err, result, fields) => {
    if (err || result.length == 0) throw err;

    const sql = `DELETE FROM todo WHERE id='${id}'`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Successfully Delete");
      res.send("Successfully Delete");
    });
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http: //localhost:port`);
});
