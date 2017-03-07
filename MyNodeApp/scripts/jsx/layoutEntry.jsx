import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {white,darkBlack,fullBlack, indigo900,orange500,orange600,cyanA100,yellow600} from 'material-ui/styles/colors';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
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
    canvasColor: darkBlack,
    borderColor: indigo900,
    disabledColor: darkBlack,
    pickerHeaderColor: cyanA100,
    clockCircleColor: darkBlack,
        shadowColor: fullBlack,
  },
  drawer:{
    docked:false,
  }
})
export default class DrawerSimpleExample extends React.Component {

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
        <Drawer open={this.state.open}>
          <MenuItem>Home Page</MenuItem>
          <MenuItem>Other Projects</MenuItem>
          <MenuItem>About Me - Contact</MenuItem>
        </Drawer>
      </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<DrawerSimpleExample/>, document.getElementById("drawer"));