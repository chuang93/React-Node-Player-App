import React from 'react';
import ParsingHelper from '../utilities/parsingHelpers.js';

export default class PlayerFaceCard extends React.Component{
	constructor(props){
		super(props);
		this.getCommonPlayerInfoArray=this.getCommonPlayerInfoArray.bind(this);
	}

	getCommonPlayerInfoArray(){
		//console.log(this.props.playerInfo);
		if(this.props.playerInfo.commonPlayerInfo!==undefined){
		const commonPlayerObj=this.props.playerInfo.commonPlayerInfo[0];
		console.log(commonPlayerObj);

		const tupleArray = ParsingHelper.getTupleArrayProperties(commonPlayerObj);

		var list = tupleArray.map(function(element){
			return <li key={element[0]}>{element[1]}</li>
		});
		return list;
		}
		else{
			console.log("could not parse playerInfo for fields...");
		}
	}

	render(){
		return(
			<ul>
				{this.getCommonPlayerInfoArray()}
			</ul>
			);
	}
}