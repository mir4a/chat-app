import Moment from 'moment';
import { Meteor } from 'meteor/meteor';

import Chats from '/imports/api/chats';
import Messages from '/imports/api/messages';
import '/imports/api/server/message_methods';

Meteor.startup(() => {
  if (Chats.find().count() !== 0) return;

  Messages.remove({});

  const messages = [
    {
      text: 'Are you on your way?',
      timestamp: Moment().subtract(1, 'hours').toDate(),
    },
    {
      text: 'Hey, there!',
      timestamp: Moment().subtract(2, 'hours').toDate(),
    },
    {
      text: 'Can you share some pictures with me?',
      timestamp: Moment().subtract(1, 'days').toDate(),
    },
    {
      text: 'Finally!',
      timestamp: Moment().subtract(4, 'days').toDate(),
    },
    {
      text: 'Whats up bro?',
      timestamp: Moment().subtract(2, 'weeks').toDate(),
    },
  ];

  messages.forEach((m) => {
    Messages.insert(m);
  });

  const chats = [
    {
      name: 'Wicked Gorilla',
      picture: 'https://randomuser.me/api/portraits/thumb/men/43.jpg',
    },
    {
      name: 'Joe Jones',
      picture: 'https://randomuser.me/api/portraits/thumb/men/3.jpg',
    },
    {
      name: 'Connor McGregor',
      picture: 'https://randomuser.me/api/portraits/thumb/men/11.jpg',
    },
    {
      name: 'Nice Boobs',
      picture: 'https://randomuser.me/api/portraits/thumb/women/75.jpg',
    },
    {
      name: 'Franky Bro',
      picture: 'https://randomuser.me/api/portraits/thumb/men/22.jpg',
    },
  ];

  chats.forEach((chat) => {
    const message = Messages.findOne({ chatId: { $exists: false } });
    let _chat = Object.assign({ lastMessage: message }, chat);
    const chatId = Chats.insert(_chat);
    Messages.update(message._id, { $set: { chatId } });
  });
});
