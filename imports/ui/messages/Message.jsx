import React, { PropTypes } from 'react';

// Helpers
import getTime from '/imports/ui/shared/getTime';

export default function Message({ message, currentUser }) {
  const time = getTime(message.timestamp);
  const messageClass = currentUser._id === message.userId ? 'message-mine' : 'message-other';
  const messageAuthor = Meteor.users.find(message.userId);

  return (
    <div className={`message ${messageClass}`}>
      <p className="message-text">
        {message.text}
        <span className="message-timestamp">{time}</span>
        <br />
        <small>{messageAuthor.username}</small>
      </p>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date),
    userId: PropTypes.string,
  }).isRequired,
  currentUser: PropTypes.object.isRequired,
};
