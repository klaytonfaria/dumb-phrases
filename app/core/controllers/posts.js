module.exports = function(app, mongojs, settings) {
  appData = mongojs(settings.DATABASE_NAME).collection("dumbPhrases");

  app.get('/posts', function(req, res) {
    appData.find(function(error, phrases){
      res.render(['index'], {
        title: "Dumb Phrases",
        phrases : phrases
      });
    });
  });

  app.get('/posts/:id', function(req, res) {
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

  app.post('/posts', function(req, res) {
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