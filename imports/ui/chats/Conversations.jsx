import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// Api
import Chats from '/imports/api/chats.js';

import Chat from './Chat.jsx';


export default class Conversations extends Component {

  deleteChat(chat) {
    Chats.remove(chat._id);
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
      <div className="container">
        {this.renderChats()}
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
