import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  props: {
    title?: string;
  };

  render() {
    const title = this.props.title || 'Blog';

    return (
      <nav className='pt-navbar pt-dark'>
        <div className='pt-navbar-group pt-align-left'>
          <div className='pt-navbar-heading'><NavLink to='/'>{title}</NavLink></div>
        </div>
      </nav>
    );
  }
}

export default connect()(Header);
