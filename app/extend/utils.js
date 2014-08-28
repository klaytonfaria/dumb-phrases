var appPath = process.cwd(),
    fs = require('fs'),
    settings = require(appPath + "/config/settings").constants,
    routes = {};

// Register all routes dinamically
fs.readdirSync(appPath + settings.ROUTES_PATH).forEach(function(file) {
  if(file.substr(-3) == ".js") {
    var fileNamefile = file.replace(".js","");
    routes[fileNamefile] = require(appPath + settings.ROUTES_PATH + file);
    //require(appPath + settings.ROUTES_PATH + file);
  }
});

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
  get : function(app, virtualPaths) {
    exports.getProperties(virtualPaths, function(routesObj){
      var callback = eval("routes." + routesObj[1]);
      if(callback && callback !== "") {
        callback = callback[routesObj[2]];
        if(callback) {
          app.get(routesObj[0], callback);
        }
      }
    });
    return app;
  },
  post : function(app, virtualPaths) {
    exports.getProperties(virtualPaths, function(routesObj){
      var callback = eval("routes." + routesObj[1]);
      if(callback && callback !== "") {
        callback = callback[routesObj[2]];
        if(callback) {
          app.post(routesObj[0], callback);
        }
      }
    });
    return app;
  },
}


