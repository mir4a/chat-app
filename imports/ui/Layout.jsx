// React Dependencies
import React, { Component, PropTypes } from 'react';

// Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

// Tap Events Hack
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }


  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <AppBar
            title="Awesome Chat App"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <div>{this.props.content}</div>
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <MenuItem
              onTouchTap={() => {
                this.handleClose();
                FlowRouter.go('root')}
              }
            >
              Home
            </MenuItem>
            <MenuItem
              onTouchTap={() => {
                this.handleClose();
                FlowRouter.go('chatList')}
              }
            >
              All Chats
            </MenuItem>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout.propTypes = {
  content: PropTypes.element.isRequired,
};
