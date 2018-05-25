import React from 'react';
import intl from 'react-intl-universal';
import Layout from '../../components/Layout';
import RegValidation from './RegValidation';

function action() {
  const title = intl.get('REG_VALIDATION_TITLE');
  return {
    chunks: ['register'],
    title,
    component: (
      <Layout>
        <RegValidation title={title} />
      </Layout>
    ),
  };
}

export default action;
