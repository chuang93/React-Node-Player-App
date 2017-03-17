import React from 'react';

export default class PlayerDashBoard extends React.Component {
	constructor(props){
		super(props);
        this.state={
            playerName:''
            //ALL IMPORTANT ELEMENTS THAT CAN BE PULLED AND LIFTED DOWN INTO SEPERATE APPS NEED TO COME FROM THIS FIRST STATE
        }
	}
    render() {
        return(
            <div> This is going to be an NBA Player Dashboard that pools customized
            information from an nba player into one convenient page. Everything from stats, news, highlights, reddit posts, and it allows you to save a custom view of the components.
            </div>);
	}
}