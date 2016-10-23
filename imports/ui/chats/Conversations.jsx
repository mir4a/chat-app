import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Snackbar from '/imports/ui/shared/Snackbar';

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
      disconnected,
      connecting,
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

    const connectSnack = connecting
      ? <Snackbar message="Connecting" />
      : '';

    const disconnectSnack = disconnected
      ? <Snackbar message="Connection lost..." />
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
        {connectSnack}
        {disconnectSnack}
      </div>
    );
  }
}

Conversations.propTypes = {
  loading: PropTypes.bool,
  disconnected: PropTypes.bool,
  connecting: PropTypes.bool,
  chats: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})),
};


export default createContainer(() => {
  const usersHandler = Meteor.subscribe('usersList');
  const chatsHandler = Meteor.subscribe('chatList');
  return {
    loading: !(usersHandler.ready() && chatsHandler.ready()),
    disconnected: !Meteor.status().connected,
    connecting: Meteor.status().connecting,
    chats: Chats.find().fetch(),
    users: Meteor.users.find({ _id: { $ne: Meteor.userId() }}).fetch(),
  };
}, Conversations);
