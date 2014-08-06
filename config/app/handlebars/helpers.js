var settings = require('../settings'),
    request = require('request'),
    Handlebars = require('hbs'),
    Step = require('step');




Handlebars.registerHelper('posts', function(context, options) {
  Step(
    // Building url
    function buildUrl() {
      var url = settings.constants.SERVICES_PATH + context;
      for(key in options.hash) {
        if(options.hash.hasOwnProperty("id") && key === "id") {
          url = url + "/" + options.hash["id"];
        }
      }
      return url;
    },
    // Loading projection
    function loadProjection(err, url) {
      request({url: url, json: true}, function (error, response, data) {
        if (!error && response.statusCode == 200) {
          context = JSON.stringify(data);
          //console.log("1- " + context);
        }
      });
      return context;
    }
  );
});


Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul>";

  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }

  return out + "</ul>";
});