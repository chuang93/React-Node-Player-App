import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Router, Route, Link,} from 'react-router-dom';
import AppLayout from './layoutEntry.jsx';
import HomeView from './HomeView.jsx';
import ContactView from './Contact.jsx';
import PlayerModelPrototype from './playerProfileModelPrototype.jsx';
import PlayerDashBoard from './PlayerDashBoard.jsx';
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
        			"Contact":"/contact",
              "PlayerDashBoard":"/playerdashboard",
        		}}>
            <Route exact path= "/" component = {HomeView} />
        		<Route path= "/playerapp" component= {PlayerModelPrototype}/>
            <Route path = "/playerdashboard" component ={PlayerDashBoard}/>
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
