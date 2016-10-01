// Helpers
import getTime from '/imports/ui/shared/getTime';

import React, { Component, PropTypes } from 'react';

import { Card, CardHeader, CardActions } from 'material-ui/Card';

import FlatButton from 'material-ui/FlatButton';

import { FlowRouter } from 'meteor/kadira:flow-router';

const MESSAGE_MAX_LENGTH = 140;

export default class Chat extends Component {

  render() {
    const cardStyles = {
      marginBottom: 10,
    };

    const { lastMessage } = this.props.chat;

    const time = lastMessage ? getTime(this.props.chat.lastMessage.timestamp) : '';
    const message = lastMessage ? lastMessage.text : 'Empty chat';

    return (
      <Card
        style={cardStyles}
      >
        <CardHeader
          title={this.props.chat.name}
          subtitle={<p>{message.slice(0, MESSAGE_MAX_LENGTH)} <b>{time}</b></p>}
          avatar={this.props.chat.picture}
          className="chatCardHeader"
        />
        <CardActions>
          <FlatButton
            label="Delete Chat"
            onClick={() => this.props.deleteChat(this.props.chat)}
          />
          <FlatButton
            label="View"
            onClick={() => FlowRouter.go('chat', { chatId: this.props.chat._id })}
          />
        </CardActions>
      </Card>
    );
  }
}

Chat.propTypes = {
  chat: PropTypes.object.isRequired,
  deleteChat: PropTypes.func.isRequired,
};
