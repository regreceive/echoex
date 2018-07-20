import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Brand from '../Brand';
import * as logos from './assets';
import lang from './locales';
import s from './Partners.scss';

class Partners extends Brand {
  constructor(...args) {
    super(...args);

    this.logos = logos;
    this.lang = lang;
    this.s = s;
    this.id = 'partners';
  }
}

export default withStyles(s)(Partners);
