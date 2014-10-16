var mongojs = require('mongojs'),
  db = mongojs("node-mongo-dumbPhrases"),
  dumbPhrases = db.collection('dumbPhrases'),
  utils = require('../extend/utils');

module.exports.all = function(req, res) {
  dumbPhrases.find(function (err, phrases) {
    if (err) {
        utils.responseJSON(500, res, err);
      } else {
        utils.responseJSON(200, res, {posts : phrases});
    }
  });
}

module.exports.singlePost = function(req, res) {
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

module.exports.createPost = function(req, res) {
  dumbPhrases.save({
    title: req.param('title'),
    author: {
      name: req.param('name'),
      age: req.param('mental-age')
    },
    phrase : req.param('phrase')
  });
}