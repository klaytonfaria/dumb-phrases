var appPath = process.cwd() + "/",
    fs = require('fs'),
    path = require("path"),
    settings = require(appPath + "/core/config/settings").constants,
    mongojs = require('mongojs');


// Register all routes dinamically
exports.requireRecursive = function (app, folderName) {
  fs.readdirSync(folderName).forEach(function(file) {
    var fullName = path.join(folderName, file),
        stat = fs.lstatSync(fullName);
    if(file.substr(-3) == ".js") {
      if ( stat.isDirectory() ) {
        requireRecursive(fullName);
      } else if ( file.toLowerCase().indexOf('.js') ) {
        require(appPath + fullName)(app, mongojs, settings);
      }
    }
  });
}

// Utils
exports.responseJSON = function (status, res, content) {
  res.writeHead(status, {"Content-Type" : "application/json"});
  res.end(JSON.stringify(content));
}