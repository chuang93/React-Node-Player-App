import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Router, Route, Link,} from 'react-router-dom';
import AppLayout from './layoutEntry.jsx';
import HomeView from './HomeView.jsx';
import ContactView from './Contact.jsx';
import PlayerModel from './playerProfileModel.jsx';
import createBrowserHistory from 'history/createBrowserHistory'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


export default class AppRoutes extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
        		<AppLayout routes=
        		{{
        			"Home":"/",
        			"PlayerApp":"/playerapp",
        			"Contact":"/contact"
        		}}>
                <Route path= "/" component = {HomeView} />
        		<Route path= "/playerapp" component= {PlayerModel}/>
        		<Route path= "/contact" component = {ContactView} />
        		</AppLayout>
			);
	}
}


if(typeof window !== 'undefined') {//CLIENT SIDE: RENDERS WITH BROWSERROUTER
  ReactDOM.render(
  	<BrowserRouter>
  	<AppRoutes />
  	</BrowserRouter>
  		, document.getElementById("appLayout"));
}
