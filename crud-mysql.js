const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const con = mysql.createPool({
  host: "localhost",
  user: "root",
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
    // console.log(result);
    res.send(result);
  });
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("ไม่มี ID");
  }
  con.query(`SELECT * FROM todo WHERE id=${id}`, (err, result, fields) => {
    if (err) throw err;
    // console.log(result);
    res.send(result);
  });
});

app.post("/todos", (req, res) => {
  //   console.log("body", req.body);
  const { title } = req.body;
  const sql = `INSERT INTO todo (title) VALUES ('${title}')`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Successfully Inserted");
    res.send("Successfully Inserted");
  });
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("ไม่มี ID");
  }
  const { title } = req.body;

  con.query(`SELECT * FROM todo WHERE id=${id}`, (err, result, fields) => {
    if (err || result.length == 0) throw err;
    const sql = `UPDATE todo SET title='${title}' WHERE id='${id}'`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Successfully Updated");
      res.send("Successfully Updated");
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("ไม่มี ID");
  }

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
  console.log(`Server is listening at http: //localhost:port${port}`);
});
