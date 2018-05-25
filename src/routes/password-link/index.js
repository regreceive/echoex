import React from 'react';
import intl from 'react-intl-universal';
import Layout from '../../components/Layout';
import PasswordLink from './PasswordLink';

function action() {
  const title = intl.get('PASSWORD_LINK');
  return {
    chunks: ['login'],
    title,
    component: (
      <Layout>
        <PasswordLink title={title} />
      </Layout>
    ),
  };
}

export default action;
