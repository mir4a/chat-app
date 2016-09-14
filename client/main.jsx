// Meteor Dependencies and collections
import { FlowRouter } from 'meteor/kadira:flow-router';

// React Dependencies
import React from 'react';
import { mount } from 'react-mounter';

// App Components
import Layout from '/imports/ui/layouts/Layout.jsx';
import GuestLayout from '/imports/ui/layouts/GuestLayout.jsx';
import Conversation from '/imports/ui/chats/Conversation.jsx';
import Converstaions from '/imports/ui/chats/Conversations.jsx';
import Landing from '/imports/ui/pages/Landing.jsx';

// Tap Events Hack
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

// Routes
FlowRouter.route('/', {
  name: 'root',
  action() {
    mount(GuestLayout, {
      content: (<Landing />),
    });
  },
});

const chatRoutes = FlowRouter.group({
  prefix: '/chats',
  name: 'chat',
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
