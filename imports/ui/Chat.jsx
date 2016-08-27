import Moment from 'moment';

import React, { Component, PropTypes } from 'react';

import { Card, CardHeader, CardActions } from 'material-ui/Card';

import FlatButton from 'material-ui/FlatButton';

export default class Chat extends Component {
  getTime() {
    if (!this.props.chat.lastMessage.timestamp) return;

    return Moment(this.props.chat.lastMessage.timestamp).calendar(null, {
      lastDay : '[Yesterday]',
      sameDay : 'LT',
      lastWeek : 'dddd',
      sameElse : 'DD/MM/YY'
    });
  }

  render() {
    const cardStyles = {
      marginBottom: 10,
    };
    return (
      <Card
        style={cardStyles}
      >
        <CardHeader
          title={this.props.chat.name}
          subtitle={<p>{this.props.chat.lastMessage.text} <b>{this.getTime()}</b></p>}
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
