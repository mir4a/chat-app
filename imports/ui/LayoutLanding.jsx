// React Dependencies
import React, { Component, PropTypes } from 'react';

// Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

// TODO: include once
// // Tap Events Hack
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

export default class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Hello, Awesome Chat App"
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
