module.exports = function(app, mongojs) {
  appData = mongojs(app.custom.settings.DATABASE_NAME).collection("dumbPhrases");


  // All
  app.get(app.custom.paths.posts.default, function(req, res) {
    appData.find(function (err, phrases) {
      if (err) {
          app.custom.utils.responseJSON(500, res, err);
        } else {
          app.custom.utils.responseJSON(200, res, {posts : phrases});
      }
    });
  });

  // Single
  app.get(app.custom.paths.posts.single, function(req, res) {
    var filter;
    if (req.params && req.params.id) {
      filter = {_id:mongojs.ObjectId(req.params.id)};
    }
    appData.find(filter, function (err, phrases) {
      if (err) {
          app.custom.utils.responseJSON(500, res, err);
        } else {
          app.custom.utils.responseJSON(200, res, {posts : phrases});
      }
    });
  });

  // New
  app.post(app.custom.paths.posts.new, function(req, res) {
    appData.save({
      title: req.param('title'),
      author: {
        name: req.param('name'),
        age: req.param('mental-age')
      },
      phrase : req.param('phrase')
    });
  });
}