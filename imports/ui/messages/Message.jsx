import React, { PropTypes } from 'react';

// Helpers
import getTime from '/imports/ui/shared/getTime';

import Preview from './Preview';

export default function Message({ message, currentUser }) {
  const time = getTime(message.timestamp);
  const messageClass = currentUser._id === message.userId ? 'message-mine' : 'message-other';
  const messageAuthor = Meteor.users.findOne(message.userId);
  const username = messageAuthor ? messageAuthor.username : 'anonymouse';

  const preview = message.links && message.links.length ?
        message.links.map(link => (
          <Preview link={link} key={link} />
        ))
      : '';


  return (
    <div className={messageClass}>
      <div className="message">
        <p className="message-text">
          {message.text}
          <br />
          <span className="message-timestamp">{time}</span>
          <br />
          <small>{username}</small>
        </p>
      </div>
      <div className="clearfix" />
      <div className="preview-list">
        {preview}
      </div>

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
