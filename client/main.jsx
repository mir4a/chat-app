// Meteor Dependencies and collections
import { FlowRouter } from 'meteor/kadira:flow-router';

// React Dependencies
import React from 'react';
import { mount } from 'react-mounter';

// App Components
import Layout from '/imports/ui/Layout.jsx';
import LayoutLanding from '/imports/ui/LayoutLanding.jsx';
import Conversation from '/imports/ui/Conversation.jsx';
import Converstaions from '/imports/ui/Conversations.jsx';
import Landing from '/imports/ui/Landing.jsx';

// Routes
FlowRouter.route('/', {
  name: 'root',
  action() {
    mount(LayoutLanding, {
      content: (<Landing />),
    });
  },
});

const chatRoutes = FlowRouter.group({
  prefix: '/chats',
  name: 'chat',
  triggersEnter: [function(context, redirect) {
    console.log('running group triggers');
  }]
});

chatRoutes.route('/', {
  name: 'chatList',
  action() {
    mount(Layout, {
      content: (<Converstaions />),
    });
  },
});

chatRoutes.route('/:chatId', {
  name: 'chat',
  action() {
    mount(Layout, {
      content: (<Conversation />),
    });
  },
});
