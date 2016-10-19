import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

// Api
import Chats from '/imports/api/chats';

import Chat from './Chat';


export default class Conversations extends Component {

  deleteChat(chat) {
    Meteor.call('deleteChat', chat._id);
  }

  addNewChat() {
    console.log('addNewChat');
    let name = `New Chat ${(new Date).getTime()}`;
    Meteor.call('newChat', name);
  }

  renderChats() {
    return this.props.chats.map(chat => (
      <Chat
        key={chat._id}
        chat={chat}
        deleteChat={this.deleteChat.bind(this)}
      />
    ));
  }

  render() {

    return (
      <div className="conversations">
        {this.renderChats()}
        <FloatingActionButton
          secondary
          onTouchTap={this.addNewChat}
          className="addChatButton"
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

Conversations.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => (
  {
    chats: Chats.find({}).fetch(),
  }
), Conversations);
