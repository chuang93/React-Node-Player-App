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
		console.log(this.props.teamName);
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
			<div>
			<figure className="snip1579"><img src="http://img.bleacherreport.net/img/images/photos/003/570/165/hi-res-39042215448e6d76b78bcba00c373101_crop_north.jpg?1454256739&w=630&h=420" alt="profile-sample2"/>
  				<figcaption>
    			<h3>{this.props.playerName}</h3>
    			<h5>{this.props.teamName}</h5>
    			<blockquote>
      			<ul>
					{this.getCommonPlayerInfoArray()}
				</ul>
    			</blockquote>
  				</figcaption>
  				<a href="#"></a>
			</figure>
			<button>Test </button>
			</div>
			);
	}
}