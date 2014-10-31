module.exports = function(app) {
  return {
    name: "posts",
    controller: require("../models/postsModel")(app),

    // Get all posts
    getAll: function(req, res) {
      this.controller.select({}, function(err, data) {
        if(err) {
          app.custom.utils.responseJSON(500, res, err);
        } else {
          app.custom.utils.responseJSON(200, res, {posts : data});
        }
      });
    },

    // Get one post
    getOne: function(req, res) {
      var filter;
      if (req.params && req.params.id) {
        filter = {_id:app.custom.db.ObjectId(req.params.id)};
      }
      this.controller.select(filter, function(err, data) {
        if(err) {
          app.custom.utils.responseJSON(500, res, err);
        } else {
          app.custom.utils.responseJSON(200, res, {posts : data});
        }
      });
    },

    // Remove post
    remove: function(req, res) {
      this.controller.remove(app.custom.db.ObjectId(req.params.id),
        function(err, data) {
          if(err) {
            app.custom.utils.responseJSON(500, res, err);
          } else {
            app.custom.utils.responseJSON(200, res, {message: 'deleted'});
          }
        }
      );
    },

    // Create post
    insert: function(req, res) {
      var doc = {
            title: req.param('title'),
            author: {
              name: req.param('name'),
              age: req.param('age')
            },
            phrase : req.param('phrase'),
            created_at : new Date()
          };

      this.controller.insert(doc,
        function(err, data) {
          if(err) {
            app.custom.utils.responseJSON(500, res, err);
          } else {
            app.custom.utils.responseJSON(200, res, {message: 'created'});
          }
        }
      );
    },

    // Update post
    update: function(req, res) {

      var filter = {_id:app.custom.db.ObjectId(req.params.id)},
          doc = {
            title: req.param('title'),
            author: {
              name: req.param('name'),
              age: req.param('age')
            },
            phrase : req.param('phrase'),
            created_at : new Date(),
            updated_at : new Date()
          };

      this.controller.update(filter, doc, function(err, data) {
        if(err) {
          app.custom.utils.responseJSON(500, res, err);
        } else {
          app.custom.utils.responseJSON(200, res, {message: 'updated'});
        }
      });
    }

  }
};






/*module.exports = function(app, mongojs) {
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
}*/
