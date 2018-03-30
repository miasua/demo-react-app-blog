import UserRecord from 'immutable/users/UserRecord';

export const parseUsers = (data) => {
  let users = [];

  data.forEach(function(post) {
    const userRecord = new UserRecord({
      ...post,
      link: `#/users/${post.id}`
    });

    users.push(userRecord);
  });

  return users;
};
