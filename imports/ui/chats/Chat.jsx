// Helpers
import getTime from '/imports/ui/shared/getTime';

import React, { Component, PropTypes } from 'react';

import { Card, CardHeader, CardActions } from 'material-ui/Card';

import FlatButton from 'material-ui/FlatButton';

import { FlowRouter } from 'meteor/kadira:flow-router';

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
          subtitle={<p>{message} <b>{time}</b></p>}
          avatar={this.props.chat.picture}
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
