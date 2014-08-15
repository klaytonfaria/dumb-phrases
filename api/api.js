// Module dependencies
var express = require("express"),
    app = express(),
    fs = require('fs'),
    http = require("http"),
    path = require("path"),
    utils = require("./extend/utils"),
    settings = require("./config/settings").constants;

// Configurations
app.configure(function() {
  app.use(express.logger('dev'));
  app.use(app.router);
  app.set('port', settings.SERVICES_PORT);
});

// dynamically include routes (Controller)
/*fs.readdirSync(__dirname + settings.ROUTES_PATH).forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require(__dirname + settings.ROUTES_PATH + file);
      route.controller(app);
  }
});*/

// Routes
utils.setRoutes.get(app, settings.VIRTUAL_PATHS);
utils.setRoutes.post(app, settings.VIRTUAL_PATHS);

// Create and listen server application
http.createServer(app).listen(app.get('port'), function(){
  console.log('API server listening on port: ' + app.get('port'));
});