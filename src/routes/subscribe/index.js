import React from 'react';
import intl from 'react-intl-universal';
import Layout from '../../components/Layout';
import Subscribe from './Subscribe';

function action() {
  const title = intl.get('SUBSCRIBE_TITLE');
  return {
    chunks: ['register'],
    title,
    component: (
      <Layout>
        <Subscribe title={title} />
      </Layout>
    ),
  };
}

export default action;
