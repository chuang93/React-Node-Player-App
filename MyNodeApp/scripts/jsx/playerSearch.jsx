import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

/**
 * The first example has `MenuItem`s in its data source that display on data entry.
 * The second example uses an array of values as its `dataSource`, and updates on focus.
 * Both examples have filtering disabled.
 */
export default class PlayerSearch extends React.Component {
	constructor(props) {
    //NEWER VERSIONS OF REACT REQUIRE A [handler].bind(this) since they are NOT AUTOBOUND.
    super(props);
    this.state = {
    	dataSource :[],
    	dataSourceConfig : {
  				text: 'textKey',
  				value: 'valueKey',
		}
    };
    this.getPlayerIdsFromServer = this.getPlayerIdsFromServer.bind(this);
  	}

  	getPlayerIdsFromServer(){
	//server returns array of json [{_id: "id"}]
	var request = new XMLHttpRequest();
	request.open('GET', '/playerApp/id', true);

	request.onload = function() {
  	if (request.status >= 200 && request.status < 400) {
    // Success!
    	console.log(JSON.parse(request.response));
    	let playerIdArray = JSON.parse(request.response).map((player) => {
    		return player._id;
    	});
    	//TO DO: IMPLEMENT IMMUTABLE CHANGE OF STATE.
    	this.setState({
    		dataSource:playerIdArray
    	});
  	} else {
    // We reached our target server, but it returned an error
    	console.log("request for player ID list failed.");
  	}
	}.bind(this);

	request.onerror = function() {
  	// There was a connection error of some sort
  	console.log("connection error to server, not reached");
	}.bind(this);

	request.send();

	}
	render(){
		return(
  		<div>
    		<AutoComplete
      		floatingLabelText="showAllItems"
      		onClick={this.getPlayerIdsFromServer}
      		filter={AutoComplete.noFilter}
      		openOnFocus={true}
      		dataSource={this.state.dataSource}
    		/><br />
  		</div>
  				);
			}
}

