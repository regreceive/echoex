/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import Register from './Register';

const title = '加入ECHO生态，共建新一代供应链分布式链';

function action() {
  return {
    chunks: ['register'],
    title,
    component: (
      <Layout>
        <Register title={title} />
      </Layout>
    ),
  };
}

export default action;
