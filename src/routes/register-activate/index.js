import React from 'react';
import intl from 'react-intl-universal';
import Layout from '../../components/Layout';
import RegActivate from './RegActivate';

function action() {
  const title = intl.get('REGACTIVATE_TITLE');
  return {
    chunks: ['register'],
    title,
    component: (
      <Layout>
        <RegActivate title={title} />
      </Layout>
    ),
  };
}

export default action;
