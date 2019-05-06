const userService = require("../services/user-service");

const getUsernameList = (_req, res) => {
  const usernameList = userService.getAllUsernames();
  res.render("users", {
    usernameList
  });
};

const addUserName = (req, res) => {
  const { username } = req.body;

  if (!username.length) {
    return res.render("error", {
      message: "Username cannot be empty"
    });
  }

  userService.addUsername(username);
  res.redirect("/users");
};

// PUT /users/mishelashala
const updateUsername = () => {};

// DELETE /users/mishelashala
const deleteUsername = () => {};

// GET /useres/mishelashala
const getSingleUsername = () => {};

module.exports = {
  getUsernameList,
  addUserName
};
