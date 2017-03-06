var debug = require('debug')('MyNodeApp');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

if(MongoClient==null){
    debug('no mongod client!');
}
else{
    debug('mongoclient created');
};
var url = 'mongodb://localhost:27017/test';
module.exports=MongoClient.connect(url, function(err, db) {

  debug('attempting mongod in My Node App');
  assert.equal(null, err);
    debug("test connection to port 27017 successful. Closing Test Connection...");
    db.close();
});
