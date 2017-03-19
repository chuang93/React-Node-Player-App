import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import PlayerServer from '../serverCalls';
import NbaJS from '../webapi/nbajs.js';
import PlayerFaceCard from './PlayerFaceCard.jsx';
import YoutubeModule from './youtubeModule.jsx';
export default class PlayerDashBoard extends React.Component {
	constructor(props){
		super(props);
        this.state={
            searchText:'',
            player:{
                playerName: "",
                teamName: "",
                playerProfile:{},
                playerInfo:{},
            },
            dataSource:[]

            //ALL IMPORTANT ELEMENTS THAT CAN BE PULLED AND LIFTED DOWN INTO SEPERATE APPS NEED TO COME FROM THIS FIRST STATE
        };
        this.loadPlayers = this.loadPlayers.bind(this);
        this.handleUpdatePlayer = this.handleUpdatePlayer.bind(this);
	}
    handleUpdatePlayer(searchText){
        const playerObject = NbaJS.getPlayer(searchText);
        var getPlayerInfoPromise = NbaJS.getPlayerInfo(searchText);
        var getPlayerProfilePromise = NbaJS.getPlayerProfile(searchText);
        Promise.all([getPlayerInfoPromise,getPlayerProfilePromise]).then(function(values){
            console.log(values);
            const playerInfo=values[0];
            const playerProfile=values[1];
            this.setState({
            searchText:searchText,
            player:{
                playerName: playerObject.fullName,
                teamName: "test",
                playerProfile:playerProfile,
                playerInfo:playerInfo,
            },
            });

        }.bind(this)).catch(reason => {
            console.log(reason);
        });
    }
    loadPlayers(){
        console.log("initializing players.. ");
        if(this.state.dataSource.length=== 0){
            PlayerServer.playerServerPromise().then(function(response){
                var nameArray = response.map(function(player){
                    return player.object.firstName + " " + player.object.lastName;
                });
                //the map function is synchronous, the next command waits for it to be done.
                this.setState({
                    dataSource: nameArray
                });
                //console.log(this.state.dataSource);
            }.bind(this),function(error){
                console.log(error);
            });        
        }
        else{
            //console.log("players already initialized or allPlayers didnt load right...");
        }
    }
    render() {
        return(
            <div> 
                <p>An NBA dashboard app that gets information from what you really care about in an NBA player
                </p>
                <br />
                <AutoComplete
                hintText = "e.g 'Russell Westbrook'"
                floatingLabelText="Current player selected:"
                filter={AutoComplete.fuzzyFilter}
                onClick={this.loadPlayers}
                // searchText={this.state.playerName}
                onNewRequest={this.handleUpdatePlayer}
                dataSource={this.state.dataSource}
                maxSearchResults={5}
                />
                <br />
                <div>{this.state.player.playerName + " " +this.state.player.teamName}</div>
                <PlayerFaceCard
                    playerInfo={this.state.player.playerInfo}
                />
{/*                <div>{JSON.stringify(this.state.player.playerProfile)}</div>  */}       
            </div>
            );
	}
}