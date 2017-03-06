var express = require('express');
var router = express.Router();
/* GET users listing. */
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');


router.get('/', function (req, res) {
	// Connection URL
	var url = 'mongodb://localhost:27017/myNodeDb';
	// Use connect method to connect to the Server
	MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
  	console.log("Connected correctly to myNodeDb");
  	var collection = db.collection('playerProfiles');
  	collection.find().toArray(function(e,docs){
  		console.log(docs.length +" documents/records retrieved from mongo.");
          res.render('playerApp', { 
          	playerProfs: docs,
          	title: "Player Profiles" });
          //db.close();
        });
    
  });
});    

router.get('/:id', function (req, res) {
	res.send("profile: " + req.params.id+  
		" endpoint! (TODO)")

});    
module.exports = router;