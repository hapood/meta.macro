import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Links from '~/component/Links';
import { getPages } from '~/decorator/Controller';

var cache = {};

function importAll(r) {
  r.keys().forEach(key => (cache[key] = r(key)));
}

importAll(require.context('~/pages/decorator/', true, /\.js$/));

const Pages = getPages();
console.log(Pages, cache);
ReactDOM.render(
  <Router>
    <div>
      <Links />
      <Switch>
        {Object.keys(Pages).map(url => (
          <Route key={url} path={url} component={Pages[url].target} />
        ))}
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);
