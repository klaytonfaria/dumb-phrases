var mongojs = require('mongojs'),
  db = mongojs("node-mongo-dumbPhrases"),
  dumbPhrases = db.collection('dumbPhrases'),
  utils = require('./utils');

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
        utils.responseJSON(200, res, phrases);
    }
  });
}
