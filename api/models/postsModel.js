module.exports = function(app) {
	var	Model = require("./modelStructure"),
		  model = new Model(app.custom.db(app.custom.settings.DATABASE_NAME));

	model.extend({
		insert: function(data, callback) {
			this.collection("dumbPhrases").insert(data, {}, callback || function(){});
		},
		update: function(query, data, callback) {
			this.collection("dumbPhrases").update(query, data, {},
				callback || function(){});
		},
		select: function(query, callback) {
			this.collection("dumbPhrases").find(query || {}).toArray(callback);
		},
		remove: function(ID, callback) {
			this.collection("dumbPhrases").remove({_id:ID}, callback || function(){});
		}
	});
	return model
};
