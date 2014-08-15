var mongojs = require('mongojs'),
  db = mongojs("node-mongo-dumbPhrases"),
  dumbPhrases = db.collection('dumbPhrases'),
  utils = require('./utils');


exports.posts = function (req, res) {
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

exports.addPost = function(req, res) {
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