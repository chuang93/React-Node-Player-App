import React from 'react';

export default class ContactView extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div>
			<figure className="snip1585">
  			<img src="/public/images/githubsnippet.JPG"/>
  			<figcaption>
    		<h3>Github <span>Projects</span></h3>
  			</figcaption>
  			<a href="https://github.com/chuang93"></a>
			</figure>
			<figure className="snip1585"><img src="/public/images/linkedinsnippet.JPG"/>
  			<figcaption>
    		<h3>Linkedin <span>Profile</span></h3>
  			</figcaption>
  			<a href="https://www.linkedin.com/in/chuang93/"></a>
			</figure>
			<h3>Email: chuang93@gmail.com</h3>
			
			</div>);
	}

}