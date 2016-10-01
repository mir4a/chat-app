// Meteor Dependencies
import { FlowRouter } from 'meteor/kadira:flow-router';

// React Dependencies
import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import AccountsUIWrapper from '/imports/ui/shared/AccountsUIWrapper.jsx';

export default function Layout({ content }) {
  const titleLinkStyles = {
    textDecoration: 'none',
    color: 'white',
  };

  const toggleLeftMenu = () => {
    $('.conversations').toggleClass('show');
  };

  return (
    <MuiThemeProvider>
      <div>
        <AppBar
          title={
            <a style={titleLinkStyles} href={FlowRouter.path('chats')}>Awesome Chat App</a>
          }
          showMenuIconButton
          onLeftIconButtonTouchTap={toggleLeftMenu}

          iconElementRight={<AccountsUIWrapper />}
        />
        <div>{content}</div>
      </div>
    </MuiThemeProvider>
  );
}
