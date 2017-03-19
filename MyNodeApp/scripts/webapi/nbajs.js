import ServerCalls from "../serverCalls.js";

const NBA = require("nba");

module.exports.getPlayer = function getPlayer(playerName){
	//playerName syntax: '[firstname] [lastname]'
	const player=NBA.findPlayer(playerName);
	return player;
}

module.exports.getTeamNameForPlayer = function getTeamNameForPlayer(playerName){
	const player = module.exports.getPlayer(playerName);
	const teamId = player.teamId;
	return ServerCalls.teamServerPromise(teamId);
}

module.exports.getPlayerProfile = function getPlayerProfile(playerName){
	const player = module.exports.getPlayer(playerName);
	const playerId = player.playerId;
	const playerParam = {
		PlayerID:playerId,
	}
	return NBA.stats.playerProfile(playerParam);
}

module.exports.getPlayerInfo = function getPlayerInfo(playerName){
	const player = module.exports.getPlayer(playerName);
	const playerId = player.playerId;
	const playerParam = {
		PlayerID:playerId,
	}
	return NBA.stats.playerInfo(playerParam);
}
//playerSplits doesnt work//api call to NBA.com has changed
module.exports.getPlayerSplits = function getPlayerSplits(playerName){
	const player = module.exports.getPlayer(playerName);
	const playerId = player.playerId;
	const playerParam = {
		PlayerID:playerId,
	}
	return NBA.stats.playerSplits(playerParam);
}