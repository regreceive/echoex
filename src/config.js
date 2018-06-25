/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

const config = {
  // Node.js app
  port: process.env.PORT || 3000,

  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || 'loopback',

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl:
      process.env.API_SERVER_URL ||
      `http://localhost:${process.env.PORT || 3000}`,
  },

  // Database
  // databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',
  databaseUrl: process.env.DATABASE_URL || 'kyc',
  database: {
    db: 'kyc',
    user: 'root',
    pass: '123456',
    host: 'localhost',
    port: '3306',
  },

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },

    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret:
        process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc',
    },

    // https://cloud.google.com/console/project
    google: {
      id:
        process.env.GOOGLE_CLIENT_ID ||
        '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
    },

    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret:
        process.env.TWITTER_CONSUMER_SECRET ||
        'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
    },
  },

  mailer: {
    qq: {
      host: 'smtp.exmail.qq.com',
      port: 465,
      secure: true,
      user: 'echo@echo.center', // echo@echo.center
      pass: 'Ec4116', // Ec4116
      from: 'echo <echo@echo.center>',
      maxPwdReset: 5,
    },
  },

  Blockchain: {
    url: 'ws://172.29.1.169:8846',
    targetAddress: '0x43266A575c16512e7Ef1bdC69603d5d319CA9f39',
    lastBlkLock: '/app/EchoChain/kyc/master/.lastblk.lock',
    startBlk: null,
    endBlk: null,
  },

  crowFunding: {
    start_date: '2018-6-19',
    end_date: '2018-6-30',
  },

  upload_path: null,
  authList: ['/api/profile', '/api/profile/address'],
  guestList: ['/login', '/register', '/api/login', '/api/register'],
  authRedirectUrl: '/login', // 需要登录但未登录, 跳转到登录页
  guestRedirectUrl: '/profile', // 需要游客但已经登录, 跳转到首页
  logoutRedirectUrl: '/login', // 登出后跳转
};

if (process.env.NODE_ENV === 'production') {
  config.api.serverUrl = 'http://www_echoex_dev.echo.center';
  config.upload_path = '/tmp/uploads';
  config.database = {
    db: 'kyc',
    user: 'root',
    pass: 'my-secret-pw',
    host: '172.31.1.170',
    port: '20201',
  };

  config.Blockchain = {
    url: 'ws://172.29.1.168:8846', // 不需修改!
    targetAddress: '填写正式上线时的众筹收款地址',
    lastBlkLock: '填写App根目录/.lastblk.lock',
    startBlk: null,
    endBlk: null,
  };
}

module.exports = config;
