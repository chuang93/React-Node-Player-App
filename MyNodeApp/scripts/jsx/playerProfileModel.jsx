import React from 'react';
import PlayerSearch from './playerSearch.jsx';

export default class PlayerModel extends React.Component {
	constructor(props){
		super(props);
	}
    render() {
        return (
         	<div style={{textAlign: 'center'}}>
         	<div> hello</div>
         	<PlayerSearch />
          </div>);
	}
}