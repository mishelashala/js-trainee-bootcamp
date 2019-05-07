const { Router } = require("express");
const usersController = require("../controllers/users-controller");
const userValidator = require("../middelwares/user-validator");

const usersRouter = Router();

// POST /users
// headers... body...

// [express.static]
// [bodyParser.json]
// [bodyParser.urlencoded]
// [userRouter]
// [validateUser]
// [userController.addUser]

// endpoint: method + route
// controller action should handle an endpoint

// render the add username form
usersRouter.get("/", usersController.getUsernameList);

// Adding a username
usersRouter.post(
  "/",
  userValidator.isValidUsername,
  usersController.addUserName
);

// view single username
usersRouter.get("/:username", usersController.getSingleUsername);

// render form to update username
usersRouter.get("/:username/edit", usersController.updateUsernameForm);

usersRouter.post(
  "/:username/edit",
  userValidator.isValidUsername,
  usersController.updateUsername
);

// render form to delete username
usersRouter.get(
  "/:username/delete",
  usersController.deleteUsernameConfirmation
);

usersRouter.post("/:username/delete", usersController.deleteUsername);

module.exports = usersRouter;
