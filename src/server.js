/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import express from 'express';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import { graphql } from 'graphql';
import querystring from 'querystring';
import url from 'url';
import expressGraphQL from 'express-graphql';
// import jwt from 'jsonwebtoken';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import passport from './passport';
import router from './router';
import models from './data/models';
import schema from './data/schema';
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import config from './config';
import { AuthController, HomeController, GuestFilter } from './controllers';
import { loadLocales } from './locales';
import { kyc } from './routes/api';

const upload = multer({
  storage: multer.memoryStorage(),
});
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'powerchain-kyc',
    name: 'kycd',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: false },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// 路由
app.use(GuestFilter);
app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    req.user = user;
    AuthController.Login(req, res, next);
  })(req, res, next);
});
app.get('/api/captcha/send', AuthController.SendCaptcha);
app.post('/api/register', AuthController.Register);
app.get('/api/logout', AuthController.Logout);
app.get('/logout', AuthController.Logout);
app.post('/api/password/reset-link', AuthController.ResetLink);
app.post('/api/password/recover', AuthController.Recoverpwd);
app.post('/api/user/activate', AuthController.RegisterActivate);
app.post('/api/join', HomeController.JoinEcho);
app.post('/api/is-crowdfunding', HomeController.IsCrowdfunding);
app.get('/api/totalRaised', HomeController.TotalRaised);
app.post('/api/kyc-status', HomeController.KycStatus);
app.get('/api/address', HomeController.UserAddress);
app.get('/api/test', HomeController.Test);
app.post(
  '/api/profile',
  upload.fields([
    { name: 'passport_01', maxCount: 1 },
    { name: 'passport_02', maxCount: 1 },
  ]),
  HomeController.ApplyProfile,
);
app.get('/api/profile', HomeController.getProfile);
app.post('/api/profile/address', HomeController.SubmitEthAddress);

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use(
  '/graphql',
  expressGraphQL(req => ({
    schema,
    graphiql: __DEV__,
    rootValue: { request: req },
    pretty: __DEV__,
  })),
);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    };

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
      schema,
      graphql,
    });

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
      fetch,
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query,
      state: {},
      // 返回用户cookie的邮箱，用于server侧的react导航条右上角渲染
      login: {
        in() {},
        out() {},
        check() {
          return req.cookies && req.cookies.username;
        },
      },

      kyc: {
        status: null,
        sync() {
          const email = context.login.check();
          kyc(context.fetch, { email }).then(data => {
            this.status = data.kyc;
          });
        },
        check() {
          return this.status;
        },
      },
    };

    const { query } = url.parse(req.url);
    const { lang } = querystring.parse(query);
    await loadLocales(lang || '', req.headers['accept-language'] || '');

    const route = await router.resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context}>{route.component}</App>,
    );
    data.styles = [{ id: 'css', cssText: [...css].join('') }];

    const scripts = new Set();
    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => scripts.add(asset));
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk('client');
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);

    data.scripts = Array.from(scripts);
    data.app = {
      apiUrl: config.api.clientUrl,
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
const promise = models.sync().catch(err => console.error(err.stack));
if (!module.hot) {
  promise.then(() => {
    app.listen(config.port, () => {
      console.info(`The server is running at http://localhost:${config.port}/`);
    });
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
