// Meteor Dependencies and collections
import { FlowRouter } from 'meteor/kadira:flow-router';

// React Dependencies
import React from 'react';
import { mount } from 'react-mounter';

// App Components
import Layout from '/imports/ui/Layout.jsx';
import Chats from '/imports/ui/Chats.jsx';

// Routes
FlowRouter.route('/', {
  name: 'root',
  action() {
    mount(Layout, {
      content: (<Chats />),
    });
  },
});
