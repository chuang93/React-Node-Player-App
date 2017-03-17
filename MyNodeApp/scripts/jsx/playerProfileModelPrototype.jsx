import React from 'react';
import PlayerSearch from './playerSearch.jsx';

export default class PlayerModelPrototype extends React.Component {
	constructor(props){
		super(props);
	}
    render() {
        return (
         	<div style={{textAlign: 'center'}}>
         	<h2> ||Rendered React Router View of PlayerModel Component ||</h2>
         	<p>Note: the routes at '/playerApp/' represent the first full set of server endpoints with full React Ui Componenets.
            This set of endpoints will always be saved on my website as my first 'App'. While building this, I made my own promise-pattern
            api calls to the nba stats api and then saved the results in my Mongodb database (myNodeDb -> playerProfiles [collection]). I then created REST api responses to get json formatted values
            from the database for players by ID. I used material ui to create an autocomplete component that stored the values of the existing players and render them when clicked on. This prototype app
            is complete and no longer worked on/supported, all it does is render raw player json logs which i was going to create a front end for. I learned the fundamentals of Node Js, Express, Mongodb,
            React and React Router (Browser and Server side rendering) while building out this minimal functionality app and it will always server as a reminder of the beginning stages of my javascript web
            development journey. :)</p>
            <PlayerSearch />
          </div>);
	}
}