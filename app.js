// Module dependencies
var express = require('express'),
  http = require('http'),
  routes = require('./routes/routes'),
  path = require('path'),
  cons = require('consolidate'),
  utils = require('./routes/utils'),
  app = express();

// all environments
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.static(path.join(__dirname, 'static')));
  app.engine('hbs', cons.handlebars);
  app.set('view engine', 'hbs');
});

// Logger
app.use(express.logger('dev'));

// Routes
utils.setRoutes.get(app);
utils.setRoutes.post(app);

// Create and listen server application
http.createServer(app).listen(app.get('port'), function(){
  console.log('Blog server listening on port: ' + app.get('port'));
});