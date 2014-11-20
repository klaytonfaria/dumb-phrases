require.config({
  baseUrl: "/",
  paths: {
    handlebars: "/assets/scripts/libs/handlebars/handlebars",
    ember: "assets/scripts/libs/ember/ember",
    ember_data: "assets/scripts/libs/ember-data/ember-data",
    helpers: "helpers/helpers",
    adapters: "adapters/adapter",
    App: "main",
    router: "routes/router"
  },
  shim:{    
    "ember_data":{
        deps:[ "ember"],
        exports:"DS"
    }
}
});

require(["router", "adapters"]);