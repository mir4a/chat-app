import { Meteor } from 'meteor/meteor';

Meteor.publish('usersList', () =>
  Meteor.users.find({},
    {
      fields: {
        username: 1,
        emails: 1,
      },
    })
);
