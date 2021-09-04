const express = require("express");
const app = express();
const port = 9000;

const user = require("./controllers/users.controller");
const todo = require("./controllers/todos.controller");
const member = require("./controllers/members.controller");

app.get("/", (req, res, next) => {
  res.send("ได้รับข้อมูลเเล้ว");
});

app.get("/users", user.getUserById);

app.get("/member", member);

app.post("/users", (req, res, next) => {
  res.send("POST USERS");
});

app.get("/todo", todo.getTodo);

app.put("/todos", (req, res, next) => {
  res.send("PUT Todos");
});

app.delete("/todos", (req, res, next) => {
  res.send("DELETE Todos");
});

app.get("/users/:id", (req, res, next) => {
  const { id } = req.params;
  const name = "nathakrit";

  console.log("req.param", id);
  res.send({
    id,
    name,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
