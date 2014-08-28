// Module dependencies
var express = require("express"),
    PrettyError = require("pretty-error"),
    app = express(),
    hbs = require("hbs"),
    http = require("http"),
    path = require("path"),
    utils = require("./extend/utils"),
    helpers = require("./extend/helpers"),
    settings = require("./config/settings").constants;

// Pretty errors
var pe = new PrettyError();
pe.start();

// all environments
app.configure(function() {
  app.set("port", process.env.PORT || 3000);
  app.set("views", path.join(__dirname, "views"));
  app.use(express.static(path.join(__dirname, "static")));
  app.engine("hbs", hbs.__express);
  app.set("view engine", "hbs");
});

// Register partials
hbs.registerPartials(__dirname + "/views/partials");


// Logger
app.use(express.logger("dev"));

// Routes
utils.setRoutes.get(app, settings.VIRTUAL_PATHS.get);
utils.setRoutes.post(app, settings.VIRTUAL_PATHS.post);

// Create and listen server application
http.createServer(app).listen(app.get("port"), function(){
  console.log("Blog server listening on port: " + app.get("port"));
});