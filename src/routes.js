import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import asyncComponent from 'shared/utilities/asyncComponent';

import DefaultLayout from 'shared/layout/DefaultLayout';

const Posts = asyncComponent(() => System.import('containers/Posts/Posts').then(module => module.default));

class Routes extends Component {
  render() {
    return (
      <Router>
        <Route>
          <DefaultLayout>
            <Switch>
              <Route exact path='/' component={Posts}/>
              <Redirect from='*' to='/' />
            </Switch>
          </DefaultLayout>
        </Route>
      </Router>
    );
  }
}

export default connect()(Routes);
