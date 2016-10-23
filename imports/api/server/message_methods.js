import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
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

  remoteGet(url) {
    const headers = {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
      'accept-language': 'en-US,en;q=0.8,ru;q=0.6,uk;q=0.4,ar;q=0.2',
      'accept-encoding': 'gzip, deflate, sdch, br',
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    };
    return HTTP.get(url, { headers, npmRequestOptions: { gzip: true } });
  },
});

Meteor.publish('chatMessages', () => Messages.find());
