import UserRecord from 'immutable/users/UserRecord';

export const parseUsers = (data) => {
  let users = [];

  data.forEach(function(user) {
    const userRecord = new UserRecord({
      ...user,
      link: `/users/${user.id}`
    });

    users.push(userRecord);
  });

  return users;
};
