// Module dependencies
var express = require("express"),
    PrettyError = require('pretty-error'),
    app = express(),
    fs = require('fs'),
    http = require("http"),
    path = require("path"),
    utils = require("./extend/utils"),
    paths = require("./config/paths").paths,
    settings = require("./config/settings").constants;

// Pretty errors
var pe = new PrettyError();
pe.start();

// Configurations
app.configure(function() {
  app.use(express.logger('dev'));
  app.use(app.router);
  app.set('port', settings.SERVICES_PORT);
  // Custom app tools
  app.custom = app.custom || {};
  app.custom.utils = utils;
  app.custom.paths = paths;
  app.custom.settings = settings;
});

// Routes
app.custom.utils.requireRecursive(app, "./controllers/");

// Create and listen server application
http.createServer(app).listen(app.get('port'), function(){
  console.log('API server listening on port: ' + app.get('port'));
});