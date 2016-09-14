import React, { Component, PropTypes } from 'react';

// Helpers
import getTime from '/imports/ui/shared/getTime';

export default class Message extends Component {
  render() {
    const time = getTime(this.props.message.timestamp);

    const messageClass = `message ${_.sample(['message-mine', 'message-other'])}`;

    return (
      <div className={messageClass}>
        <p className="message-text">
          {this.props.message.text}
          <span className="message-timestamp">{time}</span>
        </p>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date),
  }).isRequired,
};
