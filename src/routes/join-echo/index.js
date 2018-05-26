import React from 'react';
import intl from 'react-intl-universal';
import Layout from '../../components/Layout';
import JoinEcho from './JoinEcho';

function action() {
  const title = intl.get('JOIN_ECHO');
  return {
    chunks: ['join-echo'],
    title,
    component: (
      <Layout>
        <JoinEcho title={title} />
      </Layout>
    ),
  };
}

export default action;
