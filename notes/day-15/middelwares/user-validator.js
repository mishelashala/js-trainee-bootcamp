const isValidUsername = (req, res, next) => {
  const { username } = req.body;

  if (!username.length) {
    return res.render("error", {
      message: "username cannot be empty"
    });
  }

  next();
};

module.exports = {
  isValidUsername
};
