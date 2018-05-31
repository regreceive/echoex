import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import * as logos from './assets';
import lang from './locales';
import s from './Partners.scss';

const partners = [
  { img: logos.yl },
  { img: logos.sm },
  { img: logos.inc },
  { img: logos.csl },
  { img: logos.wj },
  { img: logos.gvc },
  { img: logos.pusu },
  { img: logos.dfj },
  { img: logos.zh },
  { img: logos.zy },
  { img: logos.zhsy },
  { img: logos.ztny },
  { img: logos.zhy },
  { img: logos.czb },
];

function Partners() {
  const dict = lang();
  const { title } = dict;
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h2>{title}</h2>
        <div className={s.logos}>
          {partners.map((p, key) => <Logo img={p.img} key={key} />)}
        </div>
      </div>
    </div>
  );
}

const Logo = props => {
  const { img } = props;
  return (
    <span>
      <img src={img} />
    </span>
  );
};

Logo.propTypes = {
  img: PropTypes.string.isRequired,
};

export default withStyles(s)(Partners);
