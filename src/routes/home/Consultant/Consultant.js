import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import CustomSwiper from './CustomSwiper';
import lang from './locales';
import s from './Consultant.scss';

function Consultant() {
  const dict = lang();
  const { title } = dict;
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h2>{title}</h2>
        <CustomSwiper />
      </div>
    </div>
  );
}

export default withStyles(s)(Consultant);
