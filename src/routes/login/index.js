import React from 'react';
import intl from 'react-intl-universal';
import Layout from '../../components/Layout';
import Login from './Login';

function action() {
  const title = intl.get('LOGIN_TITLE');
  return {
    chunks: ['login'],
    title,
    component: (
      <Layout>
        <Login title={title} />
      </Layout>
    ),
  };
}

export default action;
