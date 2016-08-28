// React Dependencies
import React, { Component, PropTypes } from 'react';

// Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

// Tap Events Hack
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class Layout extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <AppBar
            title="Awesome Chat App"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <div>{this.props.content}</div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout.propTypes = {
  content: PropTypes.element.isRequired,
};
