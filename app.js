
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes/routes');
var http = require('http');
var path = require('path');
var cons = require('consolidate');
var DumbPhrasesProvider = require('./providers/provider').DumbPhrasesProvider;
var app = express();

// all environments
app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.use(express.static(path.join(__dirname, 'public')));
	app.engine('hbs', cons.handlebars);
	app.set('view engine', 'hbs');
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var dumbPhrasesProvider = new DumbPhrasesProvider('localhost', 27017, {safe:false});

// Routes
app.get('/', routes.index);
//app.get('/phrases/all', routes.all);
app.get('/phrases/new', routes.new_get);
//app.post('/phrases/new', routes.new_post);

app.get('/phrases/all', function(req, res) {	
  dumbPhrasesProvider.findAll(function(error, phrases){
      res.render('all', {
    	title: "Dumb Phrases",
    	phrases : phrases
  	});
  });
});

//save new phrase
app.post('/phrases/new', function(req, res){
    dumbPhrasesProvider.save({      
        title: req.param('title'),
    	author: {
    		name: req.param('name'), 
    		age: req.param('mental-age')
    	},
    	phrase : req.param('phrase')
    }, function(error, docs) {
        res.redirect('/phrases/all')
    });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});