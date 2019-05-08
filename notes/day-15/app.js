const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users-router");

// routing system
// static file serving mechanism
const app = express();

// app config
app.set("view engine", "pug");
app.set("views", "./views");

// HTTP: Request - Response
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const tokenList = [
  {
    id: "some-random-value"
  }
];

let tokenId = 0;

const isValidToken = token => {
  const index = tokenList.findIndex(t => {
    return token === t.id;
  });

  return index !== -1;
};

const isUserAuthenticated = (req, res, next) => {
  const token = req.headers.token;

  if (!isValidToken(token)) {
    return res.send("Forbiden").status(403);
  }

  next();
};

app.use("/users", isUserAuthenticated, usersRouter);

// Controller / Router
app.get("/login", (req, res) => {
  res.render("login/form");
});

app.post("/login", (req, res) => {
  const data = req.body;
  if (data.username === "michell" && data.password === "password") {
    const token = {
      id: ++tokenId
    };
    tokenList.push(token);
    return res.json({ token: token.id });
  }

  res.json({ message: "unauthorized" });
});

app.use((_req, res) => {
  res.send("not found!");
});

app.listen(8080, () => {
  console.log("server up and running");
});
