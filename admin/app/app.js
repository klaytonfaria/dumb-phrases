define(["handlebars", "ember"], function() {
  var App = Ember.Application.create({
        VERSION: "0.0.1",
        LOG_TRANSITIONS: true,
        rootElement: "body",
        ready: function(App) {
          console.info("Started")
        }
      });
    return App;
  }
);