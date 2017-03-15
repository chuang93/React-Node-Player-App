import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link,} from 'react-router-dom';
import AppLayout from './layoutEntry.jsx';
import HomeView from './HomeView.jsx';
import ContactView from './Contact.jsx';
import PlayerModel from './playerProfileModel.jsx';
import createBrowserHistory from 'history/createBrowserHistory'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const history = createBrowserHistory()


export default class AppRoutes extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<Router history ={history}>
				<div>
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
        		</div>
    		</Router>
			);
	}
}


if(typeof window !== 'undefined') {// NEED THIS CONDITIONAL TO EXCLUDE SERVER SIDE DOCUMENT
  ReactDOM.render(<AppRoutes />, document.getElementById("appLayout"));
}
