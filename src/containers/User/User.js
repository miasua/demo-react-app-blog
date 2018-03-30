import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';

import styles from './User.scss';

class User extends Component {
  props: {
    isLoading: bool;
    posts: any;
    users: any;
    match: any;
  };

  render() {
    const { isLoading, posts, users, match: { params: { id } } } = this.props;
    const userId = parseFloat(id, 10);
    const user = (isLoading || !users.length) ? null : users.filter(user => user.id === userId)[0];
    const userPosts = (!posts || !posts.length) ? null : posts.filter(post => post.authorId === userId);

    return (
      <div className={styles.user}>
        {isLoading && <div className={styles.loader}><Spinner className='pt-large' /></div>}
        {user && (
          <div className='pt-card pt-elevation-0'>
            <h2>{user.name}</h2>
            <h4 className='pt-text-muted'>@{user.username}</h4>
            <table>
              <tr>
                <th>email</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th>website</th>
                <td>{user.website}</td>
              </tr>
              <tr>
                <th>phone</th>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <th>address</th>
                <td>
                  <address>
                    {user.address.street}<br />
                    {user.address.suite}<br />
                    {user.address.city}<br />
                    {user.address.zipcode}
                  </address>
                </td>
              </tr>
              <tr>
                <th>lat/lng</th>
                <td>
                  {user.address.geo.lat} / {user.address.geo.lng}
                </td>
              </tr>
              <tr>
                <th>company</th>
                <td>
                  {user.company.name}<br />
                  {user.company.catchPhrase}<br />
                  {user.company.bs}
                </td>
              </tr>
            </table>
            <h4>Posts</h4>
            <ul>
              {userPosts.map(function({id, authorId, title, link, body}, index) {
                return (
                  <li key={id} >
                    <NavLink to={link}>{title}</NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
};

function mapStateToProps({users, posts}) {
  const { isLoading, list } = users;
  const { postsIsLoading, postList } = posts;

  return {
    isLoading: (isLoading || postsIsLoading),
    posts: postList,
    users: list
  };
}

export default connect(mapStateToProps)(User);
