var mongojs = require('mongojs'),
  db = mongojs("node-mongo-dumbPhrases"),
  dumbPhrases = db.collection('dumbPhrases'),
  utils = require('./utils');

exports.index = function(res, res) {
  res.render('index', {
    title: 'Teste',
    author: {name: 'Klayton Faria', age:27},
    phrase: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, officiis temporibus id voluptatum ad iste!'
  });
};

exports.all = function (req, res) {
  dumbPhrases.find(function(error, phrases){
      res.render('all', {
      title: "Dumb Phrases",
      phrases : phrases
    });
  });
}

exports.new_get = function(req, res) {
    res.render('new', {
        title: 'New awesome dumb phrase'
    });
};

exports.new_post = function(req, res) {
	dumbPhrases.save({
		title: req.param('title'),
		author: {
			name: req.param('name'),
			age: req.param('mental-age')
		},
		phrase : req.param('phrase')
	}, function(error, docs) {
		res.redirect('/')
	});
}

// Rest API
exports.api = {};
exports.api.phrases = function(req, res) {
  dumbPhrases.find(function (err, phrases) {
    if (err) {
        utils.responseJSON(500, res, err);
      } else {
        utils.responseJSON(200, res, phrases);
    }
  });
}

exports.api.phrase = function(req, res) {
  dumbPhrases.findOne({
    _id:mongojs.ObjectId(req.params.id)
  },function (err, phrase) {
    if (err) {
        utils.responseJSON(500, res, err);
      } else {
        utils.responseJSON(200, res, phrase);
    }
  });
}


