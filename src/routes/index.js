/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

// The top-level (parent) route
const needLogin = true;
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      path: '/login',
      load: () => import(/* webpackChunkName: 'login' */ './login'),
    },
    {
      path: '/register',
      load: () => import(/* webpackChunkName: 'register' */ './register'),
    },
    {
      path: '/activate',
      load: () =>
        import(/* webpackChunkName: 'register' */ './register-activate'),
    },
    {
      path: '/register/validation',
      load: () =>
        import(/* webpackChunkName: 'register' */ './register-validation'),
    },
    {
      path: '/password/reset-link',
      load: () => import(/* webpackChunkName: 'login' */ './password-link'),
    },
    {
      path: '/password/recover',
      load: () =>
        import(/* webpackChunkName: 'register' */ './password-recover'),
    },
    {
      path: '/join-echo',
      load: () => import(/* webpackChunkName: 'join-echo' */ './join-echo'),
    },
    {
      path: '/profile',
      needLogin,
      load: () => import(/* webpackChunkName: 'register' */ './profile'),
    },
    {
      path: '/subscribe',
      needLogin,
      load: () => import(/* webpackChunkName: 'register' */ './subscribe'),
    },
    {
      path: '/profile/edit',
      load: () => import(/* webpackChunkName: 'register' */ './profile-edit'),
    },
    {
      path: '/address',
      needLogin,
      load: () => import(/* webpackChunkName: 'register' */ './apply-address'),
    },
    {
      path: '/about',
      load: () => import(/* webpackChunkName: 'about' */ './about'),
    },
    {
      path: '/privacy',
      load: () => import(/* webpackChunkName: 'privacy' */ './privacy'),
    },
    {
      path: '/welcome',
      load: () => import(/* webpackChunkName: 'admin' */ './helloworld'),
    },
    {
      path: '/admin',
      load: () => import(/* webpackChunkName: 'admin' */ './admin'),
    },

    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - ECHO`;
    route.description = route.description || '';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
