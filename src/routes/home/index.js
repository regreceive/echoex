import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action() {
  return {
    title: 'ECHO',
    chunks: ['home'],
    component: (
      <Layout home>
        <Home />
      </Layout>
    ),
  };
}

export default action;
