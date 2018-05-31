import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import * as logos from './assets';
import lang from './locales';
import s from './Media.scss';

const data = [{ img: logos.ed }, { img: logos.js }, { img: logos.btt }];

function Media() {
  const dict = lang();
  const { title } = dict;
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h2>{title}</h2>
        <div className={s.logos}>
          {data.map((p, key) => <Logo img={p.img} key={key} />)}
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

export default withStyles(s)(Media);
