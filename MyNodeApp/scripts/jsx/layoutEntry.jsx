import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {white,darkBlack,fullBlack, indigo900,orange500,orange600,cyanA100,yellow600} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PlayerModel from './playerProfileModel.jsx';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  fontFamily: 'Arial',
  palette: {
    primary1Color: indigo900,
    primary2Color: indigo900,
    primary3Color: cyanA100,
    accent1Color: yellow600,
    accent2Color: orange600,
    accent3Color: orange500,
    textColor: indigo900,
    alternateTextColor: white,
    canvasColor: orange500,
    borderColor: indigo900,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyanA100,
    clockCircleColor: darkBlack,
        shadowColor: fullBlack,
  }
})

const styles ={
  mediumIcon: {
    width: 48,
    height: 48,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
}
export default class AppLayout extends React.Component {

  constructor(props) {
    //NEWER VERSIONS OF REACT REQUIRE A [handler].bind(this) since they are NOT AUTOBOUND.
    super(props);
    this.state = {open: false};
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle(){
    this.setState({open: !this.state.open});
  }

  render() {
    return (

      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <RaisedButton
          label="Menu"
          onTouchTap={this.handleToggle}
        />
        <PlayerModel/>
         <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
         >
          <MenuItem> 
            <IconButton
              iconStyle={styles.mediumIcon}
              style={styles.medium}
            >
              <ActionHome />
            </IconButton>
          </MenuItem>
          <MenuItem>Other Projects</MenuItem>
          <MenuItem>About Me - Contact</MenuItem>
        </Drawer>
      </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={AppLayout}>
    </Route>
    <Route path="/playerApp" component={AppLayout}>
    </Route>
  </Router>, document.getElementById("appLayout"));