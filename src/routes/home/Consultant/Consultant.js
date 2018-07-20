import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Effect from '../Effect';
import Meteor from '../Effect/Meteor';
import CustomSwiper from './CustomSwiper';
import lang from './locales';
import s from './Consultant.scss';

const meteor = Meteor();
function Consultant() {
  const dict = lang();
  const { title } = dict;
  return (
    <div className={s.root}>
      <Effect control={[meteor]}>
        <div className={s.container}>
          <h2>{title}</h2>
          <CustomSwiper />
        </div>
      </Effect>
    </div>
  );
}

export default withStyles(s)(Consultant);
