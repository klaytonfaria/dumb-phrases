// Module dependencies

var express = require('express'),
  http = require('http'),
  routes = require('./routes/routes'),
  path = require('path'),
  cons = require('consolidate'),
  app = express(),
  appPath = {
    index: "/",
    phrases: {
      all: ["/phrases","/phrases/all"],
      add: "/phrases/add",
    },
    api: {
      phrases: ["/api/phrases","/api/phrases/all"],
      phrase: "/api/phrase/:id",
    }
  };

// all environments
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.static(path.join(__dirname, 'static')));
  app.engine('hbs', cons.handlebars);
  app.set('view engine', 'hbs');
});

// Routes
//app.get(appPath.assets, routes.assets);
app.get(appPath.index, routes.index);
app.get(appPath.phrases.all, routes.all);
app.get(appPath.phrases.add, routes.new_get);
app.post(appPath.phrases.add, routes.new_post);
app.get(appPath.api.phrases, routes.api.phrases);
app.get(appPath.api.phrase, routes.api.phrase);

// Create and listen server application
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});