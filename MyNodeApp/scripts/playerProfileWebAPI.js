//js wrapper-layer for external NBA stats REST API calls.
//sample player game log api call: http://stats.nba.com/stats/playergamelog/?PlayerID=201566&Season=2016-17&SeasonType=Regular%20Season
// y=getPlayerGameLogAJAX("201566","2016-17","Regular Season");
//KEEP IN MIND CROSS ORIGIN RESOURCE SHARING WHEN YOU ARE BUILDING OTHER STUFF/PUBLISHING TO PRODUCTION. 
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports.playerLogPromise =function playerLogPromise(playerId, season, seasonType) {
    // Return a new promise.
  	return new Promise(function(resolve, reject) {
    this.PlayerID = playerId;
    this.Season = season;
    this.SeasonType = seasonType;
    this.queryString = "?PlayerID=" + playerId + "&Season=" + season + "&SeasonType=" + seasonType;
    this.apiURL = "http://stats.nba.com/stats/playergamelog/" + this.queryString;
    console.log("query (GET)" +this.apiURL);
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', apiURL);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        console.log("request response (200): " + req.responseText);
        resolve(req.responseText);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

function PlayerLog(ajaxResponse) {
    this.playerLogObject = ajaxResponse.responseJSON;
    this.PlayerID = this.playerLogObject.parameters.PlayerID;
    this.Season = this.playerLogObject.parameters.Season;
    this.SeasonType = this.playerLogObject.parameters.SeasonType;
    this.Resource = this.playerLogObject.resource;
    this.Headers = this.playerLogObject.resultSets[0].headers;
    this.RowSet = this.playerLogObject.resultSets[0].rowSet;
}
