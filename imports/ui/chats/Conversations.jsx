import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

// Api
import Chats from '/imports/api/chats';
import UsersList from '/imports/ui/users/UsersList';
import NewChatModal from './NewChatModal';
import Spinner from '/imports/ui/shared/Spinner';
import Chat from './Chat';


export default class Conversations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newChatModalOpened: false,
    };
  }

  toggleNewChatModal = () => {
    this.setState({
      newChatModalOpened: !this.state.newChatModalOpened,
    });
  };

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
    const {
      newChatModalOpened,
    } = this.state;
    const {
      loading,
      users,
    } = this.props;
    const spinner = loading
      ? <Spinner />
      : '';
    const newChat = newChatModalOpened
      ? <NewChatModal
          users={users}
          toggleNewChatModal={this.toggleNewChatModal}
        />
      : '';

    return (
      <div className="conversations">
        {spinner}
        {this.renderChats()}
        <FloatingActionButton
          secondary
          onTouchTap={this.toggleNewChatModal}
          className="addChatButton"
        >
          <ContentAdd />
        </FloatingActionButton>
        {newChat}
      </div>
    );
  }
}

Conversations.propTypes = {
  loading: PropTypes.bool,
  chats: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.shape({}),
};

export default createContainer(() => {
  const usersHandler = Meteor.subscribe('usersList');
  return {
    loading: !(usersHandler.ready()),
    chats: Chats.find({}).fetch(),
    users: Meteor.users.find({}),
  };
}, Conversations);
