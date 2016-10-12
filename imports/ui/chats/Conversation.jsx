import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

// API
import Chats from '/imports/api/chats';
import Messages from '/imports/api/messages';

// Components
import Message from '/imports/ui/messages/Message';
import Conversations from '/imports/ui/chats/Conversations';

// Helpers
import getTime from '/imports/ui/shared/getTime';
import { getUrls } from '/imports/helpers/url';

export default class Conversation extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.scrollToLastMessage();
  }

  componentDidUpdate() {
    this.scrollToLastMessage();
  }

  scrollToLastMessage() {
    const body = $('.chatBody');
    const messagesHeight = $('.message-wrapper').height();
    body.scrollTop(messagesHeight);
  }

  sendMessage() {
    let message = this.refs.textInput.getValue().trim();
    if (!message.length) return;
    let links = getUrls(message);

    Meteor.call('newMessage', {
      text: message,
      type: 'text',
      chatId: FlowRouter.current().params.chatId,
      timestamp: new Date(),
      links,
    });

    // Clear form
    this.refs.textInput.getInputNode().value = '';
    this.refs.textInput.setState({ isFocused: false, hasValue: false });
  }


  renderMessages() {
    return this.props.messages.map(message => (
      <Message
        key={message._id}
        message={message}
        currentUser={this.props.currentUser}
      />
    ));
  }

  returnKeyHandler(event) {
    if (event.key === 'Enter'
        && !event.shiftKey
        && event.target.value.trim().length) {
      this.sendMessage();
    }
  }

  render() {
    if (_.isEmpty(this.props.chat)) return null; // this is important for page reloads
    const { lastMessage } = this.props.chat;
    const time = lastMessage ? getTime(this.props.chat.lastMessage.timestamp) : '';

    const textFieldStyles = {
      display: 'block',
      marginBottom: 10,
    };

    const cardActionsStyles = {
      borderTop: '1px solid #dddddd',
      maxHieght: '140px',
    };

    return (
      <div className="chatLayout">
        <Conversations />
        <div className="conversation">
          <Card className="chatWrapper">
            <CardHeader
              className="chatHeader"
              title={this.props.chat.name}
              subtitle={<b>{time}</b>}
              avatar={this.props.chat.picture}
            />
            <CardText className="chatBody">
              <div className="message-wrapper">
                {this.renderMessages()}
              </div>
            </CardText>
            <CardActions
              className="chatInput"
              style={cardActionsStyles}
            >
              <div className="message-input">
                <TextField
                  style={textFieldStyles}
                  floatingLabelText="Message"
                  hintText="type your Message and press Return"
                  fullWidth
                  multiLine
                  rows={1}
                  rowsMax={2}
                  ref="textInput"
                  onKeyUp={this.returnKeyHandler.bind(this)}
                />
              </div>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

Conversation.propTypes = {
  chat: PropTypes.shape({
    name: PropTypes.string,
    picture: PropTypes.string,
    lastMessage: PropTypes.shape({
      timestamp: PropTypes.instanceOf(Date),
    }),
  }).isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,

};

export default createContainer(() => {
  const chatId = FlowRouter.current().params.chatId;

  return {
    chat: Chats.findOne(chatId) || {},
    messages: Messages.find({ chatId }).fetch(),
    currentUser: Meteor.user(),
  };
}, Conversation);
