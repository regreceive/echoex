import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Effect from '../Effect';
import Meteor from '../Effect/Meteor';
import Organization from '../Organization';
import Partners from '../Partners';
import Media from '../Media';
import s from './Brands.scss';

const meteor = Meteor();
function Brands() {
  return (
    <div className={s.root}>
      <Effect control={[meteor]}>
        <React.Fragment>
          <Organization />
          <Partners />
          <Media />
        </React.Fragment>
      </Effect>
    </div>
  );
}

export default withStyles(s)(Brands);
