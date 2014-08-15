var mongojs = require('mongojs'),
  db = mongojs("node-mongo-dumbPhrases"),
  dumbPhrases = db.collection('dumbPhrases'),
  utils = require('./utils');

exports.index = function(res, res) {
  res.render('index', {
    title: 'Teste',
    author: {name: 'Klayton Faria', age:27},
    phrase: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, officiis temporibus id voluptatum ad iste!'
  });
};