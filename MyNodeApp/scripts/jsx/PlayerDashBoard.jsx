import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import PlayerServer from '../serverCalls';

export default class PlayerDashBoard extends React.Component {
	constructor(props){
		super(props);
        this.state={
            playerName:'',
            dataSource:[]

            //ALL IMPORTANT ELEMENTS THAT CAN BE PULLED AND LIFTED DOWN INTO SEPERATE APPS NEED TO COME FROM THIS FIRST STATE
        };
        this.loadPlayers = this.loadPlayers.bind(this);
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
            console.log("players already initialized or allPlayers didnt load right...");
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
                // openOnFocus={true}
                // searchText={this.state.playerName}
                // onUpdateInput={this.handleUpdatePlayer}
                dataSource={this.state.dataSource}
                maxSearchResults={5}
                />
                <br />
            </div>
            );
	}
}