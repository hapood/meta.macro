Using Babel Macro Extract Metadatas from Codes

```sh
npm install --save-dev meta.macro
```
## Usage
```js
// File: /Users/me/workspaces/my-app/src/App.js
import Controller from 'meta.macro';

@Controller('/home', {async: true, chunk: 'main'})
class App extends React.Component {
  render() {
    return (
      <div>Hello World</div>
    );
  }
}

```
Data Extract from Code

```json
{
  "/Users/me/workspaces/my-app/src/App.js": {
    "callee": "Controller",
    "params": [
      "/home",
      {
        "async": true,
        "chunk": "main"
      }
    ]
  }
  
}
```

Supportted Config Files:
[https://github.com/kentcdodds/babel-plugin-macros/blob/HEAD/other/docs/author.md#config-experimental](https://github.com/kentcdodds/babel-plugin-macros/blob/HEAD/other/docs/author.md#config-experimental)
```js
// babel-plugin-macros.config.js
module.exports = {
    'meta.macro': function(metadata){
      // TODO
      // do something...
    },
}
```

### Example:
**Before**
```
my-app
├── package.json
├── babel-plugin-macros.config.js
├── .gitignore
└── src
    ├── App.js
    ├── Loading.js
    └── pages
       ├── HomePage.js
       └── LoginPage.js
```
```js
// src/App.js
import './pages/HomePage.js'
import './pages/LoginPage.js'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

```
```js
// babel-plugin-macros.config.js

const routerCodeGenerator = require('meta.macro/lib/router.code.js');

module.exports = {
    'meta.macro': routerCodeGenerator
}

```
```js
// src/pages/LoginPage.js
import React from 'react';
import Controller from 'meta.macro';

@Controller('/login')
class LoginPage extends React.Component {
  render() {
    return (
      <div>Login</div>
    );
  }
}
```
```js
// src/pages/HomePage
import React from 'react';
import Page from 'meta.macro';

@Page('/home', { async: true, chunk: 'main' })
class HomePage extends React.Component {
  render() {
    return (
      <div>Home Page</div>
    );
  }
}
```
**After**
```
my-app
├── package.json
├── babel-plugin-macros.config.js
├── .gitignore
└── src
    ├── router.js
    ├── router-config.json
    ├── Loading.js
    └── pages
       ├── HomePage.js
       └── LoginPage.js
```
Generate File `src/router.js`
```js
// ~ is Webpack Alias for <project>/src folder
import React from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';
import LoginPage from '~/pages/LoginPage';

const lazy = loader => Loadable({
    delay: 400,
    loading: Loading,
    loader,
  });

const rootConfig = [
  {
    path: "/home",
    component: lazy(() => import(/* webpackChunkName: "main" */ '~/react/pages/HomePage.js')),
  }, {
    path: "/login",
    component: LoginPage
  }
];

export default rootConfig;
      
```
Generate File `src/router-config.json`
```json
{
  "/Users/me/workspaces/my-app/src/pages/LoginPage.js": {
    "callee": "Controller",
    "params": []
  },
  "/Users/me/workspaces/my-app/src/pages/HomePage.js": {
    "callee": "Page",
    "params": [
      "/home",
      {
        "async": true,
        "chunk": "main"
      }
    ]
  }
}
```

