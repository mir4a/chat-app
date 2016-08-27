import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Card, CardHeader, CardText } from 'material-ui/Card';

// API
import { Chats } from '/imports/api/chats.js';

// Helpers
import { getTime } from '/imports/ui/getTime.js';

export default class Conversation extends Component {
  render() {
    if (_.isEmpty(this.props.chat)) return null; // this is important for page reloads

    const time = getTime(this.props.chat.lastMessage.timestamp);

    return (
      <div className="container">
        <Card>
          <CardHeader
            title={this.props.chat.name}
            subtitle={<b>{time}</b>}
            avatar={this.props.chat.picture}
          />
          <CardText>
            <div className='message-wrapper'>
              messages will be here
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
}

Conversation.propTypes = {
  chat: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const chatId = FlowRouter.current().params.chatId;

  return {
    chat: Chats.findOne(chatId) || {},
  };
}, Conversation);
