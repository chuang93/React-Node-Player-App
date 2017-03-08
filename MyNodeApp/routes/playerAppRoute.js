var express = require('express');
var router = express.Router();
var playerwebapi = require('../scripts/playerProfileWebAPI.js');

router.get('/', function (req, res) {
	try{
  	var collection = req.app.locals.db.collection('playerProfiles');
  	collection.find().toArray(function(e,docs){
  		console.log(docs.length +" documents/records retrieved from mongo.");
          res.render('playerApp', { 
          	playerProfs: docs,
          	title: "Player Profiles" });
        });
  }
  catch(e){
  	console.log("failed to render player app endpoint, routing to error endpoint..");
  	res.render('error',{
  		'message' :e,

  	});

  }
});    

router.get('/:id', function (req, res) {
    var playerJson= playerwebapi.playerLogPromise(req.params.id.toString(),'2016-17','Regular%20Season');
    playerJson.then(function(response){
      res.json(response);
    },function(error){
      res.json(error);
    })
});    
module.exports = router;


