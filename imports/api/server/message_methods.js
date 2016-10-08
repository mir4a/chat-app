import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// API
import Chats from '/imports/api/chats';
import Messages from '/imports/api/messages';

Meteor.methods({
  newMessage(message) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in to send message.');
    }

    check(message, {
      text: String,
      chatId: String,
      type: String,
      timestamp: Date,
      links: Array,
    });

    const params = {
      timestamp: new Date(),
      userId: this.userId,
    };

    const messageId = Messages.insert(Object.assign(message, params));
    Chats.update(message.chatId, { $set: { lastMessage: message } });

    return messageId;
  },
});
