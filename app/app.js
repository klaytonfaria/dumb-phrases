// Module dependencies
var express = require("express"),
    PrettyError = require("pretty-error"),
    app = express(),
    hbs = require("hbs"),
    http = require("http"),
    path = require("path"),
    utils = require("./core/extend/utils"),
    helpers = require("./core/extend/helpers"),
    settings = require("./core/config/settings").constants;


// Pretty errors
var pe = new PrettyError();
pe.start();

// all environments
app.configure(function() {
  app.set("port", process.env.PORT || settings.APP_PORT);
  app.set("views", path.join(__dirname, "/content/views"));
  app.use(express.static(path.join(__dirname, "/content/static")));
  app.engine("hbs", hbs.__express);
  app.set("view engine", "hbs");
  hbs.registerPartials(__dirname + "/content/views/partials");
});

// Logger
app.use(express.logger("dev"));

// Routes
utils.requireRecursive(app, "./core/controllers/");

// Create and listen server application
http.createServer(app).listen(app.get("port"), function(){
  console.log("Blog server listening on port: " + app.get("port"));
});