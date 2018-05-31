import React from 'react';
import intl from 'react-intl-universal';
import Layout from '../../components/Layout';
import Register from './Helloworld';

function action() {
  const title = intl.get('REGISTER_TITLE');
  return {
    chunks: ['admin'],
    title,
    component: (
      <Layout home>
        <Register title={title} />
      </Layout>
    ),
  };
}

export default action;
