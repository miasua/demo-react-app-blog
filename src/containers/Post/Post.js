import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';

import { requestComments, clearComments } from 'redux/modules/post';

import styles from './Post.scss';

class Posts extends Component {
  props: {
    isLoading: bool;
    posts: any;
    users: any;
    commentsIsLoading: bool;
    comments: any;
    match: any;
    dispatch: any;
  };

  componentWillMount() {
    let { dispatch, match: { params: { id } } } = this.props;
    id = parseFloat(id, 10);
    dispatch(requestComments(id));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(clearComments());
  }

  render() {
    const { isLoading, commentsIsLoading, posts, users, comments, match: { params: { id } } } = this.props;
    const post = (isLoading && !posts.length) ? null : posts.filter(post => post.id === parseFloat(id, 10))[0];
    const author = (!post) ? null : users.filter(user => user.id === post.authorId)[0];

    return (
      <div className={styles.post}>
        {isLoading && <div className={styles.loader}><Spinner className='pt-large' /></div>}
        {!isLoading && (
          <div className='pt-card pt-elevation-0'>
            <h2>{post.title}</h2>
            <h4><NavLink to={author.link}>{author.name}</NavLink></h4>
            <div><p>{post.body}</p></div>
            <div>
              <h4>Comments</h4>
              {commentsIsLoading && <div className={styles.loader}><Spinner className='pt-medium' /></div>}
              {!commentsIsLoading && !comments.length && <div><hr /><em>No Comments</em></div>}
              {!commentsIsLoading && comments.length && comments.map(function({id, name, email, body}, index) {
                return (
                  <div key={id}>
                    <hr />
                    <h6><a href={`mailto:${email}`}>{name}</a></h6>
                    <p>{body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({posts, users, post}) {
  const { isLoading, list } = users;
  const { postsIsLoading, postList } = posts;
  const { commentsIsLoading, commentList } = post;

  return {
    isLoading: (isLoading || postsIsLoading),
    posts: postList,
    users: list,
    commentsIsLoading,
    comments: commentList
  };
}

export default connect(mapStateToProps)(Posts);
