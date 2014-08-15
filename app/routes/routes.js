var mongojs = require('mongojs'),
  db = mongojs("node-mongo-dumbPhrases"),
  dumbPhrases = db.collection('dumbPhrases'),
  utils = require('./utils');

// Templates (Front)
exports.front = {};
exports.front.index = function(res, res) {
  res.render('index', {
    title: 'Teste',
    author: {name: 'Klayton Faria', age:27},
    phrase: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, officiis temporibus id voluptatum ad iste!'
  });
};

exports.front.posts = function (req, res) {
  var filter;
  if (req.params && req.params.id) {
    filter = {_id:mongojs.ObjectId(req.params.id)};
  }
  dumbPhrases.find(filter, function(error, phrases){
      res.render(['index'], {
      title: "Dumb Phrases",
      phrases : phrases
    });
  });
}

exports.front.addPost = function(req, res) {
	dumbPhrases.save({
		title: req.param('title'),
		author: {
			name: req.param('name'),
			age: req.param('mental-age')
		},
		phrase : req.param('phrase')
	}, function(error, docs) {
		// res.redirect('/')
	});
}

exports.front.addMenu = function(req, res) {
  dumbPhrases.save({
    name: req.param('title'),
    items: {
      item : {
        label: req.param('label'),
        url : req.param('url'),
        order: req.param('order'),
        create_time: (function() { return new Date()})()
      }
    },
    phrase : req.param('phrase')
  }, function(error, docs) {
    // res.redirect('/')
  });
}

// Rest API
exports.api = {};
exports.api.posts = function(req, res) {
  var filter;
  if (req.params && req.params.id) {
    filter = {_id:mongojs.ObjectId(req.params.id)};
  }
  dumbPhrases.find(filter, function (err, phrases) {
    if (err) {
        utils.responseJSON(500, res, err);
      } else {
        utils.responseJSON(200, res, {posts : phrases});
    }
  });
}
