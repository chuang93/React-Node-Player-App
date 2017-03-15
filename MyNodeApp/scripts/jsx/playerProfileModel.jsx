import React from 'react';
import PlayerSearch from './playerSearch.jsx';

export default class PlayerModel extends React.Component {
	constructor(props){
		super(props);
	}
    render() {
        return (
         	<div style={{textAlign: 'center'}}>
         	<h2> ||Rendered React Router View of PlayerModel Component ||</h2>
         	<PlayerSearch />
          </div>);
	}
}