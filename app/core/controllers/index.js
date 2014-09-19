module.exports = function(app, mongojs, settings) {
  appData = mongojs(settings.DATABASE_NAME).collection("dumbPhrases");

  app.get('/', function(req, res) {
    appData.find(function(error, phrases){
      res.render(['index'], {
        title: "Dumb Phrases",
        phrases : phrases
      });
    });
  });

}