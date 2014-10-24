module.exports = function(app, mongojs) {
  appData = mongojs(app.custom.settings.DATABASE_NAME).collection("dumbPhrases");

  app.get(app.custom.paths.posts.default, function(req, res) {
    appData.find(function(error, phrases){
      res.render(['index'], {
        title: "Dumb Phrases",
        phrases : phrases
      });
    });
  });

  app.get(app.custom.paths.posts.single, function(req, res) {
    var filter;
    if (req.params && req.params.id) {
      filter = {_id:mongojs.ObjectId(req.params.id)};
    }
    appData.find(filter, function(error, phrases){
        res.render(['index'], {
        title: "Dumb Phrases",
        phrases : phrases
      });
    });
  });

  app.post(app.custom.paths.posts.new, function(req, res) {
    appData.save({
      title: req.param('title'),
      author: {
        name: req.param('name'),
        age: req.param('mental-age')
      },
      phrase : req.param('phrase')
    }, function(error, docs) {
      // res.redirect('/')
    });
  });
}