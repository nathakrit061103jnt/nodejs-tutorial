const getUser = (req, res, next) => {
  res.send("users all");
};

const getUserById = (req, res, next) => {
  res.send("get users by id");
};

module.exports = {
  getUser,
  getUserById,
};
