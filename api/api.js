// Module dependencies
var express = require("express"),
    PrettyError = require('pretty-error'),
    app = express(),
    fs = require('fs'),
    http = require("http"),
    path = require("path"),
    utils = require("./extend/utils"),
    settings = require("./config/settings").constants;

// Pretty errors
var pe = new PrettyError();
pe.start();

// Configurations
app.configure(function() {
  app.use(express.logger('dev'));
  app.use(app.router);
  app.set('port', settings.SERVICES_PORT);
});

// Routes
utils.setRoutes.get(app, settings.VIRTUAL_PATHS.get);
utils.setRoutes.post(app, settings.VIRTUAL_PATHS.post);

// Create and listen server application
http.createServer(app).listen(app.get('port'), function(){
  console.log('API server listening on port: ' + app.get('port'));
});