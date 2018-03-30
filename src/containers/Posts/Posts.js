import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '@blueprintjs/core';

import { requestPosts, clearPosts } from 'redux/modules/posts';
import Author from './Author';

import styles from './Posts.scss';

class Posts extends Component {
  props: {
    isLoading: bool;
    posts: any;
    dispatch: any;
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(requestPosts());
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(clearPosts());
  }

  render() {
    const { isLoading, posts } = this.props;

    return (
      <div className={styles.posts}>
        {isLoading && <div className={styles.loader}><Spinner className='pt-large' /></div>}
        {!isLoading && posts.map(function({id, authorId, title, link, desc}, index) {
          return (
            <div key={id} className='pt-card pt-elevation-1 pt-interactive'>
              <h5><a href={link}>{title}</a></h5>
              <p>{desc}</p>
              <Author id={authorId} />
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps({posts, users}) {
  const { isLoading } = users;
  const { postsIsLoading, postList } = posts;

  return {
    isLoading: (isLoading || postsIsLoading),
    posts: postList
  };
}

export default connect(mapStateToProps)(Posts);
