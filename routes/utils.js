// Utils
exports.responseJSON = function (status, res, content) {
  res.writeHead(status, {"Content-Type" : "application/json"});
  res.end(JSON.stringify(content));
}