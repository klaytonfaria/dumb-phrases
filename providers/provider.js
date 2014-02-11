var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

DumbPhrasesProvider = function(host, port) {
  this.db = new Db('node-mongo-dumbPhrases', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


DumbPhrasesProvider.prototype.getCollection = function(callback) {
  this.db.collection('dumbPhrases', function(error, dumbPhrases_collection) {
    if(error) {
      callback(error);
    } else {
      callback(null, dumbPhrases_collection);
    }
  });
};

//find all dumb phrases
DumbPhrasesProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, dumbPhrases_collection) {
      if(error) {
        callback(error)
      } else {
        dumbPhrases_collection.find().toArray(function(error, results) {
          if(error) {
            callback(error)
          } else { 
            callback(null, results)
          }
        });
      }
    });
};

//save new dumb phrase
DumbPhrasesProvider.prototype.save = function(dumbPhrases, callback) {
    this.getCollection(function(error, dumbPhrases_collection) {
      if(error) callback(error) 
      else {
        if(typeof(dumbPhrases.length) == "undefined") {
          dumbPhrases = [dumbPhrases];          
        } 

        for( var i = 0; i < dumbPhrases.length; i++ ) {
          dumbPhrase = dumbPhrases[i];
          dumbPhrase.created_at = new Date();
        }

        dumbPhrases_collection.insert(dumbPhrases, function() {
          callback(null, dumbPhrases);
        });
      }
    });
};

exports.DumbPhrasesProvider = DumbPhrasesProvider;