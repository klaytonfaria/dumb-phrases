// Module dependencies
var express = require('express'),
  http = require('http'),
  routes = require('./routes/api_routes'),
  path = require('path'),
  utils = require('./routes/utils'),
  virtualPaths = require('./config/app/paths/paths_api'),
  app = express();

// all environments
app.configure(function() {
  app.set('port', process.env.PORT || 3030);
});

// Logger
app.use(express.logger('dev'));

// Routes
utils.setRoutes.get(app, virtualPaths);
utils.setRoutes.post(app, virtualPaths);

// Create and listen server application
http.createServer(app).listen(app.get('port'), function(){
  console.log('API server listening on port: ' + app.get('port'));
});