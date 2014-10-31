var appPath = process.cwd(),
    settings = require(appPath + "/core/config/settings"),
    Client = require("node-rest-client").Client,
    client = new Client(),
    Handlebars = require("express-hbs"),
    Q = require("q");

function getServiceData(url) {
  deferred = Q.defer();
  var req = client.get(url, function(data) {
          deferred.resolve(data);
        }
      );

  req.on('error', function(err){
      deferred.reject(err);
  });
  return deferred.promise;
}



Handlebars.registerHelper("projection", function(context, options) {

  return context.posts.title;
});

Handlebars.registerHelper("context", function(context, options) {

  // Building url
  var appOtions = settings.constants,
      url = appOtions.SERVICES_PATH + ":" + appOtions.SERVICES_PORT + "/" + context;
  for(key in options.hash) {
    if(options.hash.hasOwnProperty("id") && key === "id") {
      url = url + "/" + options.hash["id"];
    }
  }

  /*var responseData = {
        "posts": {
        "_id":"53c5262692c760e0e7000003",
        "title":"Async",
        "author": {
          "name":"Klayton Faria",
          "age":"27"},
          "phrase":"Conteúdo de remanejamento dos quadros funcionais."
        }
      };*/

  var responseData;

  getServiceData(url).then(function(data){
    responseData = data;
    console.log(responseData);
  }, function(err){
    responseData = err;
    console.log(responseData);
  });

return options.fn(responseData);

// TODO : Make urlrequest function synchronous
  //return options.fn(responseData);
});