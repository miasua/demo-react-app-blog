import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';

import Author from './Author';

import styles from './Posts.scss';

class Posts extends Component {
  props: {
    isLoading: bool;
    posts: any;
    dispatch: any;
  };

  render() {
    const { isLoading, posts } = this.props;

    return (
      <div className={styles.posts}>
        {isLoading && <div className={styles.loader}><Spinner className='pt-large' /></div>}
        {!isLoading && posts.map(function({id, authorId, title, link, body}, index) {
          return (
            <div key={id} className='pt-card pt-elevation-1 pt-interactive'>
              <h5><NavLink to={link}>{title}</NavLink></h5>
              <p>{body}</p>
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
