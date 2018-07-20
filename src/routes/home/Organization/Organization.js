import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Brand from '../Brand';
import * as logos from './assets';
import lang from './locales';
import s from './Organization.scss';

class Organization extends Brand {
  constructor(...args) {
    super(...args);

    this.logos = logos;
    this.lang = lang;
    this.s = s;
  }
}

export default withStyles(s)(Organization);
