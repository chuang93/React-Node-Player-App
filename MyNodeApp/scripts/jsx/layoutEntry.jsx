import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin'; 
injectTapEventPlugin();

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
      <MuiThemeProvider>
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