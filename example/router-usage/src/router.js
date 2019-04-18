import React from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';
import LoginPage from '~/pages/compile/LoginPage.js';
import HomePage from '~/pages/compile/HomePage.js';
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
    path: '/login',
    component: LoginPage
  },
  {
    path: '/home',
    component: HomePage
  }
];

export default rootConfig;
