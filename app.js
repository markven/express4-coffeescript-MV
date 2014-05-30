(function() {
  var app, bodyParser, cookieParser, cookieSession, express, favicon, logger, path, routes, user;

  require("./models/DB");

  express = require("express");

  path = require("path");

  favicon = require("static-favicon");

  logger = require("morgan");

  cookieParser = require("cookie-parser");

  cookieSession = require("cookie-session");

  bodyParser = require("body-parser");

  routes = require("./routes/index");

  user = require("./routes/user");

  app = express();

  app.set("views", path.join(__dirname, "views"));

  app.set("view engine", "jade");

  app.use(favicon());

  app.use(logger("dev"));

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded());

  app.use(cookieParser());

  app.use(express["static"](path.join(__dirname, "public")));

  app.use(cookieParser());

  app.use(cookieSession({
    key: 'node',
    secret: 'HelloExpressSESSION'
  }));

  app.use(bodyParser());

  app.get("/", routes.index);

  app.get("/signin", user.signin);

  app.get("/register", user.register);

  app.get("/signout", user.signout);

  app.get("/forget", user.forget);

  app.get("/add_article", user.add_article);

  app.get("/profile", user.profile);

  app.get("/modify/:id", user.modify);

  app.get("/message/:id", user.message);

  app.get("/apis/delete/:id", user.del_article);

  app.post("/apis/login", user.login);

  app.post("/apis/add", user.add);

  app.post("/apis/comment/:id", user.comment);

  app.post("/apis/update/:id", user.update);

  app.use(function(req, res, next) {
    var err;
    err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render("error", {
        message: err.message,
        error: err
      });
    });
  }

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: {}
    });
  });

  module.exports = app;

}).call(this);
