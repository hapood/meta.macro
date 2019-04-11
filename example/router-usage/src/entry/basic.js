import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Links from '~/component/Links';

import HomePage from '~/pages/basic/HomePage';
import LoginPage from '~/pages/basic/LoginPage';
import DetailPage from '~/pages/basic/DetailPage';

ReactDOM.render(
  <Router>
    <div>
      <Links />
      <Switch>
        <Route path={`/home`} component={HomePage} />
        <Route path={`/login`} component={LoginPage} />
        <Route path={`/detail`} component={DetailPage} />
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);
