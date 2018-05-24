import React from 'react';
import intl from 'react-intl-universal';
import Layout from '../../components/Layout';
import Profile from './Profile';

function action() {
  const title = intl.get('PROFILE_TITLE');
  return {
    chunks: ['register'],
    title,
    component: (
      <Layout>
        <Profile title={title} />
      </Layout>
    ),
  };
}

export default action;
