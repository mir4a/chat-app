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
      name: name,
      picture: user.avatar,
    };

    const chatId = Chats.insert(params);

    return chatId;
  },
});
