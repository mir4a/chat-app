import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// API
import Chats from '/imports/api/chats.js';
import Messages from '/imports/api/messages.js';

Meteor.methods({
  newMessage(message) {
    check(message, {
      text: String,
      chatId: String,
      type: String,
      timestamp: Date,
    });

    const messageId = Messages.insert(message);
    Chats.update(message.chatId, { $set: { lastMessage: message } });

    return messageId;
  },
});
