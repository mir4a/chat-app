import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatWithUser: false,
      chatTitle: 'New Chat',
      initialMessage: 'Welcome',
    };
  }

  addNewChat = () => {
    const {
      chatWithUser,
      chatTitle,
      initialMessage,
    } = this.state;

    console.log('addNewChat');

    this.props.toggleNewChatModal();

    Meteor.call('newChat', {
      chatWithUser: chatWithUser._id,
      chatTitle,
      initialMessage,
    });
  }

  selectUserHandler = (user) => {
    this.setState({
      chatWithUser: user,
      chatTitle: `chat with ${user.username}`,
    });
  }

  changeTitleHandler = (event) => {
    this.setState({
      chatTitle: event.target.value,
    });
  }

  changeInitialMessageHandler = (event) => {
    this.setState({
      initialMessage: event.target.value,
    });
  }

  render() {
    const {
      users,
      toggleNewChatModal,
    } = this.props;

    const {
      chatWithUser,
      chatTitle,
      initialMessage,
    } = this.state;

    const source =  users.map(user => (
      {
        username: user.username,
        _id: user._id,
      }
    ));

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={toggleNewChatModal}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.addNewChat}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Add new chat"
          actions={actions}
          modal={false}
          open
          onRequestClose={toggleNewChatModal}
        >
          <AutoComplete
            floatingLabelText="Select user to chat with"
            filter={AutoComplete.fuzzyFilter}
            dataSource={source}
            dataSourceConfig={{
              text: 'username',
              value: '_id',
            }}
            ref='chatWithUser'
            maxSearchResults={5}
            onNewRequest={this.selectUserHandler}
          />
          <br />
          <TextField
            ref='chatTitle'
            floatingLabelText='Chat title'
            value={chatTitle}
            onChange={this.changeTitleHandler}
          />
          <br />
          <TextField
            ref='initialMessage'
            floatingLabelText='Set welcome message'
            value={initialMessage}
            onChange={this.changeInitialMessageHandler}
          />
          <br />
        </Dialog>
      </div>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})),
};
