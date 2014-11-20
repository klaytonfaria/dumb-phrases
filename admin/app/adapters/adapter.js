define(["app", "ember_data"], function(App) {  
  App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: "http://localhost:3030",
    namespace : "/api/"
  });

  /*App.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: "http://localhost:3030/api/",
    url: "posts"
  });
*/
  App.post = DS.Model.extend({
    name : DS.attr("string")
  });
});