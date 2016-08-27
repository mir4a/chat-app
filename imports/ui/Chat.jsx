// Helpers
import { getTime } from '/imports/ui/getTime.js';

import React, { Component, PropTypes } from 'react';

import { Card, CardHeader, CardActions } from 'material-ui/Card';

import FlatButton from 'material-ui/FlatButton';

export default class Chat extends Component {

  render() {
    const cardStyles = {
      marginBottom: 10,
    };

    const time = getTime(this.props.chat.lastMessage.timestamp);

    return (
      <Card
        style={cardStyles}
      >
        <CardHeader
          title={this.props.chat.name}
          subtitle={<p>{this.props.chat.lastMessage.text} <b>{time}</b></p>}
          avatar={this.props.chat.picture}
        />
        <CardActions>
          <FlatButton
            label="Delete Chat"
            onClick={() => this.props.deleteChat(this.props.chat)}
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
