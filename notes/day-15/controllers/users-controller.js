const userService = require("../services/user-service");

const getUsernameList = (_req, res) => {
  const usernameList = userService.getAllUsernames();
  res.render("users/users", {
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

// GET /:username/edit
const updateUsernameForm = (req, res) => {
  const { username } = req.params;
  res.render("users/edit-form", {
    username
  });
};

// POST /users/:username
const updateUsername = (req, res) => {
  const oldUsername = req.params.username;
  const { username } = req.body;
  userService.updateUsername(oldUsername, username);
  res.redirect(`/users/${username}/`);
};

// GET /users/:username
const deleteUsernameConfirmation = (req, res) => {
  const { username } = req.params;
  res.render("users/confirm-delete", { username });
};

// DELETE /users/:username
const deleteUsername = (req, res) => {
  const { username } = req.params;
  userService.deleteUsername(username);
  res.redirect("/users");
};

// GET /users/:username
const getSingleUsername = (req, res) => {
  const { username } = req.params;
  res.render("users/single-username", { username });
};

module.exports = {
  getUsernameList,
  addUserName,
  updateUsername,
  updateUsernameForm,
  getSingleUsername,
  deleteUsernameConfirmation,
  deleteUsername
};
