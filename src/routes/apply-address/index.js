import React from 'react';
import intl from 'react-intl-universal';
import Layout from '../../components/Layout';
import ApplyAddress from './ApplyAddress';

function action() {
  const title = intl.get('APPLY_ADDRESS_TITLE');
  return {
    chunks: ['login'],
    title,
    component: (
      <Layout>
        <ApplyAddress title={title} />
      </Layout>
    ),
  };
}

export default action;
