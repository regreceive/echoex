import React from 'react';
import intl from 'react-intl-universal';
import Layout from '../../components/Layout';
import Register from './Register';

function action() {
  const title = intl.get('REGISTER_TITLE');
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
