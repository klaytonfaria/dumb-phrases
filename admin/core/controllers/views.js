module.exports = function(app, mongojs) {
  appData = mongojs(app.custom.settings.DATABASE_NAME).collection("dumbPhrases");
  app.get(app.custom.paths.genericView.default, function(req, res) {  	
  	res.render([req.params.view]);
  });
}