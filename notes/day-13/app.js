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
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.use((_req, res) => {
  res.send("not found!");
});

app.listen(8080, () => {
  console.log("server up and running");
});
