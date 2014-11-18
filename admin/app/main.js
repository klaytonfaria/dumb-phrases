require.config({
  baseUrl: "/",
  paths: {
    handlebars: "/assets/scripts/libs/handlebars/handlebars",
    ember: "assets/scripts/libs/ember/ember",
    DS: "assets/scripts/libs/ember-data/ember-data",
    helpers: "helpers/helpers",
    adapters: "adapters/adapter",
    App: "main",
    router: "routes/router"
  }
});

require(["router", "adapters"]);