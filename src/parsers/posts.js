import PostRecord from 'immutable/posts/PostRecord';

export const parsePosts = (data) => {
  let posts = [];

  data.forEach(function({userId, id, title, body}) {
    const postRecord = new PostRecord({
      id,
      authorId: userId,
      link: `#/posts/${id}`,
      title,
      desc: body
    });

    posts.push(postRecord);
  });

  return posts;
};
