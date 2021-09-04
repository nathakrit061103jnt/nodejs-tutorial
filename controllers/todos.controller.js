module.exports.getTodo = (req, res, next) => {
  res.send("todo.controller all");
};

const getTodoById = (req, res, next) => {
  res.send("todo.controller  By Id");
};
