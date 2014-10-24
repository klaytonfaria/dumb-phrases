module.exports = function(app, mongojs) {
  appData = mongojs(app.custom.settings.DATABASE_NAME).collection("dumbPhrases");

  app.get(app.custom.paths.home.default, function(req, res) {
    appData.find(function(error, phrases){
      res.render(['index'], {
        title: "Dumb Phrases",
        phrases : phrases
      });
    });
  });

}