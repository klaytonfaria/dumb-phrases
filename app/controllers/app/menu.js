var mongojs = require('mongojs'),
  db = mongojs("node-mongo-dumbPhrases"),
  dumbPhrases = db.collection('dumbPhrases'),
  utils = require('./utils');

exports.addMenu = function(req, res) {
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