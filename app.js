// Module dependencies

var express = require('express'),
  http = require('http'),
  routes = require('./routes/routes'),
  path = require('path'),
  cons = require('consolidate'),
  app = express();

// all environments
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.static(path.join(__dirname, 'static')));
  app.engine('hbs', cons.handlebars);
  app.set('view engine', 'hbs');
});

// Routes
var appPath = {
  index: "/",
  posts: {
    all: "/posts",
    one: "/posts/:id",
  },
  api: {
    posts: "/api/posts",
    posts_one: "/api/posts/:id",
  }
};

// FRONT
app.get(appPath.index, routes.index);
app.get(appPath.posts.all, routes.posts);
app.get(appPath.posts.one, routes.posts);

// REST
app.get(appPath.api.posts, routes.api.posts);
app.get(appPath.api.posts_one, routes.api.posts);
app.post(appPath.api.posts, routes.addPost);

// Create and listen server application
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});