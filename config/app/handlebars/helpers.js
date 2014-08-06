var settings = require('../settings'),
    request = require('request'),
    Handlebars = require('hbs'),
    Step = require('step');

function getData(url, callback) {
  // Loading projection
  request({url: url, json: true}, function (error, response, data) {
    if (!error && response.statusCode == 200) {
      callback(data);
    }
  });
}

function getContext(url) {
  returngetData(url, function(data){
    data = JSON.stringify(data);
    return data;
  });
}

Handlebars.registerHelper('posts', function(context, options) {
  var content = {posts:[{name:"klayton"}]};
  // Building url
  var url = settings.constants.SERVICES_PATH + context;
  for(key in options.hash) {
    if(options.hash.hasOwnProperty("id") && key === "id") {
      url = url + "/" + options.hash["id"];
      //content = getContext(url);
    }
  }

    console.log(content);
    return JSON.stringify(content);
});


Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul>";

  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }

  return out + "</ul>";
});