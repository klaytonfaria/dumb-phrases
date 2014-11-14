require.config({
  baseUrl: "/",
  paths: {
    handlebars: "assets/scripts/vendor/handlebars-v1.3.0",
    ember: "assets/scripts/vendor/ember",
    helpers: "helpers/helpers",
    routes: "routes/router",
    App: "main"
  }
});

require(["handlebars", "ember"], function() {
  var App = Ember.Application.create({
        VERSION: "0.0.1",
        LOG_TRANSITIONS: true,
        rootElement: "body",
        ready: function() {

        }
      });
    require(["routes"]);
    return App;
  }
);


