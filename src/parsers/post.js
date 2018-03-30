import CommentRecord from 'immutable/post/CommentRecord';

export const parseComments = (data) => {
  let comments = [];

  data.forEach(function(comment) {
    const commentRecord = new CommentRecord(comment);
    comments.push(commentRecord);
  });

  return comments;
};
