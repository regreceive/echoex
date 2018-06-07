import React from 'react';
import intl from 'react-intl-universal';
import Layout from '../../components/Layout';
import PasswordRecover from './PasswordRecover';

function action() {
  const title = intl.get('PASSWORD_RECOVER');
  return {
    chunks: ['login'],
    title,
    component: (
      <Layout>
        <PasswordRecover title={title} />
      </Layout>
    ),
  };
}

export default action;
