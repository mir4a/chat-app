import { Meteor } from 'meteor/meteor';

// API
import Chats from '/imports/api/chats';

Meteor.methods({
  newChat(name) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in to create a chat.');
    }

    const user = Meteor.user();

    const params = {
      timestamp: new Date(),
      userId: this.userId,
      name,
      picture: user.avatar,
    };

    const chatId = Chats.insert(params);

    return chatId;
  },

  deleteChat(chatId) {
    const chat = Chats.findOne(chatId);
    if (chat.userId !== this.userId) {
      throw new Meteor.Error('not-access', 'You have no rights for delete chat other user\'s chat');
    }

    Chats.remove(chatId);
  },
});
