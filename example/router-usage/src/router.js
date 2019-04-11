import React from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';
import HomePage from '~/pages/compile/HomePage.js';
import LoginPage from '~/pages/compile/LoginPage.js';
const lazy = loader =>
  Loadable({
    delay: 400,
    loading: Loading,
    loader
  });

const rootConfig = [
  {
    path: '/detail',
    component: lazy(() =>
      import(/* webpackChunkName: "common" */ '~/pages/compile/DetailPage.js')
    )
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/login',
    component: LoginPage
  }
];

export default rootConfig;
