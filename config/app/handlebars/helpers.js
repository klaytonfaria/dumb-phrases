var settings = require('../settings'),
    Client = require('node-rest-client').Client,
    client = new Client(),
    request = require('request'),
    Handlebars = require('hbs'),
    Step = require('step');


Handlebars.registerHelper('projection', function(context, options) {

  return context.posts.title;
});

Handlebars.registerHelper('context', function(context, options) {
  var content = {"posts": {
    "_id":"53c5262692c760e0e7000003",
    "title":"Teste",
    "author": {
      "name":"Klayton Faria",
      "age":"27"},
      "phrase":"Podemos jÃ¡ vislumbrar o modo pelo qual a estrutura atual da organizaÃ§Ã£o prepara-nos para enfrentar situaÃ§Ãµes atÃ­picas decorrentes do remanejamento dos quadros funcionais."
    }
  };

  // Building url
  /*var url = settings.constants.SERVICES_PATH + context;
  for(key in options.hash) {
    if(options.hash.hasOwnProperty("id") && key === "id") {
      url = url + "/" + options.hash["id"];
      client.get(url, function(data, response) {
        content = data;
      });
    }
  }*/

  return content;
});