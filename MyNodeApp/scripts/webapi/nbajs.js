//api calls using the nba js library @ https://github.com/nickb1080/nba

const NBA = require("nba");

const westbrook=NBA.findPlayer('Russell Westbrook');

NBA.stats.playerInfo({ PlayerID: westbrook.playerId }).then(console.log);

NBA.stats.playerHustle().then(console.log);

fetch('/data/teams.json').then(function(response){
	console.log(response);
});