var express = require('express');
var router = express.Router();
var playerwebapi = require('../scripts/playerProfileWebAPI.js');
var request = require('request');

router.get('/', function (req, res) {
	try{
  	var collection = req.app.locals.db.collection('playerProfiles');
  	collection.find().toArray(function(e,docs){
  		console.log(docs.length +" documents/records retrieved from mongo.");
          res.render('playerApp', { 
          	playerProfs: docs,
          	title: "Player Profiles",
            playerLog:"use URL to submit official NBA.com Player ID (e.g '.../201566' for Russell Westbrook).",
          });
        });
  }
  catch(e){
  	console.log("failed to render player app endpoint, routing to error endpoint..");
  	res.render('error',{
  		'message' :e,

  	});

  }
});

router.get('/id', function(req,res){
  try{
    var collection = req.app.locals.db.collection('playerLogRaw');
    collection.find( {} , { _id:1 } ).toArray(function(e,docs){
      console.log(docs.length +" player ID's retrieved from mongo.");
          res.json(docs);
        });
  }
  catch(e){
    console.log("failed to get player id list from Database playerLogRaw");
    res.render('error',{
      'message' :e,

    });

  }
});


router.get('/:id', function (req, res) {
    
    var collection = req.app.locals.db.collection('playerLogRaw');
    collection.find( {_id:req.params.id} ).toArray(function(e,docs){
      if(docs.length===0){
        console.log("player log for ID: " +req.params.id + " is not stored in database");
        getLogFromNbaStats(req,res);
      }
      else{
        console.log("player log for ID: " +req.params.id + " already exists, pulling from Mongo Collection: 'playerLogRaw'.");
        res.json(docs[0].rawJson);
      }
    }); 
});    

//helper function from get('/:id')
function getLogFromNbaStats(req,res){
    this.PlayerID = req.params.id;
    this.SeasonType = 'Regular%20Season';
    this.Season = '2016-17';
    this.queryString = "?PlayerID=" + this.PlayerID + "&Season=" + this.Season + "&SeasonType=" + this.SeasonType;
    this.apiURL = "http://stats.nba.com/stats/playergamelog/" + this.queryString;
    console.log("request (GET) to: " + this.apiURL);
    request(this.apiURL, function (error, response, body) {
      body=JSON.parse(body);
      console.log('statusCode for nba stats player log:', response && response.statusCode); // Print the response status code if a response was received 
      if(error!==null){
        console.log('error:', error); 
      }else{// Print the error if one occurred 
        var collection = req.app.locals.db.collection('playerLogRaw');
        collection.insert({
          _id:req.params.id,
          rawJson:body
        })
        res.json(body);
      } 
    });
}
module.exports = router;


// deprecated functions

//DEPRECATED PROMISE RETURN FOR NBA PLAYER WEB API (Reason: Node JS performance slow on xmlhttprequest native js call)
function playerAPIPromiseResponse(req,response,error){
  return playerwebapi.playerLogPromise(req.params.id.toString(),'2016-17','Regular%20Season');
    playerJson.then(function(response){
      res.json(response);
    },function(error){
      res.json(error);
    })
}

