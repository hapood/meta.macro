import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Links from '~/component/Links';

import '~/pages/compile/HomePage';
import '~/pages/compile/LoginPage';
import '~/pages/compile/DetailPage';

import Pages from '~/router';

console.log(Pages);
ReactDOM.render(
  <Router>
    <div>
      <Links />
      <Switch>
        {Pages.map(({ path, component, exact = true }) => (
          <Route key={path} path={path} component={component} exact={exact} />
        ))}
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);
