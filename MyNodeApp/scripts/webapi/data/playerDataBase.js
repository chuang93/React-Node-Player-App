var debug = require('debug')('MyNodeApp');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fetch = require('node-fetch');
if(MongoClient==null){
    debug('no mongod client!');
}
else{
    debug('mongoclient created');
};
var url = 'mongodb://localhost:27017/myNodeDb';
module.exports=MongoClient.connect(url, function(err, db) {

  debug('attempting mongod player seed data initialization...');
  assert.equal(null, err);
  console.log("adding player and team seed data if it doesnt exist...");
  try{
    var playerCollection = db.collection('playerData');
    playerCollection.find({}).toArray(function(e,docs){
      console.log(docs.length +" players pulled from playerData Database.");
      	if(docs.length === 0){
      		//addSeedDataFromJson(playerCollection,[MUST ADD SEED DATA]);
      	}
        });
    var teamCollection = db.collection('teamData');
    teamCollection.find({}).toArray(function(e,docs){
      console.log(docs.length +" teams pulled from teamData Database.");
      if(docs.length ===0){
      	// must copy and paste json from the data files to use this seeding.
      	// addSeedDataFromJson(teamCollection, [SEED DATA TO ADD]);
      }
        db.close();
        });

  }
  catch(error){
    console.log("Error seeding player/team Database..." + error);
  }  
});

function addSeedDataFromJson(dbCollection, jsonArray){
	jsonArray.forEach(function(object){
		var id = object.playerId;
		console.log(object);
		dbCollection.insert({
			_id:id,
			object:object
		});
	});
}
