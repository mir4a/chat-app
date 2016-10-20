import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';


export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { users } = this.props;

    return (
      <div>
        {users.map(user => (<p>{user.username}, {user._id}</p>))}
      </div>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})),
};
