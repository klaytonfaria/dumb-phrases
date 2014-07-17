var virtualPaths = require('../config/app/paths'),
    routes = require('./routes');

// Utils
exports.responseJSON = function (status, res, content) {
  res.writeHead(status, {"Content-Type" : "application/json"});
  res.end(JSON.stringify(content));
}

// Parse json properties
exports.getProperties = function (obj, callback) {
  var key,
      childType;
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      childType = typeof obj[key],
      isArray = Object.prototype.toString.call(obj[key]) === "[object Array]";
      if(childType === "object" && !isArray) {
        exports.getProperties(obj[key], callback);
      } else {
        if(typeof callback === "function") {
          if(isArray) {
            callback(obj[key]);
          }
        } else {
          return obj[key];
        }
      }
    }
  }
}

exports.setRoutes = {
  get : function(app) {
    exports.getProperties(virtualPaths.get, function(routesObj){
      callback = eval("routes." + routesObj[1]);
      callback = callback ? callback : function(){};
      app.get(routesObj[0], callback);

    });
    return app;
  },
  post : function(app) {
    exports.getProperties(virtualPaths.post, function(routesObj){
      callback = eval("routes." + routesObj[1]);
      callback = callback ? callback : function(){};
      app.post(routesObj[0], callback);

    });
    return app;
  }
}


