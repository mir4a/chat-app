import React, { PropTypes } from 'react';

import Preview from './Preview';

// Helpers
import getTime from '/imports/ui/shared/getTime';

export default function Message({ message, currentUser }) {
  const time = getTime(message.timestamp);
  const messageClass = currentUser._id === message.userId ? 'message-mine' : 'message-other';
  const messageAuthor = Meteor.users.findOne(message.userId);
  const username = messageAuthor ? messageAuthor.username : 'anonymouse';
  const preview = message.links && message.links.length ?
    <Preview links={message.links} /> : '';


  return (
    <div className="clearfix">
      <div className={`message ${messageClass}`}>
        <p className="message-text">
          {message.text}
          <br />
          <span className="message-timestamp">{time}</span>
          <br />
          <small>{username}</small>
        </p>
      </div>
      {preview}

    </div>
  );
}

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date),
    userId: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  currentUser: PropTypes.object.isRequired,
};
