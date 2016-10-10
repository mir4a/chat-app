// Meteor Dependencies
import { FlowRouter } from 'meteor/kadira:flow-router';

// React Dependencies
import React from 'react';
import DocumentMeta from 'react-document-meta';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import AccountsUIWrapper from '/imports/ui/shared/AccountsUIWrapper.jsx';

export default function Layout({ content }) {
  const titleLinkStyles = {
    textDecoration: 'none',
    color: 'white',
  };

  const meta = {
    title: 'Awesome Chat',
    description: 'Like skype but Awesome',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'react,meta,document,html,tags',
      },
    },
  };

  const toggleLeftMenu = () => {
    $('.conversations').toggleClass('show');
  };

  return (
    <MuiThemeProvider>
      <div>
        <DocumentMeta {...meta} />
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
