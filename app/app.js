// Module dependencies
var express = require('express'),
  http = require('http'),
  routes = require('./routes/routes'),
  path = require('path'),
  hbs = require('hbs'),
  utils = require('./routes/utils'),
  virtualPaths = require('./config/app/paths/paths'),
  helpers = require('./config/app/handlebars/helpers'),
  app = express();

// all environments
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.static(path.join(__dirname, 'static')));
  app.engine('hbs', hbs.__express);
  app.set('view engine', 'hbs');
});

// Register partials
hbs.registerPartials(__dirname + '/views/partials');


// Logger
app.use(express.logger('dev'));

// Routes
utils.setRoutes.get(app, virtualPaths);
utils.setRoutes.post(app, virtualPaths);

// Create and listen server application
http.createServer(app).listen(app.get('port'), function(){
  console.log('Blog server listening on port: ' + app.get('port'));
});