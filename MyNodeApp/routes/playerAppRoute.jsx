var express = require('express');
var router = express.Router();
var playerwebapi = require('../scripts/playerProfileWebAPI.js');
var request = require('request');
//route namespaces are more a function of the app they control as opposed to a set of views rendered now.
router.get('/', function (req, res) {
	try{
  	var collection = req.app.locals.db.collection('playerProfiles');
  	collection.find().toArray(function(e,docs){
  		console.log(docs.length +" documents/records retrieved from mongo.");
          res.render('index', { 
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

router.get('/players', function(req,res){
  try{
    var collection = req.app.locals.db.collection('playerProfiles');
    collection.find( {} , { _id:1 , name:1 } ).toArray(function(e,docs){
      console.log(docs.length +" player ID's retrieved from mongo.");
          res.json(docs);
        });
  }
  catch(e){
    console.log("failed to get player list from Database playerProfiles");
    res.render('error',{
      'message' :e,

    });

  }
});


router.get('/:id', function (req, res) {
    
    var collection = req.app.locals.db.collection('playerProfiles');
    collection.find( {_id:req.params.id} ).toArray(function(e,docs){
      if(docs.length===0){
        console.log("player log for ID: " +req.params.id + " is not stored in database");
        getPlayerHeaderFromNbaStats(req,res);
      }
      else{
        console.log("player log for ID: " +req.params.id + " already exists, pulling from Mongo Collection: 'playerProfiles'.");
        res.json(docs[0]);
      }
    }); 
});    

function getPlayerHeaderFromNbaStats(req,res){
  this.PlayerID=req.params.id;
  this.apiURL="http://stats.nba.com/stats/commonplayerinfo/?playerID=" +this.PlayerID;
  console.log("request (GET) to: " +this.apiURL);
      request(this.apiURL, function (error, response, body) {
      body=JSON.parse(body);
      var headers=parseCommonPlayerInfo(body);
      var name=headers[3].replace(/ /g,"");
      console.log('statusCode for nba stats commonplayerinfo:', response && response.statusCode); // Print the response status code if a response was received 
      if(error!==null){
        // Print the error if one occurred 
        console.log('error:', error); 
      }else{
        //get game log object as well and add both to 'playerProfiles' collections
        getLogFromNbaStats(req,res,name,headers);
      } 
    });
}

function parseCommonPlayerInfo(infoJson){
  //TO DO: PARSE OUT WHAT YOU WANT FROM COMMON PLAYER INFO: CURRENTLY A CUMULATIVE HEADER
  return infoJson.resultSets[0].rowSet[0];

}
//helper function from get('/:id')
function getLogFromNbaStats(req,res,name,headers){
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
        var collection = req.app.locals.db.collection('playerProfiles');
        console.log("headers in collection insert are :" + headers);
        var datamodel={
          _id:req.params.id,
          name:name,
          headers:headers,
          gameLogJson:body
        };

        collection.insert(datamodel)
        res.json(datamodel);
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
    });
}

