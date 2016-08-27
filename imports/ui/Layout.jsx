// React Dependencies
import React, { Component, PropTypes } from 'react';

// Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Tap Events Hack
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class Layout extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>{this.props.content}</div>
      </MuiThemeProvider>
    );
  }
}

Layout.propTypes = {
  content: PropTypes.element.isRequired,
};
